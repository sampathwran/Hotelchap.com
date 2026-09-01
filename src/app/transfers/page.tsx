"use client";
import { useTranslation } from "@/lib/i18n";

import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import TravelpayoutsTransferWidget from "@/components/TravelpayoutsTransferWidget";
import { 
  MapPin, ShieldCheck, HeadphonesIcon, Clock, CheckCircle, 
  PlaneLanding, Wallet, ThumbsUp, Car, Users, Star, Luggage 
} from "lucide-react";

import TransferFleet from "@/components/TransferFleet";

export default function TransfersPage() {
  const { t } = useTranslation();

  const faqs = [
    { q: t("How do I meet my driver at the airport?"), a: t("Your driver will wait in the arrivals hall holding a sign with your name. You will also receive their contact details before your trip.") },
    { q: t("What if my flight is delayed?"), a: t("We monitor all flights. If your flight is delayed, the driver will adjust the pickup time automatically at no extra charge.") },
    { q: t("Are the prices fixed?"), a: t("Yes, all our transfer prices are fixed and all-inclusive. There are no hidden fees, tolls, or extra charges at the end of your trip.") },
    { q: t("Can I cancel or change my booking?"), a: t("Yes, most of our transfers offer free cancellation up to 24 hours before the scheduled pickup time.") }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section with Widget */}
      <div className="relative w-full min-h-[550px] flex items-center justify-center py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582294191636-407871308aeb?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">{t("Premium Airport Transfers")}</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-10 drop-shadow-md">{t("Professional drivers, fixed prices, and flight tracking.")}</p>
          
          <div className="w-full bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <TravelpayoutsTransferWidget />
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t("How it works")}</h2>
            <p className="text-gray-500 font-medium text-lg">{t("Book your transfer in 3 simple steps")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 bg-[#673AB7] text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-purple-200 border-4 border-white">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("1. Enter your ride details")}</h3>
              <p className="text-gray-500">{t("Specify your pickup location, drop-off destination, and flight details.")}</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 bg-[#673AB7] text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-purple-200 border-4 border-white">
                <Car size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("2. Choose your vehicle")}</h3>
              <p className="text-gray-500">{t("Select from economy cars, luxury sedans, or spacious minivans.")}</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 bg-[#673AB7] text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-purple-200 border-4 border-white">
                <ThumbsUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("3. Meet your driver")}</h3>
              <p className="text-gray-500">{t("Your driver will be waiting at arrivals with a name sign, ready to help.")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Classes */}
      <TransferFleet />

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">{t("Why book with HotelChap Transfers?")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <PlaneLanding size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">{t("Flight Tracking")}</h3>
            <p className="text-gray-500 text-sm font-medium">{t("Drivers monitor your flight and adjust the pickup time if you're delayed.")}</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <Wallet size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">{t("Fixed Pricing")}</h3>
            <p className="text-gray-500 text-sm font-medium">{t("The price you see is the price you pay. No hidden fees or toll surprises.")}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">{t("Safe & Reliable")}</h3>
            <p className="text-gray-500 text-sm font-medium">{t("All our drivers are licensed, insured, and thoroughly vetted for your safety.")}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#673AB7] mb-6">
              <HeadphonesIcon size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">{t("24/7 Support")}</h3>
            <p className="text-gray-500 text-sm font-medium">Our customer service team is always available to help you via chat or phone.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">{t("Frequently Asked Questions")}</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <CheckCircle className="text-[#673AB7] flex-shrink-0 mt-1" size={20} />
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
