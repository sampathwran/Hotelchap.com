"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import { useTranslation } from "@/lib/i18n";
import LoginModal from "./LoginModal";
import { useSettings } from "@/context/SettingsContext";
import { Globe, CircleDollarSign, Menu, Smartphone } from "lucide-react";
import CurrencyModal from "./CurrencyModal";
import LanguageModal, { allLanguages } from "./LanguageModal";



export default function Header() {
  const { user } = useAuth();
  const { currency, setCurrency, language, setLanguage, toggleSidebar } = useSettings();
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTopNav, setShowTopNav] = useState(true);

  const { t } = useTranslation();

  return (
    <>
      {/* Fixed Hamburger Menu */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 md:top-6 md:left-8 z-[80] p-2 text-gray-800 bg-white/80 backdrop-blur-md shadow-sm hover:text-blue-600 hover:bg-white rounded-full transition-colors drop-shadow-md"
      >
        <Menu size={28} />
      </button>

      <header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0 transition-transform duration-300 ${showTopNav ? "translate-y-0" : "-translate-y-full"}`}>
        
        {/* Top Row (Logo + Mobile Actions) / Desktop Left */}
        <div className="flex items-center justify-between md:justify-start gap-6 md:gap-12 w-full md:w-auto pl-12 md:pl-16">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="HotelChap Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-md scale-110 origin-left" />
          </Link>

        

        {/* Mobile Actions (Currency, Language, Profile) */}
        <div className="flex md:hidden items-center gap-3">
          
          {/* Currency Mobile */}
          <div className="relative">
            <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-700 text-sm flex items-center gap-1">
              <CircleDollarSign size={16} className="text-gray-500" /> {currency} <span className="text-[10px]">▼</span>
            </button>
            
          </div>

          {/* Language Mobile */}
          <div className="relative">
            <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-700 text-sm flex items-center gap-1">
              <span className="text-base mr-0.5">{allLanguages.find(l => l.code === language)?.flag || "🇺🇸"}</span> {language} <span className="text-[10px]">▼</span>
            </button>
            
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
            <button onClick={() => setShowLogin(true)} className="font-semibold text-white bg-[#673AB7] px-3 py-1 rounded-full shadow-md text-xs ml-1"></button>
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
          <button onClick={() => { setShowCurrency(!showCurrency); setShowLanguage(false); }} className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1">
            <CircleDollarSign size={18} className="text-gray-500 mr-1" /> {currency} <span className="text-xs">▼</span>
          </button>
          
        </div>

        {/* Language Dropdown Desktop */}
        <div className="relative">
          <button onClick={() => { setShowLanguage(!showLanguage); setShowCurrency(false); }} className="font-bold text-gray-700 hover:text-[#673AB7] transition flex items-center gap-1">
            <span className="text-lg mr-1">{allLanguages.find(l => l.code === language)?.flag || "🇺🇸"}</span> {language} <span className="text-xs">▼</span>
          </button>
          
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
          <button onClick={() => setShowLogin(true)} className="ml-2 font-semibold text-white bg-[#673AB7] px-6 py-2 rounded-full shadow-md hover:bg-[#522b94] transition"></button>
        )}
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} currentLanguage={language} onSelect={(l) => { setLanguage(l); setShowLanguage(false); }} />
      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />
    </header>
    </>
  );
}
