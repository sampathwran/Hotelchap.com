const fs = require("fs");

let search = fs.readFileSync("src/app/search/page.tsx", "utf-8");
search = search.replace(/&price=\$\{hotel\.price\}/g, "&price=${hotel.price}&baseCurrency=${currency}");
fs.writeFileSync("src/app/search/page.tsx", search);

let hotel = fs.readFileSync("src/app/hotel/[id]/page.tsx", "utf-8");
hotel = hotel.replace("import { allCurrencies } from \"@/components/CurrencyModal\";", "import { allCurrencies } from \"@/components/CurrencyModal\";\nimport { convertCurrency } from \"@/lib/exchangeRates\";");
hotel = hotel.replace("const urlPrice = searchParams.get(\"price\");", "const urlPrice = searchParams.get(\"price\");\n  const baseCurrency = searchParams.get(\"baseCurrency\") || \"USD\";\n  const displayPrice = urlPrice ? convertCurrency(Number(urlPrice), baseCurrency, currency) : 100;");

// Update references from urlPrice to displayPrice. Note that some places might use urlPrice or providerPrice directly.
// Let us check how it maps to providerPrice.
hotel = hotel.replace("const price = urlPrice ? parseInt(urlPrice) : 120;", "const price = displayPrice;");

fs.writeFileSync("src/app/hotel/[id]/page.tsx", hotel);

