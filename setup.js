const fs = require('fs');
const path = require('path');

const languages = [
  { code: 'EN', name: 'English', local: 'English', flag: '🇬🇧' },
  { code: 'SI', name: 'Sinhala', local: 'සිංහල', flag: '🇱🇰' },
  { code: 'TA', name: 'Tamil', local: 'தமிழ்', flag: '🇱🇰' },
  { code: 'HI', name: 'Hindi', local: 'हिन्दी', flag: '🇮🇳' },
  { code: 'AR', name: 'Arabic', local: 'العربية', flag: '🇦🇪' },
  { code: 'FR', name: 'French', local: 'Français', flag: '🇫🇷' },
  { code: 'EN-CA', name: 'Canadian', local: 'English (CA)', flag: '🇨🇦' },
  { code: 'MS', name: 'Malay', local: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'DE', name: 'German', local: 'Deutsch', flag: '🇩🇪' },
  { code: 'ES', name: 'Spanish', local: 'Español', flag: '🇪🇸' },
  { code: 'IT', name: 'Italian', local: 'Italiano', flag: '🇮🇹' },
  { code: 'JA', name: 'Japanese', local: '日本語', flag: '🇯🇵' },
  { code: 'KO', name: 'Korean', local: '한국어', flag: '🇰🇷' },
  { code: 'PT', name: 'Portuguese', local: 'Português', flag: '🇵🇹' },
  { code: 'RU', name: 'Russian', local: 'Русский', flag: '🇷🇺' },
  { code: 'ZH-CN', name: 'Chinese', local: '中文', flag: '🇨🇳' },
  { code: 'TH', name: 'Thai', local: 'ไทย', flag: '🇹🇭' },
  { code: 'NL', name: 'Dutch', local: 'Nederlands', flag: '🇳🇱' },
  { code: 'SV', name: 'Swedish', local: 'Svenska', flag: '🇸🇪' },
  { code: 'NO', name: 'Norwegian', local: 'Norsk', flag: '🇳🇴' },
  { code: 'FI', name: 'Finnish', local: 'Suomi', flag: '🇫🇮' },
  { code: 'DA', name: 'Danish', local: 'Dansk', flag: '🇩🇰' },
  { code: 'TR', name: 'Turkish', local: 'Türkçe', flag: '🇹🇷' },
  { code: 'VI', name: 'Vietnamese', local: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ID', name: 'Indonesian', local: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'PL', name: 'Polish', local: 'Polski', flag: "🇵🇱" },
  { code: 'EL', name: 'Greek', local: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'HE', name: 'Hebrew', local: 'עברית', flag: '🇮🇱' },
  { code: 'UK', name: 'Ukrainian', local: 'Українська', flag: '🇺🇦' },
  { code: 'BN', name: 'Bengali', local: 'বাংলা', flag: '🇧🇩' }
];

const dictDir = path.join('src', 'lib', 'dictionaries');
if (!fs.existsSync(dictDir)) fs.mkdirSync(dictDir, { recursive: true });

const baseDict = {
  hotels: 'Hotels',
  flights: 'Flights',
  cars: 'Cars',
  packages: 'Packages',
  transfers: 'Transfers',
  attractions: 'Attractions',
  cruises: 'Cruises',
  getApp: 'Get the App',
  listProperty: 'List your property',
  support: 'Support',
  signIn: 'Sign In',
  searchPlaceholder: 'Search for a destination...',
  popularDestinations: 'Popular Destinations',
  searchBtn: 'Search',
  checkIn: 'Check-in',
  checkOut: 'Check-out',
  guests: 'Guests',
  rooms: 'Rooms',
  searchWhere: 'Where are you going?'
};

// Create dicts if missing
for (const lang of languages) {
  const file = path.join(dictDir, lang.code + '.json');
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(baseDict, null, 2), 'utf8');
  }
}

// Rewrite i18n.ts
let i18nContent = 'import { useSettings } from \"@/context/SettingsContext\";\\n\\n';
for (const lang of languages) {
  const varName = lang.code.replace('-', '_');
  i18nContent += 'import ' + varName + ' from \"./dictionaries/' + lang.code + '.json\";\\n';
}

i18nContent += '\\nexport const translations: Record<string, Record<string, string>> = {\\n';
for (const lang of languages) {
  const varName = lang.code.replace('-', '_');
  i18nContent += '  \"' + lang.code + '\": ' + varName + ',\\n';
}
i18nContent += '};\\n\\n';

i18nContent += 'export function useTranslation() {\\n' +
'  const { language } = useSettings();\\n' +
'  const t = (key: string) => {\\n' +
'    if (translations[language] && translations[language][key]) return translations[language][key];\\n' +
'    if (translations[\"EN\"] && translations[\"EN\"][key]) return translations[\"EN\"][key];\\n' +
'    return key;\\n' +
'  };\\n' +
'  return { t, language };\\n' +
'}\\n';

fs.writeFileSync(path.join('src', 'lib', 'i18n.ts'), i18nContent, 'utf8');

// Fix LanguageModal emojis
let modalContent = fs.readFileSync(path.join('src', 'components', 'LanguageModal.tsx'), 'utf8');
const newAllLanguages = 'export const allLanguages = [\\n' + languages.map(l => '  { code: \"' + l.code + '\", name: \"' + l.name + '\", localName: \"' + l.local + '\", flag: \"' + l.flag + '\" }').join(',\\n') + '\\n];';
modalContent = modalContent.replace(/export const allLanguages = \[[\s\S]*?\];/, newAllLanguages);
fs.writeFileSync(path.join('src', 'components', 'LanguageModal.tsx'), modalContent, 'utf8');

console.log('Done!');
