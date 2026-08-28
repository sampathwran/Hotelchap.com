const fs = require("fs");
let code = fs.readFileSync("src/components/Header.tsx", "utf-8");

// 1. Imports
if(!code.includes("useSettings")) {
  code = code.replace("import { useAuth } from \"@/context/AuthContext\";", "import { useAuth } from \"@/context/AuthContext\";\nimport { useSettings } from \"@/context/SettingsContext\";\nimport CurrencyModal from \"./CurrencyModal\";\nimport LanguageModal from \"./LanguageModal\";");
}

// 2. Remove useState and add useSettings
code = code.replace(/const \[currency, setCurrency\] = useState\("USD"\);\s*const \[language, setLanguage\] = useState\("EN"\);/, "const { currency, setCurrency, language, setLanguage } = useSettings();");

// 3. Remove mobile inline currency dropdown
code = code.replace(/\{showCurrency && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>\s*\)\}/g, "");
// Remove mobile inline language dropdown (if it exists)
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>\s*\)\}/g, "");

// 4. Remove desktop inline currency dropdown
code = code.replace(/\{showCurrency && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>\s*\)\}/g, "");
// Remove desktop inline language dropdown
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>\s*\)\}/g, "");

// 5. Add Modals at the bottom
if(!code.includes("<LanguageModal")) {
  code = code.replace(/<\/header>/, `  <LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} currentLanguage={language} onSelect={(l) => { setLanguage(l); setShowLanguage(false); }} />\n      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />\n    </header>`);
}

fs.writeFileSync("src/components/Header.tsx", code);

