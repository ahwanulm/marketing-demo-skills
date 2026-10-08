import fs from 'node:fs';
import path from 'node:path';

function b64(file) {
  const data = fs.readFileSync(file);
  const ext = path.extname(file).slice(1);
  return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${data.toString('base64')}`;
}

const adDir = 'marketing/iklan/demo-gaming-quickprocess-portrait';
const assetDir = path.join(adDir, 'assets');

console.log('Encoding assets to base64...');
const replacements = {
  '__WIDE0__': b64(path.join(assetDir, 'wide0.jpg')),
  '__WIDE1__': b64(path.join(assetDir, 'wide1.jpg')),
  '__FACECAM0__': b64(path.join(assetDir, 'facecam0.jpg')),
  '__FACECAM1__': b64(path.join(assetDir, 'facecam1.jpg')),
  '__GAMEPLAY0__': b64(path.join(assetDir, 'gameplay0.jpg')),
  '__GAMEPLAY1__': b64(path.join(assetDir, 'gameplay1.jpg')),
  '__CLIP0__': b64(path.join(assetDir, 'clip0.jpg')),
  '__CLIP1__': b64(path.join(assetDir, 'clip1.jpg')),
  '__CLIP2__': b64(path.join(assetDir, 'clip2.jpg')),
  '__LOGO__': b64('marketing/_shared/logo-klipers.png')
};

const templatePath = path.join(adDir, 'template.html');
let content = fs.readFileSync(templatePath, 'utf8');

for (const [k, v] of Object.entries(replacements)) {
  content = content.replaceAll(k, v);
}

const outPath = path.join(adDir, 'index.html');
fs.writeFileSync(outPath, content, 'utf8');
console.log(`Successfully built ${outPath} (${(content.length / 1024).toFixed(1)} KB)`);
