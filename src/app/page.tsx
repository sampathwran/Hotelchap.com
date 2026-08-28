"use client";

import Sidebar from "@/components/Sidebar";
import PopularDestinations from "@/components/PopularDestinations";
import PartnerLogos from "@/components/PartnerLogos";
import RecentlyViewed from "@/components/RecentlyViewed";
import TravelBlog from "@/components/TravelBlog";
import FlashDeals from "@/components/FlashDeals";
import WhyChooseUs from "@/components/WhyChooseUs";
import AppDownload from "@/components/AppDownload";
import CustomerReviews from "@/components/CustomerReviews";
import MegaFooter from "@/components/MegaFooter";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Globe, CircleDollarSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import TravelpayoutsFlightWidget from "@/components/TravelpayoutsFlightWidget";
import TravelpayoutsRentalWidget from "@/components/TravelpayoutsRentalWidget";
import TravelpayoutsTransferWidget from "@/components/TravelpayoutsTransferWidget";
import DummyWidget from "@/components/DummyWidget";

// Data for dynamic tabs with translations
const tabData: any = {
  hotels: {
    id: "hotels",
    title: { EN: "Find your perfect stay", SI: "ඔබේ නිවාඩුවට හොඳම තැන", TA: "உங்கள் சரியான தங்குமிடத்தைக் கண்டறியவும்" },
    subtitle: { EN: "Luxury & Budget Hotels", SI: "සුඛෝපභෝගී සහ සාමාන්‍ය හෝටල්", TA: "ஆடம்பர மற்றும் பட்ஜெட் ஹோட்டல்கள்" },
    gradientText: { EN: "anywhere in the world.", SI: "ලෝකයේ ඕනෑම තැනකින්.", TA: "உலகின் எந்த இடத்திலும்." },
    image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Hotel Search Widget Goes Here", SI: "හෝටල් සෙවීමේ පද්ධතිය", TA: "ஹோட்டல் தேடல் அமைப்பு" },
    badges: { EN: ["🏨 2M+ Properties", "🛡️ Secure Booking"], SI: ["🏨 ලක්ෂ 20+ හෝටල්", "🛡️ ආරක්ෂිත වෙන්කිරීම්"], TA: ["🏨 2M+ சொத்துக்கள்", "🛡️ பாதுகாப்பான முன்பதிவு"] }
  },
  flights: {
    id: "flights",
    title: { EN: "Fly to your dreams", SI: "ඔබේ සිහින ගමනාන්තයට පියාසර කරන්න", TA: "உங்கள் கனவு இடத்திற்கு பறக்கவும்" },
    subtitle: { EN: "Cheap Flights", SI: "අඩුම මිලට ගුවන් ටිකට්පත්", TA: "மலிவான விமானங்கள்" },
    gradientText: { EN: "at the best prices.", SI: "හොඳම මිල ගණන් යටතේ.", TA: "சிறந்த விலையில்." },
    image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Flight Search Widget Goes Here", SI: "ගුවන් ටිකට්පත් සෙවීමේ පද්ධතිය", TA: "விமான தேடல் அமைப்பு" },
    badges: { EN: ["✈️ 500+ Airlines", "🛡️ Secure Booking"], SI: ["✈️ ගුවන් සමාගම් 500+", "🛡️ ආරක්ෂිත වෙන්කිරීම්"], TA: ["✈️ 500+ விமான நிறுவனங்கள்", "🛡️ பாதுகாப்பான முன்பதிவு"] }
  },
  cars: {
    id: "cars",
    title: { EN: "Hit the road with", SI: "නිදහසේ ගමනක් යන්න", TA: "சாலையில் செல்லுங்கள்" },
    subtitle: { EN: "Car Rentals", SI: "කාර් කුලියට දීම", TA: "கார் வாடகை" },
    gradientText: { EN: "unlimited miles.", SI: "සීමාවකින් තොරව.", TA: "வரம்பற்ற மைல்கள்." },
    image: "https://images.unsplash.com/photo-1502877338535-346ce14ed5e9?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Rentalcars.com / Travelpayouts Car Widget Goes Here", SI: "වාහන සෙවීමේ පද්ධතිය", TA: "கார் தேடல் அமைப்பு" },
    badges: { EN: ["🚗 Free Cancellation", "⛽ Full to Full"], SI: ["🚗 නොමිලේ අවලංගු කිරීම", "⛽ Full to Full"], TA: ["🚗 இலவச ரத்துசெய்தல்", "⛽ Full to Full"] }
  }
  ,packages: {
    id: "packages",
    title: { EN: "Save more with", SI: "වැඩිපුර ඉතුරු කරන්න", TA: "மேலும் சேமிக்கவும்" },
    subtitle: { EN: "Flight + Hotel Packages", SI: "ගුවන් ගමන් සහ හෝටල් පැකේජ", TA: "விமானம் + ஹோட்டல் தொகுப்புகள்" },
    gradientText: { EN: "combo deals.", SI: "එකට ගෙන ඉතුරු කරන්න.", TA: "ஒருங்கிணைந்த சலுகைகள்." },
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Packages Widget Goes Here", SI: "පැකේජ සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "தொகுப்பு விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["💼 Bundle & Save", "🔒 Secure Booking"], SI: ["💼 පැකේජ වලින් ලාභයි", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["💼 தொகுப்பு & சேமி", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  transfers: {
    id: "transfers",
    title: { EN: "Hassle-free", SI: "කරදරයක් නැතිව ගමන", TA: "எளிதான பயணம்" },
    subtitle: { EN: "Airport Transfers", SI: "ගුවන් තොටුපල ප්‍රවාහනය", TA: "விமான நிலைய பரிமாற்றங்கள்" },
    gradientText: { EN: "straight to your door.", SI: "ඔබේ දොරකඩටම.", TA: "உங்கள் வாசலுக்கு." },
    image: "https://images.unsplash.com/photo-1538505503028-2b81d7f19159?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Transfer Widget Goes Here", SI: "ප්‍රවාහන සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "பரிமாற்ற விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🚕 Professional Drivers", "🔒 Secure Booking"], SI: ["🚕 සුපිරි රියදුරන්", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🚕 தொழில்முறை ஓட்டுநர்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  attractions: {
    id: "attractions",
    title: { EN: "Discover top", SI: "අලුත් තැන් හොයාගන්න", TA: "சிறந்த இடங்களை கண்டறியுங்கள்" },
    subtitle: { EN: "Attractions & Tours", SI: "නැරඹුම් ස්ථාන සහ චාරිකා", TA: "ஈர்ப்புகள் மற்றும் சுற்றுப்பயணங்கள்" },
    gradientText: { EN: "experiences globally.", SI: "ලෝකේ වටේ යන්න.", TA: "உலகளாவிய அனுபவங்கள்." },
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Attractions Widget Goes Here", SI: "චාරිකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "சுற்றுப்பயண விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🎟️ Skip the Line", "🔒 Secure Booking"], SI: ["🎟️ පෝලිම් නැතිව යන්න", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🎟️ வரிசையை தவிர்க்கவும்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  cruises: {
    id: "cruises",
    title: { EN: "Sail away on", SI: "මුහුදේ යන්න", TA: "பயணம் செய்யுங்கள்" },
    subtitle: { EN: "Luxury Cruises", SI: "සුඛෝපභෝගී නෞකා", TA: "சொகுசு கப்பல்கள்" },
    gradientText: { EN: "an ocean adventure.", SI: "මුහුදු චාරිකාවක්.", TA: "ஒரு கடல் சாகசம்." },
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2000&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Cruises Widget Goes Here", SI: "නෞකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "கப்பல் விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🛳️ Top Cruise Lines", "🔒 Secure Booking"], SI: ["🛳️ සුපිරි නෞකා", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🛳️ சிறந்த கப்பல்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  }


};

const i18n: any = {
  EN: {
    getApp: "Get the App",
    listProperty: "List your property",
    support: "Support",
    signIn: "Sign In",
    searchPlaceholder: "Search your destination...",
    hotels: "Hotels",
    flights: "Flights",
    cars: "Car & Bike",
    packages: "Flight + Hotel",
    transfers: "Transfers",
    attractions: "Attractions",
    cruises: "Cruises"
  },
  SI: {
    getApp: "App එක බාගන්න",
    listProperty: "හෝටලයක් ඇතුලත් කරන්න",
    support: "උදව්",
    signIn: "ගිණුමට පිවිසෙන්න",
    searchPlaceholder: "ගමනාන්තය සොයන්න...",
    hotels: "හෝටල්",
    flights: "ගුවන් ගමන්",
    cars: "කාර් සහ බයික්",
    packages: "ගුවන් + හෝටල්",
    transfers: "ප්‍රවාහන",
    attractions: "නැරඹුම් ස්ථාන",
    cruises: "නෞකා"
  },
  TA: {
    getApp: "App பதிவிறக்கு",
    listProperty: "சொத்தை பட்டியலிடுங்கள்",
    support: "ஆதரவு",
    signIn: "உள்நுழைக",
    searchPlaceholder: "இடத்தை தேடுங்கள்...",
    hotels: "ஹோட்டல்கள்",
    flights: "விமானங்கள்",
    cars: "கார் & பைக்",
    packages: "விமானம் + ஹோட்டல்",
    transfers: "பரிமாற்றங்கள்",
    attractions: "ஈர்ப்புகள்",
    cruises: "கப்பல்கள்"
  }
};

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("hotels");
  
  // Global Header States
  const [currency, setCurrency] = useState("LKR");
  const [language, setLanguage] = useState("EN");
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const currencies = ["LKR", "USD", "EUR", "GBP", "AUD", "SGD", "AED"];
  const languages = ["EN", "SI", "TA", "FR", "ES", "DE"];

  // Fallback to EN if translation doesn't exist
  const t = i18n[language] || i18n["EN"];
  const currentData = tabData[activeTab];

  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowTopNav(false);
        } else {
          setShowTopNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      
      {/* Global Top Navbar */}
      <header className={`absolute w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-24 bg-gradient-to-b from-white/95 via-white/80 to-transparent z-[60] top-0 gap-3 md:gap-0 transition-transform duration-300 ${showTopNav ? "translate-y-0" : "-translate-y-full"}`}>
        
        {/* Top Row (Logo + Mobile Actions) / Desktop Left */}
        <div className="flex items-center justify-between md:justify-start gap-6 md:gap-12 w-full md:w-auto">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="HotelChap Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />
          </Link>

          {/* Destination Search Bar (Desktop) */}
          <div className="hidden md:flex relative items-center md:w-[350px]">
            <span className="absolute left-4 text-xl">🔍</span>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="w-full bg-white/70 backdrop-blur-md border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-gray-800 placeholder-gray-500 text-sm font-medium focus:outline-none focus:bg-white transition shadow-sm"
            />
          </div>

          {/* Mobile Actions (Currency, Language, Profile) */}
          <div className="flex md:hidden items-center gap-3">
            
            {/* Currency Mobile */}
            <div className="relative">
              <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-800 text-sm flex items-center gap-1 drop-shadow-sm">
                <CircleDollarSign size={16} className="text-gray-700" /> {currency} <span className="text-[10px]">▼</span>
              </button>
              {showCurrency && (
                <div className="absolute top-8 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {currencies.map(c => (
                    <button key={c} onClick={() => { setCurrency(c); setShowCurrency(false); }} className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${currency === c ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}>{c}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Mobile */}
            <div className="relative">
              <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-800 text-sm flex items-center gap-1 drop-shadow-sm">
                <Globe size={16} className="text-gray-700" /> {language} <span className="text-[10px]">▼</span>
              </button>
              {showLanguage && (
                <div className="absolute top-8 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {languages.map(l => {
                    const langNames: any = { EN: "English", SI: "සිංහල", TA: "தமிழ்", FR: "Français", ES: "Español", DE: "Deutsch" };
                    return (
                      <button key={l} onClick={() => { setLanguage(l); setShowLanguage(false); }} className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${language === l ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}>{langNames[l] || l}</button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Profile Mobile */}
            {user ? (
              <Link href="/account" className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/50 bg-gray-100 overflow-hidden ml-1 shadow-md">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#673AB7] font-bold text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                )}
              </Link>
            ) : (
              <Link href="/login" className="font-bold text-white bg-[#673AB7] px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-[#522b94] transition">
                {t.signIn}
              </Link>
            )}

          </div>
        </div>

        {/* Destination Search Bar (Mobile) */}
        <div className="flex md:hidden relative items-center w-full mt-2">
          <span className="absolute left-4 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/70 backdrop-blur-md border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-gray-800 placeholder-gray-500 text-sm font-medium focus:outline-none focus:bg-white transition shadow-sm"
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex ml-auto items-center gap-5 relative">
          <button className="font-bold text-gray-800 drop-shadow-sm hover:text-[#673AB7] transition">{t.getApp}</button>
          <button className="font-bold text-gray-800 drop-shadow-sm hover:text-[#673AB7] transition">{t.listProperty}</button>
          <button className="font-bold text-gray-800 drop-shadow-sm hover:text-[#673AB7] transition">{t.support}</button>
          
          <div className="h-6 w-px bg-gray-300 mx-1"></div> {/* Divider */}
          
          {/* Currency Dropdown Desktop */}
          <div className="relative">
            <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-800 hover:text-[#673AB7] transition flex items-center gap-1 drop-shadow-sm">
              <CircleDollarSign size={18} className="text-gray-700 mr-1" /> {currency} <span className="text-xs">▼</span>
            </button>
            {showCurrency && (
              <div className="absolute top-10 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {currencies.map(c => (
                  <button key={c} onClick={() => { setCurrency(c); setShowCurrency(false); }} className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${currency === c ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}>{c}</button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown Desktop */}
          <div className="relative">
            <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-800 hover:text-[#673AB7] transition flex items-center gap-1 drop-shadow-sm">
              <Globe size={18} className="text-gray-700 mr-1" /> {language} <span className="text-xs">▼</span>
            </button>
            {showLanguage && (
              <div className="absolute top-10 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {languages.map(l => {
                  const langNames: any = { EN: "English", SI: "සිංහල", TA: "தமிழ்", FR: "Français", ES: "Español", DE: "Deutsch" };
                  return (
                    <button key={l} onClick={() => { setLanguage(l); setShowLanguage(false); }} className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${language === l ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}>{langNames[l] || l}</button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Profile Desktop */}
          {user ? (
            <Link href="/account" className="ml-2 relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#673AB7] shadow-sm hover:shadow-md transition bg-gray-100 overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#673AB7] font-bold text-lg">{user.email?.charAt(0).toUpperCase()}</span>
              )}
            </Link>
          ) : (
            <Link href="/login" className="ml-2 font-semibold text-white bg-[#673AB7] px-6 py-2 rounded-full shadow-md hover:bg-[#522b94] transition">
              {t.signIn}
            </Link>
          )}
        </div>
      </header>

      {/* Dynamic Hero Section - Spans Full Width at Top */}
      <div className="absolute top-0 left-0 w-full z-0">
        <div className="relative w-full h-[450px] md:h-[550px] bg-gray-900 rounded-b-[30px] md:rounded-b-[80px] flex flex-col justify-start items-center px-4 md:px-16 overflow-hidden shadow-2xl transition-all duration-500 pt-[120px] md:pt-[150px]">
          
          {/* Dynamic Full Cover Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url('${currentData.image}')` }}
          ></div>
          
          {/* Light Overlay (instead of Dark) to make it vibrant but still readable */}
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500"></div>
          
          {/* Dynamic Text Layout */}
          <div className="relative z-10 max-w-3xl text-center transition-all duration-500">
            <span className="inline-block py-1.5 px-5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-4 border border-white/20 shadow-xl">
              {currentData.subtitle[language] || currentData.subtitle["EN"]}
            </span>
            
            <h1 className="flex flex-col gap-1 md:gap-2 mb-6" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.9)' }}>
              <span className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
                {currentData.title[language] || currentData.title["EN"]}
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {currentData.gradientText[language] || currentData.gradientText["EN"]}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1 relative max-w-[1400px] mx-auto w-full pt-10 md:pt-20">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full md:w-[calc(100%-80px)] min-h-screen pb-24 md:pb-0 z-10 pt-[420px] md:pt-[480px]">

          <div className="w-full px-4 md:px-10 mt-4 md:mt-0">
            {/* Overlapping Search Box Card */}
            <div className="relative z-20 w-[95%] md:w-[90%] max-w-6xl mx-auto -mt-24 md:-mt-32 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 md:p-8 border border-gray-100">
              
            {/* Interactive Tabs (Dynamically Mapped from Database) */}
            <div className="flex justify-start md:justify-center gap-4 md:gap-6 border-b border-gray-100 pb-4 mb-6 overflow-x-auto hide-scrollbar">
              
              {Object.keys(tabData).map((key) => {
                const tab = tabData[key as keyof typeof tabData];
                
                // Get icon dynamically based on category
                let icon = "🏨";
                if (key === "flights") icon = "✈️";
                if (key === "cars") icon = "🚗";
                if (key === "packages") icon = "💼";
                if (key === "transfers") icon = "🚕";
                if (key === "attractions") icon = "🎟️";
                if (key === "cruises") icon = "🛳️";
                
                return (
                  <button 
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex flex-col items-center gap-2 font-semibold pb-2 min-w-[80px] transition-all ${activeTab === key ? 'text-[#673AB7] border-b-2 border-[#673AB7]' : 'text-gray-400 hover:text-[#673AB7]'}`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm capitalize">{t[key] || key}</span>
                  </button>
                );
              })}

            </div>

              {/* Render Search Form or Travelpayouts Widget based on tab */}
              {activeTab === "hotels" ? (
                <form action="/search" method="GET" className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-3 md:p-4 flex flex-col md:flex-row items-center gap-3 mt-4 relative z-10 transition-all duration-500">
                  <div className="flex-1 w-full flex items-center bg-gray-50 rounded-lg px-4 py-3 md:py-2 border border-gray-100 focus-within:border-[#673AB7] focus-within:ring-1 focus-within:ring-[#673AB7] transition">
                    <span className="text-gray-400 mr-3 text-lg">🔍</span>
                    <input type="text" name="city" placeholder="Where are you going?" className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-medium placeholder-gray-400" required />
                  </div>
                  
                  <div className="flex-1 w-full flex items-center bg-gray-50 rounded-lg px-4 py-3 md:py-2 border border-gray-100 focus-within:border-[#673AB7] focus-within:ring-1 focus-within:ring-[#673AB7] transition">
                    <span className="text-gray-400 mr-3 text-lg">📅</span>
                    <input type="date" name="checkin" min="2026-08-28" defaultValue="2026-08-29" className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-medium text-sm" required />
                    <span className="text-gray-300 mx-2">-</span>
                    <input type="date" name="checkout" min="2026-08-29" defaultValue="2026-09-01" className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-medium text-sm" required />
                  </div>

                  <div className="flex-1 w-full flex items-center bg-gray-50 rounded-lg px-4 py-3 md:py-2 border border-gray-100 focus-within:border-[#673AB7] focus-within:ring-1 focus-within:ring-[#673AB7] transition">
                    <span className="text-gray-400 mr-3 text-lg">👥</span>
                    <select name="guests" className="w-full bg-transparent border-none focus:outline-none text-gray-800 font-medium">
                      <option value="1">1 Adult, 0 Children, 1 Room</option>
                      <option value="2">2 Adults, 0 Children, 1 Room</option>
                      <option value="3">2 Adults, 1 Child, 1 Room</option>
                      <option value="4">2 Adults, 2 Children, 2 Rooms</option>
                    </select>
                  </div>

                  <input type="hidden" name="type" value={activeTab} />

                  <button type="submit" className="w-full md:w-auto bg-[#673AB7] hover:bg-[#522b94] text-white px-8 py-3 md:py-4 rounded-lg font-black text-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                    <span>🔍</span> Search
                  </button>
                </form>
              ) : activeTab === "flights" ? (
                <div className="mt-4 relative z-10 w-full min-h-[150px]">
                  <TravelpayoutsFlightWidget />
                </div>
              ) : activeTab === "cars" ? (
                <div className="mt-4 relative z-10 w-full min-h-[150px]">
                  <TravelpayoutsRentalWidget />
                </div>
              ) : activeTab === "transfers" ? (
                <div className="mt-4 relative z-10 w-full min-h-[150px]">
                  <TravelpayoutsTransferWidget />
                </div>
              ) : activeTab === "packages" || activeTab === "attractions" || activeTab === "cruises" ? (
                <div className="mt-4 relative z-10 w-full min-h-[150px]">
                  <DummyWidget />
                </div>
              ) : (
                <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 flex items-center justify-center text-center shadow-inner mt-4 relative z-10">
                  <p className="text-gray-500 font-bold tracking-wide">{currentData.formPlaceholder[language] || currentData.formPlaceholder["EN"]}</p>
                </div>
              )}

            </div>
          </div>

          {/* Trust Building: Partner Logos */}
          <PartnerLogos />

          {/* Recently Viewed History */}
          <RecentlyViewed />

          {/* Dynamic Geo-Location Popular Destinations */}
          <PopularDestinations />

          {/* Flash Deals with Countdown */}
          <FlashDeals />

          {/* Travel Blog & Inspiration */}
          <TravelBlog />

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Customer Reviews */}
          <CustomerReviews />

          {/* Mobile App Download */}
          <AppDownload />

        </main>
      </div>

      {/* SEO Mega Footer */}
      <MegaFooter />

    </div>
  );
}

