const fs = require("fs");

const worldLanguages = [
  { code: "EN", name: "English", localName: "English" },
  { code: "SI", name: "Sinhala", localName: "ధళಟನ" },
  { code: "TA", name: "Tamil", localName: "தமோ஧௽" },
  { code: "ES", name: "Spanish", localName: "Español" },
  { code: "FR", name: "French", localName: "Français" },
  { code: "DE","name": "German", "localName": "Deutsch" },
  { code: "IT", name: "Italian", localName: "Italiano" },
  { code: "PT","name": "Portuguese","localName": "Português" },
  { code: "RU", name: "Russian", localName: "Русский" },
  { code: "ZH","name": "Chinese", localName: "简体中文" },
  { code: "JA","name": "Japanese", localName: "日本語" },
  { code: "KO", name: "Korean", localName: "한귬어" },
  { code: "AR", name: "Arabic", localName: "العربية" },
  { code: "HI", name: "Hindi", localName: "हिन্दी" },
  { code: "TR", name: "Turkish", localName: "Türkçe" },
  { code: "NL","name": "Dutch", localName: "Nederlands" },
  { code: "SV", name: "Swedish", localName: "Svenska" },
  { code: "PL", name: "Polish", localName: "Polski" },
  { code: "ID","name": "Indonesian", localName: "Bahasa Indonesia" },
  { code: "TH", name: "Thai", localName: "ไทย" },
  { code: "VI","name": "Vietnamese", localName: "Tiếng Việt" }
];

let modalCode = fs.readFileSync("src/components/LanguageModal.tsx", "utf-8");
modalCode = modalCode.replace(/export const allLanguages = \[[\s\S]*?\];/, `export const allLanguages = ${JSON.stringify(worldLanguages, null, 2)};`);
fs.writeFileSync("src/components/LanguageModal.tsx", modalCode, "utf8");

console.log("Languages added: " + worldLanguages.length);