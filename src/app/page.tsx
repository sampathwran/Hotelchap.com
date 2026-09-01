"use client";

import Sidebar from "@/components/Sidebar";
import PopularDestinations from "@/components/PopularDestinations";
import PartnerLogos from "@/components/PartnerLogos";
import RecentlyViewed from "@/components/RecentlyViewed";
import TravelBlog from "@/components/TravelBlog";
import FlashDeals from "@/components/FlashDeals";
import WhyChooseUs from "@/components/WhyChooseUs";
import AppDownload from "@/components/AppDownload";
import CombinedReviewsApp from "@/components/CombinedReviewsApp";
import MegaFooter from "@/components/MegaFooter";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Globe, CircleDollarSign, Menu, Smartphone, Building, MapPin, CreditCard, Plane, Calendar, Tag, Car, Map, Shield, Clock, UserCheck, ThumbsUp, Ticket, Camera, Star, Ship, Coffee } from "lucide-react";
import CurrencyModal from "@/components/CurrencyModal";
import LanguageModal from "@/components/LanguageModal";
import LoginModal from "@/components/LoginModal";

import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { useSettings } from "@/context/SettingsContext";
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
    image: "/api/image/hotels",
    formPlaceholder: { EN: "Travelpayouts Hotel Search Widget Goes Here", SI: "හෝටල් සෙවීමේ පද්ධතිය", TA: "ஹோட்டல் தேடல் அமைப்பு" },
    badges: { EN: ["🏨 2M+ Properties", "🛡️ Secure Booking"], SI: ["🏨 ලක්ෂ 20+ හෝටල්", "🛡️ ආරක්ෂිත වෙන්කිරීම්"], TA: ["🏨 2M+ சொத்துக்கள்", "🛡️ பாதுகாப்பான முன்பதிவு"] }
  },
  flights: {
    id: "flights",
    title: { EN: "Fly to your dreams", SI: "ඔබේ සිහින ගමනාන්තයට පියාසර කරන්න", TA: "உங்கள் கனவு இடத்திற்கு பறக்கவும்" },
    subtitle: { EN: "Cheap Flights", SI: "අඩුම මිලට ගුවන් ටිකට්පත්", TA: "மலிவான விமானங்கள்" },
    gradientText: { EN: "at the best prices.", SI: "හොඳම මිල ගණන් යටතේ.", TA: "சிறந்த விலையில்." },
    image: "/api/image/flights",
    formPlaceholder: { EN: "Travelpayouts Flight Search Widget Goes Here", SI: "ගුවන් ටිකට්පත් සෙවීමේ පද්ධතිය", TA: "விமான தேடல் அமைப்பு" },
    badges: { EN: ["✈️ 500+ Airlines", "🛡️ Secure Booking"], SI: ["✈️ ගුවන් සමාගම් 500+", "🛡️ ආරක්ෂිත වෙන්කිරීම්"], TA: ["✈️ 500+ விமான நிறுவனங்கள்", "🛡️ பாதுகாப்பான முன்பதிவு"] }
  },
  cars: {
    id: "cars",
    title: { EN: "Hit the road with", SI: "නිදහසේ ගමනක් යන්න", TA: "சாலையில் செல்லுங்கள்" },
    subtitle: { EN: "Car Rentals", SI: "කාර් කුලියට දීම", TA: "கார் வாடகை" },
    gradientText: { EN: "unlimited miles.", SI: "සීමාවකින් තොරව.", TA: "வரம்பற்ற மைல்கள்." },
    image: "/api/image/cars",
    formPlaceholder: { EN: "Rentalcars.com / Travelpayouts Car Widget Goes Here", SI: "වාහන සෙවීමේ පද්ධතිය", TA: "கார் தேடல் அமைப்பு" },
    badges: { EN: ["🚗 Free Cancellation", "⛽ Full to Full"], SI: ["🚗 නොමිලේ අවලංගු කිරීම", "⛽ Full to Full"], TA: ["🚗 இலவச ரத்துசெய்தல்", "⛽ Full to Full"] }
  },
  transfers: {
    id: "transfers",
    title: { EN: "Hassle-free", SI: "කරදරයක් නැතිව ගමන", TA: "எளிதான பயணம்" },
    subtitle: { EN: "Airport Transfers", SI: "ගුවන් තොටුපල ප්‍රවාහනය", TA: "விமான நிலைய பரிமாற்றங்கள்" },
    gradientText: { EN: "straight to your door.", SI: "ඔබේ දොරකඩටම.", TA: "உங்கள் வாசலுக்கு." },
    image: "/api/image/transfers",
    formPlaceholder: { EN: "Travelpayouts Transfer Widget Goes Here", SI: "ප්‍රවාහන සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "பரிமாற்ற விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🚕 Professional Drivers", "🔒 Secure Booking"], SI: ["🚕 සුපිරි රියදුරන්", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🚕 தொழில்முறை ஓட்டுநர்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  attractions: {
    id: "attractions",
    title: { EN: "Discover top", SI: "අලුත් තැන් හොයාගන්න", TA: "சிறந்த இடங்களை கண்டறியுங்கள்" },
    subtitle: { EN: "Attractions & Tours", SI: "නැරඹුම් ස්ථාන සහ චාරිකා", TA: "ஈர்ப்புகள் மற்றும் சுற்றுப்பயணங்கள்" },
    gradientText: { EN: "experiences globally.", SI: "ලෝකේ වටේ යන්න.", TA: "உலகளாவிய அனுபவங்கள்." },
    image: "/api/image/attractions",
    formPlaceholder: { EN: "Travelpayouts Attractions Widget Goes Here", SI: "චාරිකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "சுற்றுப்பயண விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🎟️ Skip the Line", "🔒 Secure Booking"], SI: ["🎟️ පෝලිම් නැතිව යන්න", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🎟️ வரிசையை தவிர்க்கவும்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  cruises: {
    id: "cruises",
    title: { EN: "Sail away on", SI: "මුහුදේ යන්න", TA: "பயணம் செய்யுங்கள்" },
    subtitle: { EN: "Luxury Cruises", SI: "සුඛෝපභෝගී නෞකා", TA: "சொகுசு கப்பல்கள்" },
    gradientText: { EN: "an ocean adventure.", SI: "මුහුදු චාරිකාවක්.", TA: "ஒரு கடல் சாகசம்." },
    image: "/api/image/cruises",
    formPlaceholder: { EN: "Travelpayouts Cruises Widget Goes Here", SI: "නෞකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "கப்பல் விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🛳️ Top Cruise Lines", "🔒 Secure Booking"], SI: ["🛳️ සුපිරි නෞකා", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🛳️ சிறந்த கப்பல்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  }


};

export default function Home() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("hotels");
  
  // Dynamic dates for search bar
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  
  // Global Header States
  const { currency, setCurrency, language, setLanguage, toggleSidebar, isSidebarExpanded } = useSettings();
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const currencies = ["LKR", "USD", "EUR", "GBP", "AUD", "SGD", "AED"];
  const languages = ["EN", "SI", "TA", "FR", "ES", "DE"];

  // Fallback to EN if translation doesn't exist
  
  
  const tabFeatures: Record<string, {icon: any, text: string}[]> = {
    hotels: [
      { icon: <Building size={16} />, text: "Luxury & Budget Hotels" },
      { icon: <MapPin size={16} />, text: "Prime Locations" },
      { icon: <CreditCard size={16} />, text: "Pay at Property" }
    ],
    flights: [
      { icon: <Plane size={16} />, text: "500+ Airlines" },
      { icon: <Calendar size={16} />, text: "Flexible Dates" },
      { icon: <Tag size={16} />, text: "Best Fares" }
    ],
    cars: [
      { icon: <Car size={16} />, text: "Top Brands" },
      { icon: <Map size={16} />, text: "Unlimited Mileage" },
      { icon: <Shield size={16} />, text: "Free Cancellation" }
    ],
    transfers: [
      { icon: <Clock size={16} />, text: "24/7 Availability" },
      { icon: <UserCheck size={16} />, text: "Pro Drivers" },
      { icon: <ThumbsUp size={16} />, text: "Fixed Prices" }
    ],
    attractions: [
      { icon: <Ticket size={16} />, text: "Skip-the-line" },
      { icon: <Camera size={16} />, text: "Guided Tours" },
      { icon: <Star size={16} />, text: "Exclusive" }
    ],
    cruises: [
      { icon: <Ship size={16} />, text: "Ocean & River" },
      { icon: <Coffee size={16} />, text: "All-Inclusive" },
      { icon: <Globe size={16} />, text: "Worldwide" }
    ]
  };

  const tabShapes: Record<string, string> = {
    "hotels": "rounded-b-[30px] md:rounded-b-[80px]",
    "flights": "rounded-b-[30px] md:rounded-br-[180px] md:rounded-bl-[30px]",
    "cars": "rounded-b-[30px] md:rounded-bl-[180px] md:rounded-br-[30px]",
    "transfers": "rounded-b-[30px] md:rounded-b-[120px]",
    "attractions": "rounded-b-[30px] md:rounded-br-[60px] md:rounded-bl-[160px]",
    "cruises": "rounded-b-[30px] md:rounded-bl-[60px] md:rounded-br-[160px]",
  };

  const currentData = tabData[activeTab];

  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Guest Picker States
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

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
      
      {/* Fixed Hamburger Menu (Never scrolls away) */}
      

      {/* Global Top Navbar */}
      <header className="absolute w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-24 bg-gradient-to-b from-white/95 via-white/80 to-transparent z-[60] top-0 gap-3 md:gap-0">
        
        {/* Top Row (Logo + Mobile Actions) / Desktop Left */}
        <div className="flex flex-row items-center justify-between md:justify-start gap-2 md:gap-12 w-full md:w-auto pl-2 md:pl-16 pr-2">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="HotelChap Logo" className="h-14 md:h-28 w-auto object-contain drop-shadow-md origin-left" />
          </Link>

          

          {/* Mobile Actions (Currency, Language, Profile) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            
            {/* Currency Mobile */}
            <div className="relative">
              <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-800 text-sm flex items-center gap-1 drop-shadow-sm">
                <CircleDollarSign size={16} className="text-gray-700" /> {currency} <span className="text-[10px]">▼</span>
              </button>
              
            </div>

            {/* Language Mobile */}
            <div className="relative">
              <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-800 text-sm flex items-center gap-1 drop-shadow-sm">
                <Globe size={16} className="text-blue-600" /> {language} <span className="text-[10px]">▼</span>
              </button>
              
            </div>

            {/* Profile Mobile */}
            {user ? (
              <Link href="/account" className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/50 bg-gray-100 overflow-hidden ml-1 shadow-md">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#673AB7] font-bold text-sm">{(user.displayName || user.email || "U").charAt(0).toUpperCase()}</span>
                )}
              </Link>
            ) : (
              <button onClick={() => setShowLogin(true)} className="font-bold text-white bg-[#673AB7] px-3 py-1.5 rounded-full shadow-md text-[10px] ml-1 hover:bg-[#522b94] transition whitespace-nowrap">Create Account / Sign In</button>
            )}

          </div>
        </div>

        

        {/* Desktop Actions */}
        <div className="hidden md:flex ml-auto items-center gap-5 relative">
          <button className="flex items-center gap-2 bg-[#673AB7] text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-[#522b94] transition">
              <Smartphone size={20} className="animate-wiggle" /> {t("getApp")}
            </button>
          
          <div className="h-6 w-px bg-gray-300 mx-1"></div> {/* Divider */}
          
          {/* Currency Dropdown Desktop */}
          <div className="relative">
            <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-800 hover:text-[#673AB7] transition flex items-center gap-1 drop-shadow-sm">
              <CircleDollarSign size={18} className="text-gray-700 mr-1" /> {currency} <span className="text-xs">▼</span>
            </button>
            
          </div>

          {/* Language Dropdown Desktop */}
          <div className="relative">
            <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-800 hover:text-[#673AB7] transition flex items-center gap-1 drop-shadow-sm">
              <Globe size={18} className="text-blue-600 mr-1" /> {language} <span className="text-xs">▼</span>
            </button>
            
          </div>
          
          {/* Profile Desktop */}
          {user ? (
            <Link href="/account" className="ml-2 relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#673AB7] shadow-sm hover:shadow-md transition bg-gray-100 overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#673AB7] font-bold text-lg">{(user.displayName || user.email || "U").charAt(0).toUpperCase()}</span>
              )}
            </Link>
          ) : (
            <button onClick={() => setShowLogin(true)} className="ml-2 font-semibold text-white bg-[#673AB7] px-6 py-2 rounded-full shadow-md hover:bg-[#522b94] transition whitespace-nowrap">Create Account / Sign In</button>
          )}
        </div>
      </header>
      {/* Main Page Wrapper that PUSHES */}
      <div className={"relative flex flex-col flex-1 transition-all duration-300 ease-in-out " + (isSidebarExpanded ? "md:ml-[250px]" : "md:ml-[80px]")}>
      {/* Dynamic Hero Section - Spans Full Width at Top */}
      <div className="absolute top-[80px] md:top-[100px] left-0 w-full md:flex justify-center z-0 px-2 md:px-0 hidden">
        <div className={`relative w-[95%] md:w-[92%] max-w-[1300px] mx-auto h-[400px] md:h-[450px] bg-gray-900 flex flex-col justify-start items-center overflow-hidden shadow-2xl transition-all duration-700 ease-in-out pt-[60px] md:pt-[100px] rounded-[24px] md:rounded-[36px]`}>
          
          {/* Dynamic Full Cover Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url('${currentData.image}')` }}
          ></div>
          
          {/* Blue Overlay to match Agoda style */}
          <div className="absolute inset-0 bg-blue-900/40 transition-opacity duration-500 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 to-transparent"></div>
          
          {/* Dynamic Text Layout */}
          <div className="relative z-10 max-w-4xl text-center transition-all duration-500">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md leading-tight mb-4">
              {currentData.title[language] || currentData.title["EN"]}{" "}
              <span>
                {currentData.gradientText[language] || currentData.gradientText["EN"]}
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center items-center mt-2">
              {tabFeatures[activeTab]?.map((feature, idx) => (
                <div key={idx} className="flex items-center text-white text-xs md:text-sm font-medium">
                  {idx > 0 && <span className="text-white/40 mx-2 md:mx-4">|</span>}
                  <span className="text-[#34d399] mr-1.5 md:mr-2 drop-shadow-sm">{feature.icon}</span>
                  <span className="drop-shadow-md">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1 relative max-w-[1400px] mx-auto w-full pt-10 md:pt-20">

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full min-h-screen pb-24 md:pb-0 z-10 pt-[60px] md:pt-[430px] transition-all duration-300 ease-in-out">

          <div className="w-full px-4 md:px-10 mt-1 md:mt-0">
            {/* Overlapping Search Box Card */}
            <div className="relative z-20 w-[95%] md:w-[92%] max-w-6xl mx-auto mt-0 md:-mt-24 bg-white rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 md:p-6 transition-all duration-700">
              
            {/* Interactive Tabs (Dynamically Mapped from Database) */}
            <div className="flex justify-start md:justify-center gap-3 md:gap-6 border-b border-gray-100 pb-2 md:pb-4 mb-3 md:mb-6 overflow-x-auto hide-scrollbar">
              
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
                    className={`flex flex-col items-center justify-center gap-1.5 font-medium pb-3 min-w-[70px] md:min-w-[90px] transition-all ${activeTab === key ? 'text-blue-600 border-b-[3px] border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <span className="text-xl md:text-2xl">{icon}</span>
                    
                      <span className="md:hidden text-[11px] capitalize font-bold text-center">{t(key === "hotels" ? "Hotels" : key === "flights" ? "Flights" : key === "cars" ? "Car & Bike" : key === "transfers" ? "Transfers" : key === "attractions" ? "Attractions" : key === "cruises" ? "Cruises" : key)}</span>
                      <span className="hidden md:block text-sm capitalize">{t(key === "hotels" ? "Hotels & Villas" : key === "flights" ? "Flights" : key === "cars" ? "Car & Bike Rentals" : key === "transfers" ? "Airport Transfers" : key === "attractions" ? "Attractions" : key === "cruises" ? "Cruises" : key)}</span>

                  </button>
                );
              })}

            </div>

              {/* Render Search Form or Travelpayouts Widget based on tab */}
              {activeTab === "hotels" ? (
                <form action="/search" method="GET" className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-2 md:p-4 flex flex-col md:flex-row items-center gap-3 mt-4 relative z-10 transition-all duration-500">
<div className="flex-1 w-full flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-2 py-1 md:px-3 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                    <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Destination")}</label>
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-400 mr-2" />
                      <input type="text" name="city" placeholder={t("Find your next stay...")} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold placeholder-gray-400" required />
                    </div>
                  </div>

                  <div className="flex w-full md:w-auto gap-2">
                    <div className="flex-1 md:w-36 flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-2 py-1 md:px-3 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                      <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Check-in")}</label>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2 hidden md:block" />
                        <input type="date" name="checkin" min={todayStr} defaultValue={todayStr} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold text-sm cursor-pointer" required />
                      </div>
                    </div>
                    
                    <div className="flex-1 md:w-36 flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-2 py-1 md:px-3 md:py-1 border border-gray-200 focus-within:border-[#673AB7] focus-within:bg-white transition relative">
                      <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Check-out")}</label>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2 hidden md:block" />
                        <input type="date" name="checkout" min={todayStr} defaultValue={tomorrowStr} className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-bold text-sm cursor-pointer" required />
                      </div>
                    </div>
                  </div>

                  {/* Custom Guest Picker */}
                  <div className="w-full md:w-auto min-w-[200px] flex flex-col bg-gray-50 hover:bg-gray-100 rounded-lg px-2 py-1 md:px-3 md:py-1 border border-gray-200 transition relative">
                    <label className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mb-0.5">{t("Guests & Rooms")}</label>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => setShowGuestPicker(!showGuestPicker)}
                    >
                      <UserCheck size={18} className="text-gray-400 mr-2 hidden md:block" />
                      <div className="text-sm font-bold text-gray-900 select-none truncate">
                        {adults + children} {adults + children === 1 ? t('Guest') : t('Guests')}, {rooms} {rooms === 1 ? t('Room') : t('Rooms')}
                      </div>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {showGuestPicker && (
                      <>
                        {/* Overlay to close when clicking outside */}
                        <div className="fixed inset-0 z-40" onClick={() => setShowGuestPicker(false)}></div>
                        
                        <div className="absolute top-[110%] right-0 md:left-0 w-full md:w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                          
                          {/* Adults */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Adults")}</p>
                              <p className="text-xs text-gray-500 font-medium">{t("Age 18+")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={adults <= 1}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{adults}</span>
                              <button type="button" onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Children */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Children")}</p>
                              <p className="text-xs text-gray-500 font-medium">{t("Ages 0-17")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={children <= 0}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{children}</span>
                              <button type="button" onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Rooms */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{t("Rooms")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm disabled:opacity-50" disabled={rooms <= 1}>
                                <span className="text-xl leading-none">-</span>
                              </button>
                              <span className="font-bold text-lg w-6 text-center">{rooms}</span>
                              <button type="button" onClick={() => setRooms(rooms + 1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
                                <span className="text-xl leading-none">+</span>
                              </button>
                            </div>
                          </div>
                          
                          <button type="button" onClick={() => setShowGuestPicker(false)} className="w-full py-3 bg-[#673AB7]/10 text-[#673AB7] font-bold text-lg rounded-xl hover:bg-[#673AB7] hover:text-white transition-colors duration-300">
                            {t("Done")}
                          </button>
                        </div>
                      </>
                    )}
                    <input type="hidden" name="adults" value={adults} />
                    <input type="hidden" name="children" value={children} />
                    <input type="hidden" name="rooms" value={rooms} />
                  </div>

                  <button type="submit" className="w-full md:w-auto bg-[#673AB7] hover:bg-purple-700 text-white px-8 py-4 md:py-3 rounded-lg font-bold transition transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 text-lg md:text-base">
                    {t("Search")}
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
          <CombinedReviewsApp />

          {/* Mobile App Download */}
          

        </main>
      </div>
      </div>

      {/* SEO Mega Footer */}
      <div className={`relative z-[70] transition-all duration-300 ease-in-out ${isSidebarExpanded ? "md:ml-[250px]" : "md:ml-0"}`}>
        <MegaFooter />
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} currentLanguage={language} onSelect={(l: string) => { setLanguage(l); setShowLanguage(false); }} />
      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c: string) => { setCurrency(c); setShowCurrency(false); }} />
    </div>
  );
}

