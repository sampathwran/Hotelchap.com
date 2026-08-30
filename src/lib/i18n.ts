import { useSettings } from "@/context/SettingsContext";

import EN from "./dictionaries/EN.json";
import SI from "./dictionaries/SI.json";
import TA from "./dictionaries/TA.json";
import HI from "./dictionaries/HI.json";
import AR from "./dictionaries/AR.json";
import FR from "./dictionaries/FR.json";
import EN_CA from "./dictionaries/EN-CA.json";
import MS from "./dictionaries/MS.json";
import DE from "./dictionaries/DE.json";
import ES from "./dictionaries/ES.json";
import IT from "./dictionaries/IT.json";
import JA from "./dictionaries/JA.json";
import KO from "./dictionaries/KO.json";
import PT from "./dictionaries/PT.json";
import RU from "./dictionaries/RU.json";
import ZH_CN from "./dictionaries/ZH-CN.json";
import TH from "./dictionaries/TH.json";
import NL from "./dictionaries/NL.json";
import SV from "./dictionaries/SV.json";
import NO from "./dictionaries/NO.json";
import FI from "./dictionaries/FI.json";
import DA from "./dictionaries/DA.json";
import TR from "./dictionaries/TR.json";
import VI from "./dictionaries/VI.json";
import ID from "./dictionaries/ID.json";
import PL from "./dictionaries/PL.json";
import EL from "./dictionaries/EL.json";
import HE from "./dictionaries/HE.json";
import UK from "./dictionaries/UK.json";
import BN from "./dictionaries/BN.json";

export const translations: Record<string, Record<string, string>> = {
  "EN": EN,
  "SI": SI,
  "TA": TA,
  "HI": HI,
  "AR": AR,
  "FR": FR,
  "EN-CA": EN_CA,
  "MS": MS,
  "DE": DE,
  "ES": ES,
  "IT": IT,
  "JA": JA,
  "KO": KO,
  "PT": PT,
  "RU": RU,
  "ZH-CN": ZH_CN,
  "TH": TH,
  "NL": NL,
  "SV": SV,
  "NO": NO,
  "FI": FI,
  "DA": DA,
  "TR": TR,
  "VI": VI,
  "ID": ID,
  "PL": PL,
  "EL": EL,
  "HE": HE,
  "UK": UK,
  "BN": BN,
};

export function useTranslation() {
  const { language } = useSettings();
  const t = (key: string) => {
    if (translations[language] && translations[language][key]) return translations[language][key];
    if (translations["EN"] && translations["EN"][key]) return translations["EN"][key];
    return key;
  };
  return { t, language };
}
