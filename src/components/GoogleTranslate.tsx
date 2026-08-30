"use client";
import { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import { usePathname } from "next/navigation";

export default function GoogleTranslate() {
  const { language } = useSettings();
  const pathname = usePathname();

  useEffect(() => {
    let targetLang = language.toLowerCase();
    if (targetLang === "zh-cn") targetLang = "zh-CN";
    if (targetLang === "zh-tw") targetLang = "zh-TW";

    const doTranslate = () => {
      const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (!selectElement) return;

      if (targetLang === "en") return;

      // To force Google Translate to translate newly rendered English text 
      // (from React hydration or Next.js client-side navigation),
      // Trick Google Translate into re-evaluating by clearing the value first
      // (Note: "en" is not an option in the select box when pageLanguage is "en")
      selectElement.selectedIndex = 0;
      selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));

      setTimeout(() => {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      }, 50);
    };

    // Run when the component mounts or path changes, after giving React time to render
    const t1 = setTimeout(doTranslate, 150);
    const t2 = setTimeout(doTranslate, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [language, pathname]);

  return null;
}
