"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const i18n: any = {
  EN: {
    getApp: "Get the App",
    listProperty: "List your property",
    support: "Support",
    signIn: "Sign In",
    searchPlaceholder: "Search for a destination..."
  },
  SI: {
    getApp: "App එක ගන්න",
    listProperty: "හෝටලය ඇතුලත් කරන්න",
    support: "උදව්",
    signIn: "ඇතුල් වෙන්න",
    searchPlaceholder: "ගමනාන්තයක් සොයන්න..."
  },
  TA: {
    getApp: "பயன்பாட்டைப் பெறுக",
    listProperty: "உங்கள் சொத்தை பட்டியலிடுங்கள்",
    support: "ஆதரவு",
    signIn: "உள்நுழைக",
    searchPlaceholder: "இடத்தை தேடுங்கள்..."
  }
};

const currencies = ["USD", "LKR", "EUR", "GBP", "AUD"];
const languages = ["EN", "SI", "TA", "FR", "ES", "DE"];

export default function Header() {
  const { user } = useAuth();
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("EN");
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const t = i18n[language] || i18n["EN"];

  return (
    <header className="h-20 w-full flex items-center justify-between px-4 md:px-8 bg-white shadow-sm z-[60] sticky top-0">
      
      {/* Left: Logo & Search */}
      <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
        <Link href="/" className="flex items-center">
          <img src="/logo.jpg" alt="HotelChap Logo" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Destination Search Bar */}
        <div className="flex relative items-center flex-1 sm:w-[250px] md:w-[350px]">
          <span className="absolute left-4 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-gray-100/80 rounded-full py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-500/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#673AB7]/40 transition"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="hidden md:flex ml-auto items-center gap-5 relative">
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.getApp}</button>
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.listProperty}</button>
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.support}</button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div> {/* Divider */}
        
        {/* Currency Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} 
            className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1"
          >
            {currency} <span className="text-xs">▼</span>
          </button>
          {showCurrency && (
            <div className="absolute top-10 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {currencies.map(c => (
                <button 
                  key={c} 
                  onClick={() => { setCurrency(c); setShowCurrency(false); }}
                  className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${currency === c ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} 
            className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1"
          >
            {language} <span className="text-xs">▼</span>
          </button>
          {showLanguage && (
            <div className="absolute top-10 right-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {languages.map(l => {
                const langNames: any = { EN: "English", SI: "සිංහල", TA: "தமிழ்", FR: "Français", ES: "Español", DE: "Deutsch" };
                return (
                  <button 
                    key={l} 
                    onClick={() => { setLanguage(l); setShowLanguage(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition ${language === l ? 'text-[#673AB7] bg-purple-50' : 'text-gray-700'}`}
                  >
                    {langNames[l] || l}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Notification Bell */}
        <button className="text-xl text-gray-600 hover:text-[#673AB7] transition ml-2 relative">
          🔔
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        
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

      {/* Mobile Search/Sign In Icons */}
      <div className="md:hidden flex items-center gap-4">
         
         <button className="text-xl relative">
           🔔
           <span className="absolute -top-0 -right-0 h-2 w-2 rounded-full bg-red-500"></span>
         </button>
         {user ? (
          <Link href="/account" className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#673AB7] bg-gray-100 overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#673AB7] font-bold text-sm">{user.email?.charAt(0).toUpperCase()}</span>
            )}
          </Link>
         ) : (
          <Link href="/login" className="font-semibold text-white bg-[#673AB7] px-4 py-1.5 rounded-full shadow-md text-sm">
            {t.signIn}
          </Link>
         )}
      </div>
    </header>
  );
}
