import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const targetDir = join(process.cwd(), 'src', 'app', '(seller)');
console.log('Target:', targetDir);
console.log('Exists before:', existsSync(targetDir));

try {
  rmSync(targetDir, { recursive: true, force: true });
  console.log('Exists after:', existsSync(targetDir));
  console.log('Delete successful');
} catch (err) {
  console.error('Delete failed:', err.message);
}
