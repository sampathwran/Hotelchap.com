"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type SettingsContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState("USD");
  const [language, setLanguageState] = useState("EN");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCurrency = localStorage.getItem("app_currency");
    const savedLanguage = localStorage.getItem("app_language");
    
    if (savedCurrency) setCurrencyState(savedCurrency);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("app_currency", newCurrency);
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    localStorage.setItem("app_language", newLanguage);

    const targetLang = newLanguage.toLowerCase();
    
    // Set Google Translate cookie
    if (targetLang === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      let gLangCode = targetLang;
      if (targetLang === "zh-cn") gLangCode = "zh-CN";
      if (targetLang === "zh-tw") gLangCode = "zh-TW";
      const gLang = `/en/${gLangCode}`;
      document.cookie = `googtrans=${gLang}; path=/`;
      document.cookie = `googtrans=${gLang}; path=/; domain=${window.location.hostname}`;
    }
    
    // Reload to apply Google Translate reliably
    window.location.reload();
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
