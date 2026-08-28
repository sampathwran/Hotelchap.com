const fs = require("fs");
let code = fs.readFileSync("src/app/page.tsx", "utf-8");
if(!code.includes("import LanguageModal")) {
  code = code.replace("import CurrencyModal from \"@/components/CurrencyModal\";", "import CurrencyModal from \"@/components/CurrencyModal\";\nimport LanguageModal from \"@/components/LanguageModal\";");
}
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/, "");
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/, "");
if(!code.includes("<LanguageModal")) {
  code = code.replace("<CurrencyModal isOpen={showCurrency}", "<LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} currentLanguage={language} onSelect={(l: string) => { setLanguage(l); setShowLanguage(false); }} />\n      <CurrencyModal isOpen={showCurrency}");
}
fs.writeFileSync("src/app/page.tsx", code);

code = fs.readFileSync("src/components/Header.tsx", "utf-8");
if(!code.includes("import LanguageModal")) {
  code = code.replace("import CurrencyModal from \"./CurrencyModal\";", "import CurrencyModal from \"./CurrencyModal\";\nimport LanguageModal from \"./LanguageModal\";");
}
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/, "");
code = code.replace(/\{showLanguage && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/, "");
if(!code.includes("<LanguageModal")) {
  code = code.replace("<CurrencyModal isOpen={showCurrency}", "<LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} currentLanguage={language} onSelect={(l: string) => { setLanguage(l); setShowLanguage(false); }} />\n      <CurrencyModal isOpen={showCurrency}");
}
fs.writeFileSync("src/components/Header.tsx", code);

