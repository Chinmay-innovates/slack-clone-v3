import fs from 'fs';
import path from 'path';

const iconsDir = path.resolve(__dirname, '../src/components/icons');
const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
  .filter((file) => file !== 'index.ts');

const lines = files.map((file) => {
  const name = path.basename(file, path.extname(file));
  return `export { default as ${name} } from './${name}';`;
});

fs.writeFileSync(path.join(iconsDir, 'index.ts'), lines.join('\n') + '\n');
console.log('✅ icons/index.ts updated');
