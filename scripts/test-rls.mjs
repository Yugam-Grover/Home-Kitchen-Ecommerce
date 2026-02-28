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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const anonClient = createClient(url, anonKey);
const adminClient = createClient(url, serviceKey);

async function testRLS() {
    console.log("--- Testing Anon Client ---");
    const { data: anonData, error: anonErr } = await anonClient.from('categories').select('slug').limit(2);
    console.log("Anon Error:", anonErr);
    console.log("Anon Data:", anonData);

    console.log("\n--- Testing Admin Client ---");
    const { data: adminData, error: adminErr } = await adminClient.from('categories').select('slug').limit(2);
    console.log("Admin Error:", adminErr);
    console.log("Admin Data:", adminData);
}

testRLS().catch(console.error);
