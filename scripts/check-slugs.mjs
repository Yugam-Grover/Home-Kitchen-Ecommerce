import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, '..', '.env.local');
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data: parentCats } = await supabase.from('categories').select('id, name, slug, parent_id').is('parent_id', null);
    console.log("Parent Categories:");
    console.dir(parentCats, {depth: null});

    const { data: subCats } = await supabase.from('categories').select('id, name, slug, parent_id').not('parent_id', 'is', null);
    console.log("\nSub Categories (first 5):");
    console.dir(subCats.slice(0, 5), {depth: null});
}
main().catch(console.error);
