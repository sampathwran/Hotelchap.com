"use client";
import { useTranslation } from "@/lib/i18n";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import CruiseSearchWidget from "@/components/CruiseSearchWidget";
import { 
  Anchor, Ship, Map, Waves, CheckCircle, 
  Palmtree, Compass, Sun, ShieldCheck, DollarSign
} from "lucide-react";

export default function CruisesPage() {
  const { t } = useTranslation();
  const popularDestinations = [
    {
      name: "Caribbean",
      desc: "White sand beaches and crystal clear waters.",
      img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Mediterranean",
      desc: "Explore ancient ruins and vibrant cultures.",
      img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Alaska",
      desc: "Glaciers, wildlife, and breathtaking nature.",
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Bahamas",
      desc: "A quick tropical getaway paradise.",
      img: "https://images.unsplash.com/photo-1574542387114-1ee6b1585860?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const cruiseLines = [
    "Royal Caribbean", "Carnival", "Norwegian Cruise Line", 
    "MSC Cruises", "Celebrity Cruises", "Princess Cruises", 
    "Disney Cruise Line", "Holland America"
  ];

  const faqs = [
    { q: "Are meals included in the cruise price?", a: "Yes, almost all cruises include unlimited food at the main dining rooms and buffets. Specialty restaurants may charge an extra fee." },
    { q: "Do I need a passport to cruise?", a: "For most international sailings, a passport is highly recommended or required. Some 'closed-loop' cruises from the US allow a birth certificate, but a passport is always safer." },
    { q: "Is there Wi-Fi on board?", a: "Yes, all modern cruise ships offer Wi-Fi packages. However, it is usually an additional cost and speeds may vary while at sea." },
    { q: "What should I pack?", a: "Pack casual wear for the day, swimwear, comfortable walking shoes for excursions, and a few smart-casual or formal outfits for evening dinners." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[550px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2074&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">{t("Sail Away on an Ocean Adventure")}</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-10 drop-shadow-md">Compare deals from top cruise lines worldwide.</p>
          
          <div className="w-full bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <CruiseSearchWidget />
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Trending Destinations</h2>
              <p className="text-gray-500 font-medium text-lg">Discover the most popular regions to sail right now.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer">
                <div className="h-64 overflow-hidden relative">
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white mb-2">{dest.name}</h3>
                    <p className="text-white/80 font-medium text-sm leading-relaxed">{dest.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Cruise Lines */}
      <div className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Top Cruise Lines We Partner With</h2>
          <p className="text-gray-500 font-medium text-lg mb-12">Book with confidence with the world's best ocean fleets.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {cruiseLines.map((line, idx) => (
              <div key={idx} className="bg-white px-6 py-4 rounded-full shadow-sm border border-gray-100 flex items-center gap-3 hover:border-[#673AB7] hover:shadow-md transition-all cursor-pointer">
                <Anchor className="text-[#673AB7]" size={20} />
                <span className="font-bold text-gray-800">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Why book a cruise with HotelChap?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <DollarSign size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">{t("Best Price Guarantee")}</h3>
            <p className="text-gray-500 text-sm font-medium">We aggregate prices from all major lines to ensure you get the absolute lowest rate.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <Sun size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">Exclusive Perks</h3>
            <p className="text-gray-500 text-sm font-medium">Enjoy onboard credit, free drink packages, or cabin upgrades on select sailings.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">Expert Support</h3>
            <p className="text-gray-500 text-sm font-medium">Our cruise specialists are ready to help you plan the perfect itinerary, from start to finish.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">First Time Cruising?</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <Waves className="text-[#673AB7] flex-shrink-0 mt-1" size={20} />
                  {faq.q}
                </h3>
                <p className="text-gray-600 font-medium pl-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Push Footer to bottom */}
      <div className="mt-auto">
        <MegaFooter />
      </div>
    </div>
  );
}
