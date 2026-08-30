"use client";
import { useEffect, useRef } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function GoogleTranslate() {
  const { language } = useSettings();
  const prevLanguage = useRef(language);

  useEffect(() => {
    let targetLang = language.toLowerCase();
    if (targetLang === "zh-cn") targetLang = "zh-CN";
    if (targetLang === "zh-tw") targetLang = "zh-TW";

    // If switching back to English, clear cookies and reload to restore original DOM
    if (targetLang === "en") {
      if (document.cookie.includes("googtrans")) {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.hotelchap.com;`;
        window.location.reload();
      }
      return;
    }

    // Aggressively enforce translation even if React hydration tries to undo it
    const enforceTranslation = setInterval(() => {
      const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      const htmlElement = document.querySelector("html");
      
      if (selectElement) {
        // If the HTML isn't marked as translated OR the dropdown value doesn't match
        if (
          !htmlElement?.classList.contains("translated-ltr") || 
          selectElement.value !== targetLang
        ) {
          selectElement.value = targetLang;
          selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        }
      }
    }, 1000);

    return () => clearInterval(enforceTranslation);
  }, [language]);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: "absolute", 
        width: "1px", 
        height: "1px", 
        overflow: "hidden", 
        clip: "rect(1px 1px 1px 1px)", 
        clipPath: "inset(50%)",
        whiteSpace: "nowrap", 
        top: 0,
        left: 0
      }} 
    ></div>
  );
}
