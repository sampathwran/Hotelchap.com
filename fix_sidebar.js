const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// 1. Desktop container wrapper (remove solid background, adjust top spacing for h-24 header)
content = content.replace(
  'className="hidden md:block sticky top-20 h-[calc(100vh-80px)] z-50 bg-[#f5f5f5] w-[80px]"',
  'className="hidden md:block sticky top-24 h-[calc(100vh-96px)] z-50 bg-transparent w-[80px]"'
);

// 2. Expandable container (Make it glassmorphic)
content = content.replace(
  'bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden ',
  'bg-white/30 backdrop-blur-xl shadow-2xl border-r border-white/40 transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden '
);
// Also adjust its height from 80px to 96px
content = content.replace(
  'h-[calc(100vh-80px)] bg-white/30',
  'h-[calc(100vh-96px)] bg-white/30'
);

// 3. Link Hover background (from gray-50 to white/50 glass)
content = content.split(
  'className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#673AB7] transition-colors whitespace-nowrap group"'
).join(
  'className="flex items-center px-6 py-4 text-gray-800 hover:bg-white/60 font-bold hover:text-[#673AB7] transition-colors whitespace-nowrap group"'
);

// 4. Dividers
content = content.split('border-gray-100').join('border-white/50');

// (Optional) Mobile bottom nav: We can leave it white since it's at the bottom and has no image behind it. But we can make it slightly transparent just in case.
content = content.split(
  'fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.1)]'
).join(
  'fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-5px_15px_rgba(0,0,0,0.1)]'
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
console.log("Updated Sidebar safely");
