"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useTranslation } from "@/lib/i18n";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
const bookingServices = [
  { name: t("Hotels & Villas"), icon: "🏨", link: "/search" },
  { name: t("Flights"), icon: "✈️", link: "/flights" },
  { name: t("Attractions"), icon: "🎟️", link: "/attractions" },
  { name: t("Car & Bike Rentals"), icon: "🚗", link: "/cars" },
  { name: t("Airport Transfers"), icon: "🚕", link: "/transfers" },
  { name: t("Cruises"), icon: "🛳️", link: "/cruises" },
];

const userSection = [
  { name: t("AI Trip Planner"), icon: "🤖", link: "/planner" },
  { name: t("Saved & Wishlist"), icon: "❤️", link: "/wishlist" },
  { name: t("Explore Maps"), icon: "🗺️", link: "/maps" },
];

const extras = [
  { name: t("Travel Insurance"), icon: "🛡️", link: "/insurance" },
  { name: t("Special Offers"), icon: "🔥", link: "/offers" },
];


  const [isHovered, setIsHovered] = useState(false);
  const { isSidebarExpanded, toggleSidebar } = useSettings();
  const showExpanded = isSidebarExpanded || isHovered;

  // Reusable component for rendering menu links
  const renderLinks = (items: any[]) => (
    items.map((item, index) => (
      <Link 
        href={item.link} 
        key={index}
        className="flex items-center px-6 py-4 text-gray-800 hover:bg-white/60 font-bold hover:text-[#673AB7] transition-colors whitespace-nowrap group"
      >
        <span className="text-2xl min-w-[30px] flex items-center justify-center transition-transform group-hover:scale-110">
          {item.icon}
        </span>
        <span className={`ml-4 font-medium transition-opacity duration-300 ${pathname === "/" ? ((isSidebarExpanded || isHovered) ? "opacity-100" : "opacity-0") : "opacity-100"}`}>
          {t(item.name)}
        </span>
      </Link>
    ))
  );

  return (
    <>
      {/* Fixed Hamburger Menu Button */}
      {pathname === '/' ? (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 md:top-8 md:left-8 z-[80] p-2 text-gray-800 bg-white/80 backdrop-blur-md shadow-sm hover:text-[#673AB7] hover:bg-white rounded-full transition-colors drop-shadow-md"
        >
          <Menu size={28} />
        </button>
      ) : (
        <button 
          onMouseEnter={() => setIsHovered(true)}
          onClick={() => setIsHovered(!isHovered)}
          className="fixed top-4 left-4 md:top-6 md:left-8 z-[100] p-2 text-gray-800 bg-white/80 backdrop-blur-md shadow-sm hover:text-[#673AB7] hover:bg-white rounded-full transition-colors drop-shadow-md"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Desktop Sidebar (Floating/Expanding Glassmorphism) */}
      <div 
        className={
          pathname === '/' 
            ? `hidden md:block fixed left-0 top-[96px] h-[calc(100vh-96px)] z-[55] bg-transparent transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-[250px]' : 'w-[80px]'}`
            : `hidden md:block fixed left-0 top-0 h-screen z-[95] transition-all duration-300 ease-in-out ${isHovered ? 'w-[250px]' : 'w-0 overflow-hidden opacity-0 pointer-events-none'}`
        }
        onMouseEnter={() => pathname === '/' && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={
          pathname === '/'
            ? `absolute top-0 left-0 h-[calc(100vh-96px)] transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden ${(isSidebarExpanded || isHovered) ? 'w-[250px] bg-white/95 backdrop-blur-2xl shadow-xl border-r border-gray-200' : 'w-[80px] bg-transparent'}`
            : `w-[250px] h-full bg-white/95 backdrop-blur-2xl shadow-2xl border-r border-gray-200 flex flex-col pt-24 overflow-y-auto`
        }>
          {/* Menu Items Container */}
          <div className="flex flex-col flex-1 mt-2">
            
            {/* Section 1: Core Services */}
            <div className="pb-4">
              {renderLinks(bookingServices)}
            </div>

            {/* Section 2: User Tools (Bookings, Maps) */}
            <div className="border-t border-gray-200 py-4">
              {renderLinks(userSection)}
            </div>

            {/* Section 3: Extras */}
            <div className="border-t border-gray-200 pt-4 pb-10">
              {renderLinks(extras)}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-50 flex justify-around items-center h-[70px] px-2 pb-safe border-t border-white/50">
        
        {/* Home Button */}
        <Link href="/" className="flex flex-col items-center justify-center min-w-[65px] px-2 py-1 text-gray-600 hover:text-[#673AB7]">
          <span className="text-xl mb-1">🏠</span>
          <span className="text-[10px] font-medium text-center leading-tight truncate w-full">{t("Home")}</span>
        </Link>
        
        {/* Mobile Items: Items NOT in the Home Tabs */}
        {[userSection[0], userSection[1], userSection[2], extras[1]].map((item, index) => (
          <Link 
            href={item.link} 
            key={index}
            className="flex flex-col items-center justify-center min-w-[65px] px-2 py-1 text-gray-600 hover:text-[#673AB7]"
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-medium text-center leading-tight truncate w-full">{t(item.name)}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
