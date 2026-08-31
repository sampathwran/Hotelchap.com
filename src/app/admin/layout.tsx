"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Sparkles, 
  Flame, 
  Settings, 
  Search,
  Bell,
  Globe,
  Moon,
  Menu,
  X,
  ChevronRight,
  LogOut,
  FileText
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

    const menuItems: Array<{ name: string; icon: React.ReactNode; href: string; isMain: boolean; badge?: string }> = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin", isMain: true },
    { name: "Bookings", icon: <ShoppingCart size={20} />, href: "/admin/bookings", isMain: true },
      { name: "Subscribers", icon: <Users size={20} />, href: "/admin/subscribers", isMain: true },
    { name: "Destinations", icon: <Globe size={20} />, href: "/admin/destinations", isMain: true },
    { name: "Flash Deals", icon: <Flame size={20} />, href: "/admin/deals", isMain: true },
    { name: "Travel Blog", icon: <FileText size={20} />, href: "/admin/blog", isMain: true },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings", isMain: true },
  ];

  return (
    <div className="flex h-screen bg-[#f3f4f7] font-sans overflow-hidden text-gray-800">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-[260px] bg-[#111c43] text-[#a3aed1] shadow-2xl z-20 transition-all duration-300">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center font-black text-lg shadow-lg">H</div>
            <span className="font-bold text-2xl tracking-wide">HotelChap<span className="text-purple-400">.</span></span>
          </div>
        </div>
        
        {/* Menu Scroll Area */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-6 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c6792]">Main</div>
          
          <nav className="flex flex-col gap-1 px-3">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href && item.isMain;
              
              if (!item.isMain) {
                return (
                  <Link key={idx} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:text-white">
                    <span className="text-[#5c6792]">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return (
                <Link 
                  key={idx} 
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${isActive ? 'bg-[#845adf]/10 text-white relative' : 'hover:bg-white/5 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? 'text-[#845adf]' : 'text-[#a3aed1] group-hover:text-white'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.badge === 'Hot' ? 'bg-red-500/20 text-red-400' : 'bg-[#845adf]/20 text-[#845adf]'}`}>
                      {item.badge}
                    </span>
                  )}
                  
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#845adf] rounded-r-full"></div>}
                </Link>
              );
            })}
          </nav>
        </div>

      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-10 shadow-sm">
          
          {/* Left Side: Mobile Menu & Search */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-900 transition"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 focus-within:border-purple-300 focus-within:bg-white transition-all w-64">
              <Search size={18} />
              <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700" />
            </div>
          </div>

          {/* Right Side: Icons & Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition"><Globe size={20} /></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition"><Moon size={20} /></button>
            
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1 md:mx-2 hidden md:block"></div>

            <div className="flex items-center gap-3 cursor-pointer pl-2">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-900 leading-none mb-1">Super Admin</span>
                <span className="text-[11px] text-gray-500 leading-none">Web Developer</span>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Admin" className="w-9 h-9 rounded-full ring-2 ring-gray-100 object-cover" />
            </div>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 bg-[#111c43] text-white z-50 flex flex-col animate-fade-in">
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
              <span className="font-bold text-xl">HotelChap Admin</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 p-2"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
              {menuItems.filter(i => i.isMain).map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-white/10 transition"
                >
                  <span className="text-purple-400">{item.icon}</span>
                  <span className="font-semibold text-lg">{item.name}</span>
                </Link>
              ))}
              <div className="mt-8 border-t border-white/10 pt-4 px-4">
                 <Link href="/" className="flex items-center gap-3 py-4 text-gray-400">
                    <LogOut size={20} />
                    <span>Back to Website</span>
                 </Link>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {children}
        </div>

      </div>
    </div>
  );
}
