const fs = require('fs');
const path = require('path');

const generatePage = (name, Title, Icon, imageSrc, heroTitle, heroSubtitle) => {
  return `"use client";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import DummyWidget from "@/components/DummyWidget";
import { ${Icon}, ShieldCheck, MapPin, HeadphonesIcon, ChevronDown, CheckCircle } from "lucide-react";

export default function ${name}Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('${imageSrc}?q=80&w=2074&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">${heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow-md">${heroSubtitle}</p>
          
          <div className="w-full bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <DummyWidget />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32 w-full text-center">
         <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-[#673AB7] mx-auto mb-8">
            <${Icon} size={48} />
         </div>
         <h2 className="text-4xl font-black text-gray-900 mb-6">More ${Title} Features Coming Soon</h2>
         <p className="text-xl text-gray-500 max-w-2xl mx-auto">We are currently integrating the best global providers to bring you the ultimate booking experience.</p>
      </div>

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
`;
}

// 1. Attractions
const attPath = 'C:/src/hotelchap-web/src/app/attractions';
if (!fs.existsSync(attPath)) fs.mkdirSync(attPath, { recursive: true });
fs.writeFileSync(path.join(attPath, 'page.tsx'), generatePage('Attractions', 'Attractions & Tours', 'MapPin', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2', 'Discover Global Attractions', 'Book tickets to top museums, tours and theme parks'));

// 2. Packages
const pkgPath = 'C:/src/hotelchap-web/src/app/packages';
if (!fs.existsSync(pkgPath)) fs.mkdirSync(pkgPath, { recursive: true });
fs.writeFileSync(path.join(pkgPath, 'page.tsx'), generatePage('Packages', 'Flight + Hotel Packages', 'MapPin', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a', 'Bundle and Save', 'Book your flight and hotel together and save up to 20%'));

// 3. Transfers
const trnPath = 'C:/src/hotelchap-web/src/app/transfers';
if (!fs.existsSync(trnPath)) fs.mkdirSync(trnPath, { recursive: true });
fs.writeFileSync(path.join(trnPath, 'page.tsx'), generatePage('Transfers', 'Airport Transfers', 'MapPin', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2', 'Hassle-Free Airport Transfers', 'Professional drivers waiting for you at arrivals'));

// 4. Cruises
const crzPath = 'C:/src/hotelchap-web/src/app/cruises';
if (!fs.existsSync(crzPath)) fs.mkdirSync(crzPath, { recursive: true });
fs.writeFileSync(path.join(crzPath, 'page.tsx'), generatePage('Cruises', 'Luxury Cruises', 'MapPin', 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b', 'Sail Away on an Ocean Adventure', 'Compare deals from top cruise lines worldwide'));

console.log('Done generating pages!');
