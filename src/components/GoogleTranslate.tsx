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

      // Clean React hydration artifacts
      const htmlElement = document.getElementsByTagName("html")[0];
      if (htmlElement) {
        const classNames = htmlElement.className.split(" ");
        htmlElement.className = classNames.filter(c => c !== "translated-ltr" && c !== "translated-rtl").join(" ");
      }

      // Force Google Translate to process newly rendered React nodes (hydration or navigation)
      // by setting the value (even if it's already set) and dispatching a change event.
      selectElement.value = targetLang;
      selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    };

    // Run after a short delay to allow React to render the new DOM
    const t1 = setTimeout(doTranslate, 100);
    // Fallback delay in case the Google Translate script was slow to load
    const t2 = setTimeout(doTranslate, 1000);
    const t3 = setTimeout(doTranslate, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [language, pathname]);

  return null;
}
