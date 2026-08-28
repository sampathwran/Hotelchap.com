const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

const tabs = ['hotels', 'flights', 'cars', 'packages', 'transfers', 'attractions', 'cruises'];

for (const tab of tabs) {
  // Find the block for this tab
  const idRegex = new RegExp(\id:\\s*"\\w*"\, 'g');
  // It's easier to just do a regex that finds image: "..." and replaces it based on the tab name
  // Let's manually replace them since there are only 7
}

// A regex that matches the image property inside each object
content = content.replace(/hotels: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/hotels.png"'));
content = content.replace(/flights: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/flights.png"'));
content = content.replace(/cars: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/cars.png"'));
content = content.replace(/packages: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/packages.png"'));
content = content.replace(/transfers: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/transfers.png"'));
content = content.replace(/attractions: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/attractions.png"'));
content = content.replace(/cruises: \{[\s\S]*?image:\s*"(.*?)"/g, (match) => match.replace(/"[^"]*"$/, '"/image/cruises.png"'));

fs.writeFileSync('src/app/page.tsx', content);
console.log("Fully replaced all image paths.");
