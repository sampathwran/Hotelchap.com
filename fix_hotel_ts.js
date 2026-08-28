const fs = require('fs');
let code = fs.readFileSync('src/app/hotel/[id]/page.tsx', 'utf-8');
code = code.replace('export default function HotelDetailsPage() {', 'const getCurrencySymbol = (code: string) => allCurrencies.find(c => c.code === code)?.symbol || code;\n\nexport default function HotelDetailsPage() {');
fs.writeFileSync('src/app/hotel/[id]/page.tsx', code);