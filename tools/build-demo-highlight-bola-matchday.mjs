import { readFile, writeFile } from 'node:fs/promises';
const folder = new URL('../iklan/demo-highlight-bola-matchday-portrait/', import.meta.url);
const logo = await readFile(new URL('../_shared/logo-klipers.png', import.meta.url));
const html = await readFile(new URL('template.html', folder), 'utf8');
await writeFile(new URL('index.html', folder), html.replaceAll('__LOGO__', `data:image/png;base64,${logo.toString('base64')}`));
console.log('Built demo-highlight-bola-matchday-portrait/index.html');
