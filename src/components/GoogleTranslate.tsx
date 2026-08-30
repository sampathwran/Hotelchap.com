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
      // we must reset it to English, dispatch the event, and then set it back to the target language.
      selectElement.value = "en";
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
