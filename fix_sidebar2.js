const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// Change the inner container: remove border, shadow, and heavy glass when collapsed. 
// When hovered, show glass. When not hovered, be totally transparent.
content = content.replace(
  'bg-white/30 backdrop-blur-xl shadow-2xl border-r border-white/40 transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden ',
  'transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden '
);

// We should also remove the background color from links when NOT hovered, or make them look clean.
// Actually, floating icons with 	ext-gray-800 are perfectly fine.

// Let's also remove g-transparent from the outer wrapper if we don't need it to block clicks, but it's fine.
fs.writeFileSync('src/components/Sidebar.tsx', content);
console.log("Updated Sidebar to float seamlessly");
