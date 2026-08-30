"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type SettingsContextType = {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState("USD");
  const [language, setLanguageState] = useState("EN");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);
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
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage, isSidebarExpanded, toggleSidebar }}>
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
