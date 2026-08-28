const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// Replace Unsplash URLs with local paths for each tab
content = content.replace(/image:\s*".*?"/g, (match, p1, offset, string) => {
  // We need to figure out which tab we are in.
  // A safer way is to just do explicit string replacements for each one to avoid breaking anything else.
  return match; // placeholder
});

// Since the file has exactly 7 images in tabData, let's do it directly:
const replacements = {
  'https://images.unsplash.com/photo-1542314831-c53cd3b8ffac?q=80&w=2000&auto=format&fit=crop': '/image/hotels.png',
  'https://images.unsplash.com/photo-1436491865332-7a615061c443?q=80&w=2000&auto=format&fit=crop': '/image/flights.png',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop': '/image/cars.png',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop': '/image/packages.png',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop': '/image/transfers.png',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop': '/image/attractions.png',
  'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2000&auto=format&fit=crop': '/image/cruises.png'
};

for (const [oldUrl, newPath] of Object.entries(replacements)) {
  content = content.replace(oldUrl, newPath);
}

fs.writeFileSync('src/app/page.tsx', content);
console.log("Updated page.tsx images to local paths");
