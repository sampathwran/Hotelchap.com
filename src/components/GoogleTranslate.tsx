"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Only load if not already loaded
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

  return <div id="google_translate_element" style={{ display: "none" }}></div>;
}

