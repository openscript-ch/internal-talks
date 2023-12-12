import fs from 'node:fs/promises';

const TALKS_PATH = 'dist/';
const OUTPUT_PATH = 'dist/index.html';
const talks = [];

const talksFiles = await fs.readdir(TALKS_PATH, { withFileTypes: true });
for (const file of talksFiles) {
  if (file.isDirectory()) {
    talks.push(file.name);
  }
}

const createLinkList = (talks) => talks.map(talk => `<li><a href="./${talk}">${talk}</a></li>`).join('');
await fs.writeFile(OUTPUT_PATH, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our internal talks</title>
  </head>
  <body>
    <ul>
      ${createLinkList(talks)}
    </ul>
  </body>
</html>
`);
