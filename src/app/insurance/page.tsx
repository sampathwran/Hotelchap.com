"use client";
import { useTranslation } from "@/lib/i18n";

import { useState } from "react";
import Header from "@/components/Header";
import MegaFooter from "@/components/MegaFooter";
import { ShieldCheck, HeartPulse, Plane, Briefcase, Clock, Umbrella, CheckCircle, HelpCircle } from "lucide-react";

export default function InsurancePage() {
  const { t } = useTranslation();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [isQuoting, setIsQuoting] = useState(false);

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoting(true);
    setTimeout(() => {
      setIsQuoting(false);
      alert(`Quote calculated for ${travelers} traveler(s) to ${destination || 'your destination'}. Starting from $15.99/week!`);
    }, 1500);
  };

  const coverageItems = [
    { icon: <HeartPulse size={32} />, title: t("Medical Emergencies"), desc: t("Up to $1,000,000 coverage for unexpected illness or injury while abroad.") },
    { icon: <Plane size={32} />, title: t("Trip Cancellation"), desc: t("100% reimbursement if you need to cancel for covered reasons.") },
    { icon: <Briefcase size={32} />, title: t("Lost Baggage"), desc: t("Get compensated for lost, stolen, or damaged luggage and personal items.") },
    { icon: <Clock size={32} />, title: t("Travel Delays"), desc: t("Covers meals and accommodation if your flight is delayed over 6 hours.") },
  ];

  const plans = [
    {
      name: t("Basic"),
      price: "$15.99",
      period: "per week",
      color: "bg-blue-50 border-blue-200",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      features: ["$50,000 Medical Coverage", "Trip Delay ($500)", "Lost Baggage ($1,000)", "24/7 Emergency Assistance"]
    },
    {
      name: t("Standard"),
      price: "$29.99",
      period: "per week",
      color: "bg-purple-50 border-[#673AB7] shadow-xl transform scale-105 relative z-10",
      btnColor: "bg-[#673AB7] hover:bg-purple-700",
      badge: "Most Popular",
      features: ["$250,000 Medical Coverage", "Trip Cancellation (100%)", "Lost Baggage ($2,500)", "Missed Connection Coverage", "24/7 Emergency Assistance"]
    },
    {
      name: t("Premium"),
      price: "$49.99",
      period: "per week",
      color: "bg-orange-50 border-orange-200",
      btnColor: "bg-orange-600 hover:bg-orange-700",
      features: ["$1,000,000 Medical Coverage", "Cancel For Any Reason (CFAR)", "Rental Car Damage", "Adventure Sports Included", "VIP Concierge Service"]
    }
  ];

  const faqs = [
    { q: t("Can I buy insurance after I've started my trip?"), a: t("No, travel insurance must be purchased before you depart from your home country.") },
    { q: t("Does the insurance cover COVID-19?"), a: t("Yes, our Standard and Premium plans include coverage for COVID-19 related medical emergencies and trip cancellations.") },
    { q: t("Are pre-existing medical conditions covered?"), a: t("They can be covered if you purchase the policy within 14 days of your initial trip deposit, subject to certain requirements.") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full py-20 lg:py-32 bg-[#0B1120] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" alt="Family traveling" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-bold mb-6 backdrop-blur-md">
              <Umbrella size={16} /> Travel with Peace of Mind
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t("Protect Your Journey, Anywhere You Go.")}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-medium mb-8 max-w-2xl">
              {t("Comprehensive travel insurance covering medical emergencies, cancellations, and lost luggage. Because the best trips are worry-free.")}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-12 h-12 rounded-full border-2 border-[#0B1120]" />
                ))}
              </div>
              <p className="text-white/80 font-medium"><span className="text-white font-bold text-lg">10,000+</span> travelers protected</p>
            </div>
          </div>
          
          {/* Quote Widget */}
          <div className="w-full lg:w-[450px] bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-[#673AB7]" size={28} />
              {t("Get a Free Quote")}
            </h2>
            <form onSubmit={handleQuote} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Where are you going?</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Europe, Bali, USA"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">When are you traveling?</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Number of Travelers</label>
                <select 
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#673AB7]/50"
                >
                  {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isQuoting}
                className="w-full bg-[#673AB7] hover:bg-purple-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md mt-2 flex justify-center items-center"
              >
                {isQuoting ? (
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Calculate My Quote"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t("What does our insurance cover?")}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("We've got your back in almost any situation, so you can focus on making memories.")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverageItems.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#673AB7] mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t("Simple, Transparent Pricing")}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("Choose the level of protection that fits your journey and budget.")}</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 mt-8">
            {plans.map((plan, idx) => (
              <div key={idx} className={`w-full max-w-sm rounded-3xl p-8 border ${plan.color} relative`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 font-medium">/{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#673AB7] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-md ${plan.btnColor}`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center flex items-center justify-center gap-3">
            <HelpCircle className="text-[#673AB7]" size={36} /> {t("Frequently Asked Questions")}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MegaFooter />
    </div>
  );
}
