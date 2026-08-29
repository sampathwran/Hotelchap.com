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
    
    // Set Google Translate cookie
    const code = newLanguage.toLowerCase();
    if (code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
    } else {
      document.cookie = "googtrans=/auto/" + code + "; path=/;";
      document.cookie = "googtrans=/auto/" + code + "; domain=" + window.location.hostname + "; path=/;";
    }
    
    // Force reload to apply Google Translate to the whole DOM immediately
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
