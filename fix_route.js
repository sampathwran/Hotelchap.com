const fs = require('fs');
let code = fs.readFileSync('src/app/api/hotels/search/route.ts', 'utf-8');
code = code.replace(/const rooms = searchParams\.get\('rooms'\) \|\| '1';/, 'const rooms = searchParams.get(\'rooms\') || \'1\';\n  const currency = searchParams.get(\'currency\') || \'USD\';');
code = code.replace(/filter_by_currency=USD/, 'filter_by_currency=\');
fs.writeFileSync('src/app/api/hotels/search/route.ts', code);

