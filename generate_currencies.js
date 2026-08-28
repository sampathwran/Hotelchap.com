const https = require("https");
const fs = require("fs");

https.get("https://open.er-api.com/v6/latest/USD", (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
        const rates = JSON.parse(data).rates;
        const allCurrencyCodes = Object.keys(rates);
        
        const currencyMap = {
            "USD": ["$", "US Dollar"], "LKR": ["Rs", "Sri Lankan Rupee"], "EUR": ["€", "Euro"], "GBP": ["£", "British Pound"],
            "AUD": ["A$", "Australian Dollar"], "CAD": ["C$", "Canadian Dollar"], "SGD": ["S$", "Singapore Dollar"],
            "AED": ["AED", "UAE Dirham"], "INR": ["?", "Indian Rupee"], "JPY": ["¥", "Japanese Yen"], "CNY": ["¥", "Chinese Yuan"],
            "CHF": ["CHF", "Swiss Franc"], "NZD": ["NZ$", "New Zealand Dollar"], "MYR": ["RM", "Malaysian Ringgit"],
            "THB": ["?", "Thai Baht"], "SAR": ["SAR", "Saudi Riyal"], "QAR": ["QAR", "Qatari Riyal"], "OMR": ["OMR", "Omani Rial"],
            "KWD": ["KWD", "Kuwaiti Dinar"], "BHD": ["BHD", "Bahraini Dinar"], "ZAR": ["R", "South African Rand"],
            "RUB": ["?", "Russian Ruble"], "BRL": ["R$", "Brazilian Real"], "KRW": ["?", "South Korean Won"],
            "IDR": ["Rp", "Indonesian Rupiah"], "PHP": ["?", "Philippine Peso"], "VND": ["?", "Vietnamese Dong"],
            "TRY": ["?", "Turkish Lira"], "MXN": ["Mex$", "Mexican Peso"], "EGP": ["E£", "Egyptian Pound"],
            "SEK": ["kr", "Swedish Krona"], "NOK": ["kr", "Norwegian Krone"], "DKK": ["kr", "Danish Krone"],
            "PLN": ["zl", "Polish Zloty"], "ILS": ["?", "Israeli New Shekel"], "HKD": ["HK$", "Hong Kong Dollar"],
            "TWD": ["NT$", "New Taiwan Dollar"], "PKR": ["Rs", "Pakistani Rupee"], "BDT": ["?", "Bangladeshi Taka"],
            "NPR": ["Rs", "Nepalese Rupee"], "ARS": ["$", "Argentine Peso"], "CLP": ["$", "Chilean Peso"],
            "COP": ["$", "Colombian Peso"], "PEN": ["S/", "Peruvian Sol"], "NGN": ["?", "Nigerian Naira"],
            "KES": ["KSh", "Kenyan Shilling"], "GHS": ["GH?", "Ghanaian Cedi"], "MAD": ["MAD", "Moroccan Dirham"],
            "DZD": ["DZD", "Algerian Dinar"], "TND": ["TND", "Tunisian Dinar"], "JOD": ["JOD", "Jordanian Dinar"],
            "LBP": ["L£", "Lebanese Pound"], "MMK": ["K", "Myanmar Kyat"], "KHR": ["?", "Cambodian Riel"],
            "LAK": ["?", "Lao Kip"], "BND": ["B$", "Brunei Dollar"], "MOP": ["MOP$", "Macanese Pataca"]
        };

        const finalCurrencies = [];
        const finalRates = {};

        allCurrencyCodes.forEach(code => {
            finalRates[code] = rates[code];
            const meta = currencyMap[code] || [code, code + " Currency"];
            finalCurrencies.push({ code, symbol: meta[0], name: meta[1] });
        });

        const currencyCodeStr = `export const allCurrencies = ${JSON.stringify(finalCurrencies, null, 2)};`;
        const ratesCodeStr = `export const exchangeRates: Record<string, number> = ${JSON.stringify(finalRates, null, 2)};\n\nexport function convertCurrency(amount: number, from: string, to: string): number {\n  const fromRate = exchangeRates[from] || 1;\n  const toRate = exchangeRates[to] || 1;\n  const inUSD = amount / fromRate;\n  return Math.round(inUSD * toRate);\n}`;
        
        let modalCode = fs.readFileSync("src/components/CurrencyModal.tsx", "utf-8");
        modalCode = modalCode.replace(/export const allCurrencies = \[\s*\{[\s\S]*?\}\s*\];/, currencyCodeStr);
        fs.writeFileSync("src/components/CurrencyModal.tsx", modalCode);

        fs.writeFileSync("src/lib/exchangeRates.ts", ratesCodeStr);
        console.log("SUCCESS! Wrote " + finalCurrencies.length + " currencies.");
    });
});

