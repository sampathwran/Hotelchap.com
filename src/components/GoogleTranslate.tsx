"use client";
import { useEffect, useRef } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function GoogleTranslate() {
  const { language } = useSettings();
  const prevLanguage = useRef(language);

  useEffect(() => {
    // Only add the script if it doesn't exist
    if (!document.getElementById("google-translate-script")) {
      (window as any).googleTranslateElementInit = () => {
        try {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        } catch (e) {
          console.error("Google Translate Error:", e);
        }
      };

      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }
  }, []);

  useEffect(() => {
    if (prevLanguage.current === language) return;
    prevLanguage.current = language;

    const triggerTranslation = () => {
      let targetLang = language.toLowerCase();
      
      // Handle special GT codes
      if (targetLang === "zh-cn") targetLang = "zh-CN";
      if (targetLang === "zh-tw") targetLang = "zh-TW";

      // If switching back to English, clear cookies
      if (targetLang === "en") {
        if (!document.cookie.includes("googtrans")) return; // Already english, no cookies to clear
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.hotelchap.com;`;
        window.location.reload();
        return;
      }

      const desiredCookie = `googtrans=/en/${targetLang}`;
      if (document.cookie.includes(desiredCookie)) {
        // Cookie already set perfectly, no need to reload
        return;
      }

      // Set cookie to force GT
      document.cookie = `${desiredCookie}; path=/;`;
      document.cookie = `${desiredCookie}; path=/; domain=${window.location.hostname};`;
      document.cookie = `${desiredCookie}; path=/; domain=.hotelchap.com;`;

      // Reload to apply the new cookie
      window.location.reload();
    };

    triggerTranslation();
  }, [language]);

  return <div id="google_translate_element" style={{ display: "none" }}></div>;
}
