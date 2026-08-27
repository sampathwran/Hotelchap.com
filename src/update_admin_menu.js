const fs = require('fs');
const file = 'C:/src/hotelchap-web/src/app/admin/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure FileText is imported
if (!content.includes('FileText')) {
    content = content.replace('import {', 'import { FileText,');
}

const newMenuItems = `  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin", isMain: true },
    { name: "Bookings", icon: <ShoppingCart size={20} />, href: "/admin/bookings", isMain: true },
    { name: "Destinations", icon: <Globe size={20} />, href: "/admin/destinations", isMain: true },
    { name: "Flash Deals", icon: <Flame size={20} />, href: "/admin/deals", isMain: true },
    { name: "Travel Blog", icon: <FileText size={20} />, href: "/admin/blog", isMain: true },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings", isMain: true },
  ];`;

content = content.replace(/const menuItems = \[[\s\S]*?\];/, newMenuItems);
fs.writeFileSync(file, content, 'utf8');
console.log("Updated Admin Layout menu");
