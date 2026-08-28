const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// 1. Sidebar alignment: Move pt-[400px] from the flex container to the main container
content = content.replace(
  '<div className="flex flex-1 relative max-w-[1400px] mx-auto w-full pt-[400px] md:pt-[450px]">',
  '<div className="flex flex-1 relative max-w-[1400px] mx-auto w-full pt-10 md:pt-20">'
);
content = content.replace(
  '<main className="flex-1 flex flex-col w-full md:w-[calc(100%-80px)] min-h-screen pb-24 md:pb-0 z-10">',
  '<main className="flex-1 flex flex-col w-full md:w-[calc(100%-80px)] min-h-screen pb-24 md:pb-0 z-10 pt-[350px] md:pt-[350px]">'
);

// 2. Change header background to Light gradient
content = content.replace(
  'bg-gradient-to-b from-black/60 via-black/20 to-transparent',
  'bg-gradient-to-b from-white/95 via-white/80 to-transparent'
);

// 3. Fix Logo size and remove the white box since the header is light now
content = content.replace(
  '<img src="/logo.png" alt="HotelChap Logo" className="h-16 md:h-20 w-auto object-contain bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg" />',
  '<img src="/logo.png" alt="HotelChap Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />'
);

// 4. Change header text and buttons back to dark gray using split-join
content = content.split(
  'className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-white/80 text-sm font-medium focus:outline-none focus:bg-white/30 transition"'
).join(
  'className="w-full bg-white/70 backdrop-blur-md border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-gray-800 placeholder-gray-500 text-sm font-medium focus:outline-none focus:bg-white transition shadow-sm"'
);

// Revert Language/Currency toggles text color
content = content.split(
  'className="font-bold text-white drop-shadow-md text-sm flex items-center gap-1"'
).join(
  'className="font-bold text-gray-800 text-sm flex items-center gap-1 drop-shadow-sm"'
);

content = content.split(
  'className="font-bold text-white drop-shadow-md hover:text-white transition flex items-center gap-1"'
).join(
  'className="font-bold text-gray-800 hover:text-[#673AB7] transition flex items-center gap-1 drop-shadow-sm"'
);

// Icons
content = content.split('<CircleDollarSign size={16} className="text-white" />').join('<CircleDollarSign size={16} className="text-gray-700" />');
content = content.split('<Globe size={16} className="text-white" />').join('<Globe size={16} className="text-gray-700" />');
content = content.split('<CircleDollarSign size={18} className="text-white mr-1" />').join('<CircleDollarSign size={18} className="text-gray-700 mr-1" />');
content = content.split('<Globe size={18} className="text-white mr-1" />').join('<Globe size={18} className="text-gray-700 mr-1" />');

// Top desktop links
content = content.split(
  'className="font-semibold text-white/90 drop-shadow-md hover:text-white transition"'
).join(
  'className="font-bold text-gray-800 drop-shadow-sm hover:text-[#673AB7] transition"'
);

// Sign In Button
content = content.split(
  'className="font-bold text-white bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-white/30 transition"'
).join(
  'className="font-bold text-white bg-[#673AB7] px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-[#522b94] transition"'
);

// Remove the g-black/20 from the hero image overlay entirely, or make it very light, so the original image colors pop!
content = content.replace(
  '<div className="absolute inset-0 bg-black/20 transition-opacity duration-500"></div>',
  '<div className="absolute inset-0 bg-black/10 transition-opacity duration-500"></div>'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log("Updated page.tsx safely");
