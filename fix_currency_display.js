const fs = require("fs");
function applyCurrency(filePath) {
  let code = fs.readFileSync(filePath, "utf-8");
  if(!code.includes("useSettings")) {
    code = code.replace("import { Suspense", "import { useSettings } from \"@/context/SettingsContext\";\nimport { allCurrencies } from \"@/components/CurrencyModal\";\nimport { Suspense");
    // For hotel page it might not have Suspense import, so just add it after React imports
    code = code.replace("import { useState", "import { useSettings } from \"@/context/SettingsContext\";\nimport { allCurrencies } from \"@/components/CurrencyModal\";\nimport { useState");
  } else if (!code.includes("allCurrencies")) {
    code = code.replace("import { useSettings", "import { allCurrencies } from \"@/components/CurrencyModal\";\nimport { useSettings");
  }
  
  if(!code.includes("getCurrencySymbol")) {
    code = code.replace("function SearchResults() {", "const getCurrencySymbol = (code) => allCurrencies.find(c => c.code === code)?.symbol || code;\n\nfunction SearchResults() {");
    code = code.replace("export default function HotelDetails() {", "const getCurrencySymbol = (code) => allCurrencies.find(c => c.code === code)?.symbol || code;\n\nexport default function HotelDetails() {");
  }
  
  if(filePath.includes("hotel") && !code.includes("currency = useSettings")) {
      code = code.replace("const searchParams = useSearchParams();", "const { currency } = useSettings();\n  const searchParams = useSearchParams();");
  }
  
  code = code.replace(/US\$\{/g, "${getCurrencySymbol(currency)} {");
  // Some places it might be US${price} 
  code = code.replace(/US\$\{hotel\.originalPrice\}/g, "${getCurrencySymbol(currency)}${hotel.originalPrice}");
  code = code.replace(/US\$\{hotel\.price\}/g, "${getCurrencySymbol(currency)}${hotel.price}");
  code = code.replace(/US\$\{providerPrice\}/g, "${getCurrencySymbol(currency)}${providerPrice}");

  fs.writeFileSync(filePath, code);
}
applyCurrency("src/app/search/page.tsx");
applyCurrency("src/app/hotel/[id]/page.tsx");

