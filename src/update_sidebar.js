const fs = require('fs');
const file = 'C:/src/hotelchap-web/src/components/Sidebar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace userSection to add Saved & Wishlist
const newUserSection = `const userSection = [
  { name: "AI Trip Planner", icon: "✨", link: "/planner" },
  { name: "My Bookings", icon: "📅", link: "/bookings" },
  { name: "Saved & Wishlist", icon: "❤️", link: "/wishlist" },
  { name: "Explore Maps", icon: "🗺️", link: "/maps" },
];`;

content = content.replace(/const userSection = \[[\s\S]*?\];/, newUserSection);

// Replace Mobile Bottom Navigation to show new items instead of booking services
const newMobileBottomNav = `      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-50 flex justify-around items-center h-[70px] px-2 pb-safe border-t border-gray-100">
        
        {/* Home Button */}
        <Link href="/" className="flex flex-col items-center justify-center min-w-[65px] px-2 py-1 text-gray-600 hover:text-[#673AB7]">
          <span className="text-xl mb-1">🏠</span>
          <span className="text-[10px] font-medium text-center leading-tight truncate w-full">Home</span>
        </Link>
        
        {/* Mobile Items: Items NOT in the Home Tabs */}
        {[userSection[0], userSection[1], userSection[2], extras[1]].map((item, index) => (
          <Link 
            href={item.link} 
            key={index}
            className="flex flex-col items-center justify-center min-w-[65px] px-2 py-1 text-gray-600 hover:text-[#673AB7]"
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-medium text-center leading-tight truncate w-full">{item.name}</span>
          </Link>
        ))}
      </div>`;

content = content.replace(/{\/\* Mobile Bottom Navigation \(Hidden on Desktop\) \*\/}[\s\S]*?<\/div>/, newMobileBottomNav);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated Sidebar.tsx");
