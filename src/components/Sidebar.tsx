"use client";

import Link from "next/link";
import { useState } from "react";

const bookingServices = [
  { name: "Hotels & Villas", icon: "🏨", link: "/search" },
  { name: "Flights", icon: "✈️", link: "/flights" },
  { name: "Flight + Hotel", icon: "💼", link: "/packages" },
  { name: "Attractions", icon: "🎟️", link: "/attractions" },
  { name: "Car & Bike Rentals", icon: "🚗", link: "/cars" },
  { name: "Airport Transfers", icon: "🚕", link: "/transfers" },
  { name: "Cruises", icon: "🛳️", link: "/cruises" },
];

const userSection = [
  { name: "AI Trip Planner", icon: "✨", link: "/planner" },
  { name: "My Bookings", icon: "📅", link: "/bookings" },
  { name: "Saved & Wishlist", icon: "❤️", link: "/wishlist" },
  { name: "Explore Maps", icon: "🗺️", link: "/maps" },
];

const extras = [
  { name: "Travel Insurance", icon: "🛡️", link: "/insurance" },
  { name: "Special Offers", icon: "🏷️", link: "/offers" },
  { name: "Travel Expert", icon: "🎧", link: "/expert" },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  // Reusable component for rendering menu links
  const renderLinks = (items: any[]) => (
    items.map((item, index) => (
      <Link 
        href={item.link} 
        key={index}
        className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#673AB7] transition-colors whitespace-nowrap group"
      >
        <span className="text-2xl min-w-[30px] flex items-center justify-center transition-transform group-hover:scale-110">
          {item.icon}
        </span>
        <span className={`ml-4 font-medium transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {item.name}
        </span>
      </Link>
    ))
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar (Hidden on Mobile) */}
      <div className="hidden md:block sticky top-20 h-[calc(100vh-80px)] z-50 bg-[#f5f5f5] w-[80px]">
        <div 
          className={`absolute top-0 left-0 h-[calc(100vh-80px)] bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden ${isHovered ? 'w-[250px]' : 'w-[80px]'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Menu Items Container */}
          <div className="flex flex-col flex-1 mt-2">
            
            {/* Section 1: Core Services */}
            <div className="pb-4">
              {renderLinks(bookingServices)}
            </div>

            {/* Section 2: User Tools (Bookings, Maps) - Added Gap/Divider */}
            <div className="border-t border-gray-100 py-4">
              {renderLinks(userSection)}
            </div>

            {/* Section 3: Extras - Added Gap/Divider */}
            <div className="border-t border-gray-100 pt-4 pb-10">
              {renderLinks(extras)}
            </div>

          </div>
        </div>
      </div>

            {/* Mobile Bottom Navigation (Hidden on Desktop) */}
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
      </div>
    </>
  );
}
