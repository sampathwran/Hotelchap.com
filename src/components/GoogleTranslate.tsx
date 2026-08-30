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

      // Clean React hydration artifacts
      const htmlElement = document.getElementsByTagName("html")[0];
      const classNames = htmlElement.className.split(" ");
      htmlElement.className = classNames.filter(c => c !== "translated-ltr" && c !== "translated-rtl").join(" ");

      if (targetLang === "en") {
        // Do not force the combo box back to "en". The page reload already cleared the cookie,
        // so the page is in English. If we force it, we fight the native Chrome translation popup.
        return;
      }

      // Force change for other languages
      if (selectElement.value !== targetLang) {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      }
    };

    // Trigger repeatedly to fight React hydration
    const timeout = setTimeout(doTranslate, 300);
    const interval = setInterval(doTranslate, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [language, pathname]);

  return null;
}
