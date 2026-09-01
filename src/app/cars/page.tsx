"use client";
import { useTranslation } from "@/lib/i18n";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import TravelpayoutsRentalWidget from "@/components/TravelpayoutsRentalWidget";
import PopularVehicles from "@/components/PopularVehicles";
import TrustedPartnersMarquee from "@/components/TrustedPartnersMarquee";
import { Car, ShieldCheck, MapPin, HeadphonesIcon, ChevronDown, CheckCircle } from "lucide-react";

export default function CarsPage() {
  const { t } = useTranslation();


  const faqs = [
    { q: "What do I need to rent a car or bike?", a: t("You will need a valid driver's license (International Driving Permit for some countries), a passport or ID card, and a credit card in the main driver's name for the deposit.") },
    { q: "Is insurance included in the rental price?", a: t("Most rentals include basic Collision Damage Waiver (CDW) and Theft Protection. You can always purchase comprehensive insurance at the counter for total peace of mind.") },
    { q: "Can I pick up the vehicle at the airport?", a: t("Yes! We offer convenient airport pick-up locations worldwide. Just enter your arrival airport in the search box above.") },
    { q: "Is there a mileage limit?", a: t("Many of our partners offer unlimited mileage, but some special vehicles might have a daily limit. Always check the rental conditions before booking.") }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center py-8 md:py-0 bg-[#673AB7] md:bg-transparent overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50 hidden md:block"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 drop-shadow-lg">{t("Hit the road with HotelChap")}</h1>
          <p className="text-sm md:text-xl text-white/90 font-medium mb-6 md:mb-8 drop-shadow-md">{t("Compare the best car and bike rental deals worldwide")}</p>
          
          {/* Glassmorphism Wrapper for the Widget */}
          <div className="w-full sm:w-[95%] bg-white/5 md:bg-white/10 backdrop-blur-md p-1 sm:p-2 md:p-8 rounded-xl md:rounded-3xl border border-white/10 md:border-white/20 shadow-2xl transform scale-[0.95] sm:scale-100 md:scale-100 origin-top">
            <TravelpayoutsRentalWidget />
          </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <TrustedPartnersMarquee />

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 w-full">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 text-center">{t("Why rent with HotelChap?")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <Car className="w-6 h-6 md:w-9 md:h-9" />
            </div>
            <h3 className="font-bold text-[13px] md:text-xl text-gray-900 mb-1 md:mb-3">{t("Huge Selection")}</h3>
            <p className="text-gray-500 font-medium text-[10px] md:text-base leading-tight md:leading-relaxed">{t("From economy cars to luxury SUVs and agile scooters, find your perfect ride.")}</p>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <ShieldCheck className="w-6 h-6 md:w-9 md:h-9" />
            </div>
            <h3 className="font-bold text-[13px] md:text-xl text-gray-900 mb-1 md:mb-3">{t("Secure & Insured")}</h3>
            <p className="text-gray-500 font-medium text-[10px] md:text-base leading-tight md:leading-relaxed">{t("Most of our rentals come with basic insurance included for your peace of mind.")}</p>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <MapPin className="w-6 h-6 md:w-9 md:h-9" />
            </div>
            <h3 className="font-bold text-[13px] md:text-xl text-gray-900 mb-1 md:mb-3">{t("Anywhere You Go")}</h3>
            <p className="text-gray-500 font-medium text-[10px] md:text-base leading-tight md:leading-relaxed">{t("Pick up your vehicle from airports, train stations, or downtown city locations.")}</p>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <HeadphonesIcon className="w-6 h-6 md:w-9 md:h-9" />
            </div>
            <h3 className="font-bold text-[13px] md:text-xl text-gray-900 mb-1 md:mb-3">{t("24/7 Support")}</h3>
            <p className="text-gray-500 font-medium text-[10px] md:text-base leading-tight md:leading-relaxed">{t("Our multi-lingual customer support team is always here to help you on the road.")}</p>
          </div>
        </div>
      </div>

      {/* Popular Vehicles */}
      <PopularVehicles />

      {/* Benefits & FAQ */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-6 text-center md:text-left">{t("Drive your own adventure")}</h2>
          <p className="text-gray-500 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed text-center md:text-left">{t("Whether you're exploring winding mountain roads on a motorcycle, or cruising along the coastline with your family in a spacious SUV, we have exactly what you need.")}</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700 font-bold text-sm md:text-base"><CheckCircle className="text-green-500" size={24} /> {t("Free cancellation on most bookings")}</li>
            <li className="flex items-center gap-3 text-gray-700 font-bold text-sm md:text-base"><CheckCircle className="text-green-500" size={24} /> {t("No hidden credit card fees")}</li>
            <li className="flex items-center gap-3 text-gray-700 font-bold text-sm md:text-base"><CheckCircle className="text-green-500" size={24} /> {t("Flexible pick-up and drop-off")}</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 md:mb-8 text-center md:text-left">{t("Frequently Asked Questions")}</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm open:bg-[#673AB7] open:text-white transition-colors duration-300">
                <summary className="font-bold text-sm md:text-lg cursor-pointer list-none flex justify-between items-center group-open:text-white text-gray-800">
                  {faq.q}
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-2 md:mt-4 text-xs md:text-base text-gray-500 group-open:text-white/90 leading-relaxed">
                  {faq.a}
                </p>
              </details>
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
