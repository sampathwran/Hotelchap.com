const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// 1. Push the main content down so it doesn't overlap the hero text
content = content.replace(
  'pt-[350px] md:pt-[350px]',
  'pt-[420px] md:pt-[480px]'
);

// 2. Adjust Hero Text positioning to push it up slightly
// Change from justify-center to justify-start and add padding-top so it sits in the upper half
content = content.replace(
  'flex flex-col justify-center items-center px-4 md:px-16 overflow-hidden shadow-2xl transition-all duration-500 pt-20',
  'flex flex-col justify-start items-center px-4 md:px-16 overflow-hidden shadow-2xl transition-all duration-500 pt-[120px] md:pt-[150px]'
);

// Remove the mt-4 on the text container just to keep it clean
content = content.replace(
  '<div className="relative z-10 max-w-3xl text-center mt-4 transition-all duration-500">',
  '<div className="relative z-10 max-w-3xl text-center transition-all duration-500">'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log("Updated Hero Text Positioning");
