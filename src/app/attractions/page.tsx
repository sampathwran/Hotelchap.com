"use client";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import DummyWidget from "@/components/DummyWidget";
import { MapPin, ShieldCheck, HeadphonesIcon, ChevronDown, CheckCircle } from "lucide-react";

export default function AttractionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2074&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">Discover Global Attractions</h1>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow-md">Book tickets to top museums, tours and theme parks</p>
          
          <div className="w-full bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <DummyWidget />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32 w-full text-center">
         <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-[#673AB7] mx-auto mb-8">
            <MapPin size={48} />
         </div>
         <h2 className="text-4xl font-black text-gray-900 mb-6">More Attractions & Tours Features Coming Soon</h2>
         <p className="text-xl text-gray-500 max-w-2xl mx-auto">We are currently integrating the best global providers to bring you the ultimate booking experience.</p>
      </div>

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
