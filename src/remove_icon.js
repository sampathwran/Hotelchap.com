const fs = require('fs');
let content = fs.readFileSync('C:/src/hotelchap-web/src/components/Header.tsx', 'utf8');

content = content.replace('<button className="text-xl">🔍</button>', '');

fs.writeFileSync('C:/src/hotelchap-web/src/components/Header.tsx', content, 'utf8');
console.log('Fixed');
