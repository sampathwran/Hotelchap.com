import { useSettings } from "@/context/SettingsContext";

import EN from "./dictionaries/EN.json";
import SI from "./dictionaries/SI.json";
import TA from "./dictionaries/TA.json";

export const translations: Record<string, Record<string, string>> = {
  EN,
  SI,
  TA,
};

export function useTranslation() {
  const { language } = useSettings();
  
  const t = (key: string) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations["EN"][key]) {
      return translations["EN"][key];
    }
    return key;
  };

  return { t, language };
}
