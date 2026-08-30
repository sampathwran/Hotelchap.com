const fs = require('fs');
const path = require('path');
const file = path.join('src', 'components', 'LanguageModal.tsx');
let content = fs.readFileSync(file, 'utf8');

const replacement = export const allLanguages = [
  { code: "EN", name: "English", localName: "English", flag: "🇬🇧" },
  { code: "SI", name: "Sinhala", localName: "සිංහල", flag: "🇱🇰" },
  { code: "TA", name: "Tamil", localName: "தமிழ்", flag: "🇱🇰" },
  { code: "HI", name: "Hindi", localName: "हिन्दी", flag: "🇮🇳" },
  { code: "AR", name: "Arabic", localName: "العربية", flag: "🇦🇪" },
  { code: "FR", name: "French", localName: "Français", flag: "🇫🇷" },
  { code: "EN-CA", name: "Canadian", localName: "English (CA)", flag: "🇨🇦" },
  { code: "MS", name: "Malay", localName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "DE", name: "German", localName: "Deutsch", flag: "🇩🇪" },
  { code: "ES", name: "Spanish", localName: "Español", flag: "🇪🇸" },
  { code: "IT", name: "Italian", localName: "Italiano", flag: "🇮🇹" },
  { code: "JA", name: "Japanese", localName: "日本語", flag: "🇯🇵" },
  { code: "KO", name: "Korean", localName: "한국어", flag: "🇰🇷" },
  { code: "PT", name: "Portuguese", localName: "Português", flag: "🇵🇹" },
  { code: "RU", name: "Russian", localName: "Русский", flag: "🇷🇺" },
  { code: "ZH-CN", name: "Chinese", localName: "中文", flag: "🇨🇳" },
  { code: "TH", name: "Thai", localName: "ไทย", flag: "🇹🇭" },
  { code: "NL", name: "Dutch", localName: "Nederlands", flag: "🇳🇱" },
  { code: "SV", name: "Swedish", localName: "Svenska", flag: "🇸🇪" },
  { code: "NO", name: "Norwegian", localName: "Norsk", flag: "🇳🇴" },
  { code: "FI", name: "Finnish", localName: "Suomi", flag: "🇫🇮" },
  { code: "DA", name: "Danish", localName: "Dansk", flag: "🇩🇰" },
  { code: "TR", name: "Turkish", localName: "Türkçe", flag: "🇹🇷" },
  { code: "VI", name: "Vietnamese", localName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ID", name: "Indonesian", localName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "PL", name: "Polish", localName: "Polski", flag: "🇵🇱" },
  { code: "EL", name: "Greek", localName: "Ελληνικά", flag: "🇬🇷" },
  { code: "HE", name: "Hebrew", localName: "עברית", flag: "🇮🇱" },
  { code: "UK", name: "Ukrainian", localName: "Українська", flag: "🇺🇦" },
  { code: "BN", name: "Bengali", localName: "বাংলা", flag: "🇧🇩" }
];;

content = content.replace(/export const allLanguages = \[[\s\S]*?\];/, replacement);
fs.writeFileSync(file, content, 'utf8');
