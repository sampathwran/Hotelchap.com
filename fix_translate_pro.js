const fs = require("fs");

let settings = fs.readFileSync("src/context/SettingsContext.tsx", "utf8");
settings = settings.replace(/const setLanguage = \(newLanguage: string\) => \{[\s\S]*?\};\s*return \(/, 
`const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    localStorage.setItem("app_language", newLanguage);
  };

  return (`);
fs.writeFileSync("src/context/SettingsContext.tsx", settings, "utf8");

let gt = `"use client";
import { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function GoogleTranslate() {
  const { language } = useSettings();

  useEffect(() => {
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
    const triggerTranslation = () => {
      const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (selectElement) {
        let targetLang = language.toLowerCase();
        
        // Handle simplified/traditional chinese codes for GT
        if (targetLang === "zh-cn") targetLang = "zh-CN";
        if (targetLang === "zh-tw") targetLang = "zh-TW";

        if (selectElement.value !== targetLang) {
          selectElement.value = targetLang;
          selectElement.dispatchEvent(new Event("change"));
        }
      }
    };

    const intervalId = setInterval(() => {
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        triggerTranslation();
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [language]);

  return <div id="google_translate_element" style={{ display: "none" }}></div>;
}
`;
fs.writeFileSync("src/components/GoogleTranslate.tsx", gt, "utf8");

