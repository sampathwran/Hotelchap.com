"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Globe, CircleDollarSign } from "lucide-react";

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
  const [showTopNav, setShowTopNav] = useState(true);

  const t = i18n[language] || i18n["EN"];

  return (
    <header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0 transition-transform duration-300 ${showTopNav ? "translate-y-0" : "-translate-y-full"}`}>
      
      {/* Top Row (Logo + Mobile Actions) / Desktop Left */}
      <div className="flex items-center justify-between md:justify-start gap-6 md:gap-12 w-full md:w-auto">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="HotelChap Logo" className="h-20 md:h-28 w-auto object-contain scale-110 origin-left" />
        </Link>

        {/* Destination Search Bar (Desktop) */}
        <div className="hidden md:flex relative items-center md:w-[350px]">
          <span className="absolute left-4 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-gray-100/80 rounded-full py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-500/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#673AB7]/40 transition"
          />
        </div>

        {/* Mobile Actions (Currency, Language, Profile) */}
        <div className="flex md:hidden items-center gap-3">
          
          {/* Currency Mobile */}
          <div className="relative">
            <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-700 text-sm flex items-center gap-1">
              <CircleDollarSign size={16} className="text-gray-500" /> {currency} <span className="text-[10px]">▼</span>
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
            <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-700 text-sm flex items-center gap-1">
              <Globe size={16} className="text-gray-500" /> {language} <span className="text-[10px]">▼</span>
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
            <Link href="/account" className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#673AB7] bg-gray-100 overflow-hidden ml-1">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#673AB7] font-bold text-sm">{user.email?.charAt(0).toUpperCase()}</span>
              )}
            </Link>
          ) : (
            <Link href="/login" className="font-semibold text-white bg-[#673AB7] px-3 py-1 rounded-full shadow-md text-xs ml-1">
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
          className="w-full bg-gray-100/80 rounded-full py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-500/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#673AB7]/40 transition"
        />
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex ml-auto items-center gap-5 relative">
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.getApp}</button>
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.listProperty}</button>
        <button className="font-semibold text-gray-600 hover:text-[#673AB7] transition">{t.support}</button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div> {/* Divider */}
        
        {/* Currency Dropdown Desktop */}
        <div className="relative">
          <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1">
            <CircleDollarSign size={18} className="text-gray-500 mr-1" /> {currency} <span className="text-xs">▼</span>
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
          <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1">
            <Globe size={18} className="text-gray-500 mr-1" /> {language} <span className="text-xs">▼</span>
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
  );
}
