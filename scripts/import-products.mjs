/**
 * Product Data Import Script
 * Imports products from Data/Final-Data.csv into Supabase
 * 
 * Usage: node scripts/import-products.mjs
 * 
 * Features:
 * - Cleans mojibake/encoding artifacts from product names
 * - Converts Python-style arrays/dicts to valid JSON
 * - Auto-generates URL slugs from product names
 * - Resolves category_id from sub-category names
 * - Upserts products (update if SKU exists, insert if new)
 * - Creates default product variants with inventory
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Configuration ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  // Try loading from .env.local
  const envPath = resolve(__dirname, '..', '.env.local');
  try {
    const envContent = readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          process.env[key] = val;
        }
      }
    }
  } catch (e) {
    console.error('Could not load .env.local:', e.message);
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Utility Functions ---

/**
 * Clean mojibake / UTF-8 encoding artifacts from strings
 */
function cleanMojibake(str) {
  if (!str) return str;
  return str
    // Common mojibake patterns
    .replace(/Ã‚Â\s*/g, '')
    .replace(/Ã¢Â\s*/g, '')
    .replace(/Ã\s*Â¤/g, '')
    .replace(/Ã\s*Â¥/g, '')
    .replace(/Ã¢â‚¬/g, '')
    .replace(/Ã‚/g, '')
    .replace(/Â /g, '')
    .replace(/Ã¢/g, '')
    .replace(/Ã Â[^\s]*/g, '')
    // Clean up leftover artifacts
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Convert Python-style list/dict string to valid JSON
 * e.g., "['item1', 'item2']" → '["item1", "item2"]'
 * e.g., "[{'q': 'How?', 'a': 'Yes'}]" → '[{"q": "How?", "a": "Yes"}]'
 */
function pythonToJson(str) {
  if (!str || str.trim() === '') return null;
  
  try {
    // Replace Python single-quoted strings with double-quoted
    // Handle the pattern: 'text' → "text"
    // Be careful not to break apostrophes inside strings
    let json = str.trim();
    
    // Strategy: walk through char by char, tracking if we're inside quotes
    let result = '';
    let i = 0;
    while (i < json.length) {
      if (json[i] === "'") {
        // Check if this is a boundary quote (start/end of a string value)
        // Look at context: what's before and after
        const before = i > 0 ? json[i - 1] : '';
        
        // If preceded by [, {, :, , or space — it's a string opener
        if ('[{:, '.includes(before) || i === 0) {
          // Find the matching closing single quote
          let j = i + 1;
          let content = '';
          while (j < json.length) {
            if (json[j] === "'" && (json[j + 1] === undefined || ']},: '.includes(json[j + 1]))) {
              break;
            }
            content += json[j];
            j++;
          }
          // Escape any double quotes inside the content
          content = content.replace(/"/g, '\\"');
          result += '"' + content + '"';
          i = j + 1;
          continue;
        }
      }
      result += json[i];
      i++;
    }
    
    return JSON.parse(result);
  } catch (e) {
    console.warn(`  ⚠ Failed to parse Python string: ${str.substring(0, 80)}...`);
    console.warn(`    Error: ${e.message}`);
    // Fallback: try direct JSON parse
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }
}

/**
 * Generate a URL-safe slug from a product name
 */
function generateSlug(name, sku) {
  const cleaned = cleanMojibake(name);
  let slug = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric
    .replace(/\s+/g, '-')          // spaces to hyphens
    .replace(/-+/g, '-')           // collapse multiple hyphens
    .replace(/^-|-$/g, '')         // trim leading/trailing hyphens
    .substring(0, 80);             // truncate to 80 chars
  
  // Remove trailing hyphen after truncation
  slug = slug.replace(/-$/, '');
  
  // Append SKU suffix for uniqueness
  const skuSuffix = sku.toLowerCase();
  slug = `${slug}-${skuSuffix}`;
  
  return slug;
}

/**
 * Parse a CSV line respecting quoted fields
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  
  return fields;
}

/**
 * Filter out self-referencing SKUs from related_product_ids
 */
function filterSelfReferences(relatedSkus, ownSku) {
  if (!relatedSkus) return null;
  return relatedSkus.filter(s => s !== ownSku);
}

// --- Main Import Logic ---

async function main() {
  console.log('🚀 Starting product data import...\n');
  
  // 1. Load category mapping
  console.log('📂 Loading categories...');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id');
  
  if (catError) {
    console.error('Failed to load categories:', catError);
    process.exit(1);
  }
  
  // Build sub-category lookup: "Sub Category Name" → UUID
  const subCatMap = {};
  for (const cat of categories) {
    if (cat.parent_id) {
      subCatMap[cat.name] = cat.id;
    }
  }
  console.log(`  ✅ Loaded ${Object.keys(subCatMap).length} sub-categories\n`);
  
  // 2. Read and parse CSV
  console.log('📄 Reading CSV file...');
  const csvPath = resolve(__dirname, '..', 'Data', 'Final-Data.csv');
  const csvContent = readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').filter(l => l.trim().length > 0);
  
  // Parse header
  const header = parseCSVLine(lines[0]);
  console.log(`  Headers: ${header.join(', ')}`);
  console.log(`  Data rows: ${lines.length - 1}\n`);
  
  // 3. Parse each product row
  const products = [];
  const variants = [];
  let parseErrors = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < header.length) {
      console.warn(`  ⚠ Row ${i} has ${fields.length} fields, expected ${header.length}. Skipping.`);
      parseErrors++;
      continue;
    }
    
    const raw = {};
    for (let j = 0; j < header.length; j++) {
      raw[header[j]] = fields[j];
    }
    
    const sku = raw['product_id'];
    const productName = cleanMojibake(raw['Product Name']);
    const slug = generateSlug(raw['Product Name'], sku);
    
    // Parse JSONB fields from Python-style strings
    const uspBadges = pythonToJson(raw['usp_badges']);
    const materialDetails = pythonToJson(raw['material_details']);
    const dimensionsSpecs = pythonToJson(raw['dimensions_specs']);
    const relatedIds = pythonToJson(raw['related_product_ids']);
    const faqData = pythonToJson(raw['faq_data']);
    
    // Build narrative blocks array
    const narrativeBlocks = [];
    if (raw['narrative_block_1_text']) {
      narrativeBlocks.push({ text: raw['narrative_block_1_text'] });
    }
    if (raw['narrative_block_2_text']) {
      narrativeBlocks.push({ text: raw['narrative_block_2_text'] });
    }
    
    // Resolve category_id from sub_category name
    const subCatName = raw['sub_category'];
    const categoryId = subCatMap[subCatName];
    if (!categoryId) {
      console.warn(`  ⚠ Row ${i} (${sku}): sub-category "${subCatName}" not found in DB. Using "Decor & Accents" fallback.`);
    }
    
    // Clean related products (filter self-references)
    const cleanedRelated = filterSelfReferences(relatedIds, sku);
    
    const product = {
      sku: sku,
      name: productName,
      slug: slug,
      short_description: raw['short_description'] || null,
      description: raw['short_description'] || null, // Use short_description as description too
      base_price_usd: parseFloat(raw['price_current']),
      compare_at_price_usd: parseFloat(raw['price_compare_at']) || null,
      category_id: categoryId || subCatMap['Decor & Accents'],
      usp_badges: uspBadges,
      narrative_blocks: narrativeBlocks.length > 0 ? narrativeBlocks : null,
      faq_data: faqData,
      related_product_skus: cleanedRelated,
      material_details: materialDetails,
      material: Array.isArray(materialDetails) ? materialDetails[0] : null,
      dimensions: dimensionsSpecs ? { specs: dimensionsSpecs } : null,
      rating_avg: parseFloat(raw['rating_average']) || 0,
      review_count: parseInt(raw['review_count']) || 0,
      status: 'active',
      pricing_tag: 'standard',
      visible_to: 'all',
    };
    
    products.push(product);
    
    // Create a default variant for inventory tracking
    variants.push({
      sku: sku,
      product_sku: sku,
      variant_attributes: { default: true },
      stock: parseInt(raw['inventory_count']) || 0,
      is_active: true,
    });
    
    if (i % 10 === 0) {
      console.log(`  Parsed ${i}/${lines.length - 1} rows...`);
    }
  }
  
  console.log(`\n✅ Parsed ${products.length} products (${parseErrors} errors)\n`);
  
  // 4. Upsert products into Supabase
  console.log('⬆️  Upserting products into Supabase...');
  
  // Batch upsert in chunks of 20
  const BATCH_SIZE = 20;
  let insertedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    
    const { data, error } = await supabase
      .from('products')
      .upsert(batch, { onConflict: 'sku' })
      .select('id, sku');
    
    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      // Try individual inserts for the failed batch
      for (const product of batch) {
        const { error: singleError } = await supabase
          .from('products')
          .upsert(product, { onConflict: 'sku' });
        
        if (singleError) {
          console.error(`    ❌ ${product.sku}: ${singleError.message}`);
          errorCount++;
        } else {
          insertedCount++;
        }
      }
    } else {
      insertedCount += data.length;
      console.log(`  ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${data.length} products upserted`);
    }
  }
  
  console.log(`\n✅ Products: ${insertedCount} upserted, ${errorCount} errors\n`);
  
  // 5. Create default variants
  console.log('📦 Creating default product variants...');
  
  // First, get all product IDs by SKU
  const { data: allProducts, error: fetchError } = await supabase
    .from('products')
    .select('id, sku');
  
  if (fetchError) {
    console.error('Failed to fetch products:', fetchError);
    process.exit(1);
  }
  
  const skuToId = {};
  for (const p of allProducts) {
    skuToId[p.sku] = p.id;
  }
  
  const variantRows = variants.map(v => ({
    product_id: skuToId[v.product_sku],
    sku: v.sku,
    variant_attributes: v.variant_attributes,
    stock: v.stock,
    is_active: v.is_active,
  })).filter(v => v.product_id); // Filter out any without matching product
  
  // Upsert variants
  const { data: variantData, error: variantError } = await supabase
    .from('product_variants')
    .upsert(variantRows, { onConflict: 'sku' })
    .select('id');
  
  if (variantError) {
    console.error('  ❌ Variant upsert failed:', variantError.message);
  } else {
    console.log(`  ✅ ${variantData.length} variants created\n`);
  }
  
  // 6. Summary
  console.log('═══════════════════════════════════');
  console.log('📊 Import Summary');
  console.log('═══════════════════════════════════');
  console.log(`  Products upserted:  ${insertedCount}`);
  console.log(`  Variants created:   ${variantData?.length || 0}`);
  console.log(`  Parse errors:       ${parseErrors}`);
  console.log(`  Insert errors:      ${errorCount}`);
  console.log('═══════════════════════════════════\n');
  
  // 7. Verification queries
  console.log('🔍 Running verification queries...\n');
  
  const { data: countData } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true });
  console.log(`  Total products in DB: ${countData}`);
  
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  console.log(`  Total products: ${productCount}`);
  
  const { count: variantCount } = await supabase
    .from('product_variants')
    .select('*', { count: 'exact', head: true });
  console.log(`  Total variants: ${variantCount}`);
  
  const { count: catCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });
  console.log(`  Total categories: ${catCount}`);
  
  // Spot check
  const { data: spotCheck } = await supabase
    .from('products')
    .select('sku, name, base_price_usd, compare_at_price_usd, rating_avg, usp_badges, faq_data')
    .limit(3);
  
  console.log('\n  📋 Spot check (first 3 products):');
  for (const p of (spotCheck || [])) {
    console.log(`    ${p.sku}: $${p.base_price_usd} (was $${p.compare_at_price_usd}) | ⭐ ${p.rating_avg}`);
    console.log(`      USP: ${JSON.stringify(p.usp_badges)}`);
    console.log(`      FAQ count: ${Array.isArray(p.faq_data) ? p.faq_data.length : 0}`);
  }
  
  // FK join check
  const { data: joinCheck } = await supabase
    .from('products')
    .select(`
      sku,
      name,
      categories!inner (
        name,
        parent_id
      )
    `)
    .limit(3);
  
  console.log('\n  🔗 FK Join check (product → category):');
  for (const p of (joinCheck || [])) {
    console.log(`    ${p.sku}: category="${p.categories?.name}"`);
  }
  
  console.log('\n✅ Import complete!');
}

main().catch(console.error);
