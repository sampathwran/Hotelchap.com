"use client";
import { useEffect, useRef } from "react";
import { useSettings } from "@/context/SettingsContext";
import { usePathname } from "next/navigation";

export default function GoogleTranslate() {
  const { language } = useSettings();
  const pathname = usePathname();

  useEffect(() => {
    let targetLang = language.toLowerCase();
    if (targetLang === "zh-cn") targetLang = "zh-CN";
    if (targetLang === "zh-tw") targetLang = "zh-TW";

    const forceTranslate = () => {
      const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (!selectElement) return;

      if (targetLang === "en") {
        // Restore to English
        if (selectElement.value !== "en") {
          selectElement.value = "en";
          selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        }
        return;
      }

      // Force Google Translate to re-evaluate the DOM by toggling to English then to the target language
      // This defeats React hydration which secretly overwrites translated nodes back to English
      selectElement.value = "en";
      selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));

      setTimeout(() => {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      }, 100);
    };

    // Run on initial load and whenever language/route changes
    const timeout = setTimeout(forceTranslate, 500);
    
    // Also run an aggressive check every 2 seconds to catch any React re-renders that wiped the translation
    const interval = setInterval(forceTranslate, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [language, pathname]);

  return null;
}
