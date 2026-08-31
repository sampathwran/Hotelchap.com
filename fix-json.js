const fs = require('fs');
let content = fs.readFileSync('src/lib/dictionaries/SI.json', 'utf8');
const lines = content.split('\n');
for(let i=1; i<lines.length-1; i++) {
  const line = lines[i].trim();
  const nextLine = lines[i+1].trim();
  if (line.endsWith('"') && nextLine.startsWith('"')) {
    console.log('Missing comma at line ' + (i+1));
    lines[i] = lines[i] + ',';
  }
}
fs.writeFileSync('src/lib/dictionaries/SI.json', lines.join('\n'), 'utf8');
console.log('Fixed missing commas');
