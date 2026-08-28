import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const allCurrencies = [
  {
    "code": "USD",
    "symbol": "$",
    "name": "US Dollar"
  },
  {
    "code": "AED",
    "symbol": "AED",
    "name": "UAE Dirham"
  },
  {
    "code": "AFN",
    "symbol": "AFN",
    "name": "AFN Currency"
  },
  {
    "code": "ALL",
    "symbol": "ALL",
    "name": "ALL Currency"
  },
  {
    "code": "AMD",
    "symbol": "AMD",
    "name": "AMD Currency"
  },
  {
    "code": "ANG",
    "symbol": "ANG",
    "name": "ANG Currency"
  },
  {
    "code": "AOA",
    "symbol": "AOA",
    "name": "AOA Currency"
  },
  {
    "code": "ARS",
    "symbol": "$",
    "name": "Argentine Peso"
  },
  {
    "code": "AUD",
    "symbol": "A$",
    "name": "Australian Dollar"
  },
  {
    "code": "AWG",
    "symbol": "AWG",
    "name": "AWG Currency"
  },
  {
    "code": "AZN",
    "symbol": "AZN",
    "name": "AZN Currency"
  },
  {
    "code": "BAM",
    "symbol": "BAM",
    "name": "BAM Currency"
  },
  {
    "code": "BBD",
    "symbol": "BBD",
    "name": "BBD Currency"
  },
  {
    "code": "BDT",
    "symbol": "?",
    "name": "Bangladeshi Taka"
  },
  {
    "code": "BGN",
    "symbol": "BGN",
    "name": "BGN Currency"
  },
  {
    "code": "BHD",
    "symbol": "BHD",
    "name": "Bahraini Dinar"
  },
  {
    "code": "BIF",
    "symbol": "BIF",
    "name": "BIF Currency"
  },
  {
    "code": "BMD",
    "symbol": "BMD",
    "name": "BMD Currency"
  },
  {
    "code": "BND",
    "symbol": "B$",
    "name": "Brunei Dollar"
  },
  {
    "code": "BOB",
    "symbol": "BOB",
    "name": "BOB Currency"
  },
  {
    "code": "BRL",
    "symbol": "R$",
    "name": "Brazilian Real"
  },
  {
    "code": "BSD",
    "symbol": "BSD",
    "name": "BSD Currency"
  },
  {
    "code": "BTN",
    "symbol": "BTN",
    "name": "BTN Currency"
  },
  {
    "code": "BWP",
    "symbol": "BWP",
    "name": "BWP Currency"
  },
  {
    "code": "BYN",
    "symbol": "BYN",
    "name": "BYN Currency"
  },
  {
    "code": "BZD",
    "symbol": "BZD",
    "name": "BZD Currency"
  },
  {
    "code": "CAD",
    "symbol": "C$",
    "name": "Canadian Dollar"
  },
  {
    "code": "CDF",
    "symbol": "CDF",
    "name": "CDF Currency"
  },
  {
    "code": "CHF",
    "symbol": "CHF",
    "name": "Swiss Franc"
  },
  {
    "code": "CLF",
    "symbol": "CLF",
    "name": "CLF Currency"
  },
  {
    "code": "CLP",
    "symbol": "$",
    "name": "Chilean Peso"
  },
  {
    "code": "CNH",
    "symbol": "CNH",
    "name": "CNH Currency"
  },
  {
    "code": "CNY",
    "symbol": "�",
    "name": "Chinese Yuan"
  },
  {
    "code": "COP",
    "symbol": "$",
    "name": "Colombian Peso"
  },
  {
    "code": "CRC",
    "symbol": "CRC",
    "name": "CRC Currency"
  },
  {
    "code": "CUP",
    "symbol": "CUP",
    "name": "CUP Currency"
  },
  {
    "code": "CVE",
    "symbol": "CVE",
    "name": "CVE Currency"
  },
  {
    "code": "CZK",
    "symbol": "CZK",
    "name": "CZK Currency"
  },
  {
    "code": "DJF",
    "symbol": "DJF",
    "name": "DJF Currency"
  },
  {
    "code": "DKK",
    "symbol": "kr",
    "name": "Danish Krone"
  },
  {
    "code": "DOP",
    "symbol": "DOP",
    "name": "DOP Currency"
  },
  {
    "code": "DZD",
    "symbol": "DZD",
    "name": "Algerian Dinar"
  },
  {
    "code": "EGP",
    "symbol": "E�",
    "name": "Egyptian Pound"
  },
  {
    "code": "ERN",
    "symbol": "ERN",
    "name": "ERN Currency"
  },
  {
    "code": "ETB",
    "symbol": "ETB",
    "name": "ETB Currency"
  },
  {
    "code": "EUR",
    "symbol": "�",
    "name": "Euro"
  },
  {
    "code": "FJD",
    "symbol": "FJD",
    "name": "FJD Currency"
  },
  {
    "code": "FKP",
    "symbol": "FKP",
    "name": "FKP Currency"
  },
  {
    "code": "FOK",
    "symbol": "FOK",
    "name": "FOK Currency"
  },
  {
    "code": "GBP",
    "symbol": "�",
    "name": "British Pound"
  },
  {
    "code": "GEL",
    "symbol": "GEL",
    "name": "GEL Currency"
  },
  {
    "code": "GGP",
    "symbol": "GGP",
    "name": "GGP Currency"
  },
  {
    "code": "GHS",
    "symbol": "GH?",
    "name": "Ghanaian Cedi"
  },
  {
    "code": "GIP",
    "symbol": "GIP",
    "name": "GIP Currency"
  },
  {
    "code": "GMD",
    "symbol": "GMD",
    "name": "GMD Currency"
  },
  {
    "code": "GNF",
    "symbol": "GNF",
    "name": "GNF Currency"
  },
  {
    "code": "GTQ",
    "symbol": "GTQ",
    "name": "GTQ Currency"
  },
  {
    "code": "GYD",
    "symbol": "GYD",
    "name": "GYD Currency"
  },
  {
    "code": "HKD",
    "symbol": "HK$",
    "name": "Hong Kong Dollar"
  },
  {
    "code": "HNL",
    "symbol": "HNL",
    "name": "HNL Currency"
  },
  {
    "code": "HRK",
    "symbol": "HRK",
    "name": "HRK Currency"
  },
  {
    "code": "HTG",
    "symbol": "HTG",
    "name": "HTG Currency"
  },
  {
    "code": "HUF",
    "symbol": "HUF",
    "name": "HUF Currency"
  },
  {
    "code": "IDR",
    "symbol": "Rp",
    "name": "Indonesian Rupiah"
  },
  {
    "code": "ILS",
    "symbol": "?",
    "name": "Israeli New Shekel"
  },
  {
    "code": "IMP",
    "symbol": "IMP",
    "name": "IMP Currency"
  },
  {
    "code": "INR",
    "symbol": "?",
    "name": "Indian Rupee"
  },
  {
    "code": "IQD",
    "symbol": "IQD",
    "name": "IQD Currency"
  },
  {
    "code": "IRR",
    "symbol": "IRR",
    "name": "IRR Currency"
  },
  {
    "code": "ISK",
    "symbol": "ISK",
    "name": "ISK Currency"
  },
  {
    "code": "JEP",
    "symbol": "JEP",
    "name": "JEP Currency"
  },
  {
    "code": "JMD",
    "symbol": "JMD",
    "name": "JMD Currency"
  },
  {
    "code": "JOD",
    "symbol": "JOD",
    "name": "Jordanian Dinar"
  },
  {
    "code": "JPY",
    "symbol": "�",
    "name": "Japanese Yen"
  },
  {
    "code": "KES",
    "symbol": "KSh",
    "name": "Kenyan Shilling"
  },
  {
    "code": "KGS",
    "symbol": "KGS",
    "name": "KGS Currency"
  },
  {
    "code": "KHR",
    "symbol": "?",
    "name": "Cambodian Riel"
  },
  {
    "code": "KID",
    "symbol": "KID",
    "name": "KID Currency"
  },
  {
    "code": "KMF",
    "symbol": "KMF",
    "name": "KMF Currency"
  },
  {
    "code": "KRW",
    "symbol": "?",
    "name": "South Korean Won"
  },
  {
    "code": "KWD",
    "symbol": "KWD",
    "name": "Kuwaiti Dinar"
  },
  {
    "code": "KYD",
    "symbol": "KYD",
    "name": "KYD Currency"
  },
  {
    "code": "KZT",
    "symbol": "KZT",
    "name": "KZT Currency"
  },
  {
    "code": "LAK",
    "symbol": "?",
    "name": "Lao Kip"
  },
  {
    "code": "LBP",
    "symbol": "L�",
    "name": "Lebanese Pound"
  },
  {
    "code": "LKR",
    "symbol": "Rs",
    "name": "Sri Lankan Rupee"
  },
  {
    "code": "LRD",
    "symbol": "LRD",
    "name": "LRD Currency"
  },
  {
    "code": "LSL",
    "symbol": "LSL",
    "name": "LSL Currency"
  },
  {
    "code": "LYD",
    "symbol": "LYD",
    "name": "LYD Currency"
  },
  {
    "code": "MAD",
    "symbol": "MAD",
    "name": "Moroccan Dirham"
  },
  {
    "code": "MDL",
    "symbol": "MDL",
    "name": "MDL Currency"
  },
  {
    "code": "MGA",
    "symbol": "MGA",
    "name": "MGA Currency"
  },
  {
    "code": "MKD",
    "symbol": "MKD",
    "name": "MKD Currency"
  },
  {
    "code": "MMK",
    "symbol": "K",
    "name": "Myanmar Kyat"
  },
  {
    "code": "MNT",
    "symbol": "MNT",
    "name": "MNT Currency"
  },
  {
    "code": "MOP",
    "symbol": "MOP$",
    "name": "Macanese Pataca"
  },
  {
    "code": "MRU",
    "symbol": "MRU",
    "name": "MRU Currency"
  },
  {
    "code": "MUR",
    "symbol": "MUR",
    "name": "MUR Currency"
  },
  {
    "code": "MVR",
    "symbol": "MVR",
    "name": "MVR Currency"
  },
  {
    "code": "MWK",
    "symbol": "MWK",
    "name": "MWK Currency"
  },
  {
    "code": "MXN",
    "symbol": "Mex$",
    "name": "Mexican Peso"
  },
  {
    "code": "MYR",
    "symbol": "RM",
    "name": "Malaysian Ringgit"
  },
  {
    "code": "MZN",
    "symbol": "MZN",
    "name": "MZN Currency"
  },
  {
    "code": "NAD",
    "symbol": "NAD",
    "name": "NAD Currency"
  },
  {
    "code": "NGN",
    "symbol": "?",
    "name": "Nigerian Naira"
  },
  {
    "code": "NIO",
    "symbol": "NIO",
    "name": "NIO Currency"
  },
  {
    "code": "NOK",
    "symbol": "kr",
    "name": "Norwegian Krone"
  },
  {
    "code": "NPR",
    "symbol": "Rs",
    "name": "Nepalese Rupee"
  },
  {
    "code": "NZD",
    "symbol": "NZ$",
    "name": "New Zealand Dollar"
  },
  {
    "code": "OMR",
    "symbol": "OMR",
    "name": "Omani Rial"
  },
  {
    "code": "PAB",
    "symbol": "PAB",
    "name": "PAB Currency"
  },
  {
    "code": "PEN",
    "symbol": "S/",
    "name": "Peruvian Sol"
  },
  {
    "code": "PGK",
    "symbol": "PGK",
    "name": "PGK Currency"
  },
  {
    "code": "PHP",
    "symbol": "?",
    "name": "Philippine Peso"
  },
  {
    "code": "PKR",
    "symbol": "Rs",
    "name": "Pakistani Rupee"
  },
  {
    "code": "PLN",
    "symbol": "zl",
    "name": "Polish Zloty"
  },
  {
    "code": "PYG",
    "symbol": "PYG",
    "name": "PYG Currency"
  },
  {
    "code": "QAR",
    "symbol": "QAR",
    "name": "Qatari Riyal"
  },
  {
    "code": "RON",
    "symbol": "RON",
    "name": "RON Currency"
  },
  {
    "code": "RSD",
    "symbol": "RSD",
    "name": "RSD Currency"
  },
  {
    "code": "RUB",
    "symbol": "?",
    "name": "Russian Ruble"
  },
  {
    "code": "RWF",
    "symbol": "RWF",
    "name": "RWF Currency"
  },
  {
    "code": "SAR",
    "symbol": "SAR",
    "name": "Saudi Riyal"
  },
  {
    "code": "SBD",
    "symbol": "SBD",
    "name": "SBD Currency"
  },
  {
    "code": "SCR",
    "symbol": "SCR",
    "name": "SCR Currency"
  },
  {
    "code": "SDG",
    "symbol": "SDG",
    "name": "SDG Currency"
  },
  {
    "code": "SEK",
    "symbol": "kr",
    "name": "Swedish Krona"
  },
  {
    "code": "SGD",
    "symbol": "S$",
    "name": "Singapore Dollar"
  },
  {
    "code": "SHP",
    "symbol": "SHP",
    "name": "SHP Currency"
  },
  {
    "code": "SLE",
    "symbol": "SLE",
    "name": "SLE Currency"
  },
  {
    "code": "SLL",
    "symbol": "SLL",
    "name": "SLL Currency"
  },
  {
    "code": "SOS",
    "symbol": "SOS",
    "name": "SOS Currency"
  },
  {
    "code": "SRD",
    "symbol": "SRD",
    "name": "SRD Currency"
  },
  {
    "code": "SSP",
    "symbol": "SSP",
    "name": "SSP Currency"
  },
  {
    "code": "STN",
    "symbol": "STN",
    "name": "STN Currency"
  },
  {
    "code": "SYP",
    "symbol": "SYP",
    "name": "SYP Currency"
  },
  {
    "code": "SZL",
    "symbol": "SZL",
    "name": "SZL Currency"
  },
  {
    "code": "THB",
    "symbol": "?",
    "name": "Thai Baht"
  },
  {
    "code": "TJS",
    "symbol": "TJS",
    "name": "TJS Currency"
  },
  {
    "code": "TMT",
    "symbol": "TMT",
    "name": "TMT Currency"
  },
  {
    "code": "TND",
    "symbol": "TND",
    "name": "Tunisian Dinar"
  },
  {
    "code": "TOP",
    "symbol": "TOP",
    "name": "TOP Currency"
  },
  {
    "code": "TRY",
    "symbol": "?",
    "name": "Turkish Lira"
  },
  {
    "code": "TTD",
    "symbol": "TTD",
    "name": "TTD Currency"
  },
  {
    "code": "TVD",
    "symbol": "TVD",
    "name": "TVD Currency"
  },
  {
    "code": "TWD",
    "symbol": "NT$",
    "name": "New Taiwan Dollar"
  },
  {
    "code": "TZS",
    "symbol": "TZS",
    "name": "TZS Currency"
  },
  {
    "code": "UAH",
    "symbol": "UAH",
    "name": "UAH Currency"
  },
  {
    "code": "UGX",
    "symbol": "UGX",
    "name": "UGX Currency"
  },
  {
    "code": "UYU",
    "symbol": "UYU",
    "name": "UYU Currency"
  },
  {
    "code": "UZS",
    "symbol": "UZS",
    "name": "UZS Currency"
  },
  {
    "code": "VES",
    "symbol": "VES",
    "name": "VES Currency"
  },
  {
    "code": "VND",
    "symbol": "?",
    "name": "Vietnamese Dong"
  },
  {
    "code": "VUV",
    "symbol": "VUV",
    "name": "VUV Currency"
  },
  {
    "code": "WST",
    "symbol": "WST",
    "name": "WST Currency"
  },
  {
    "code": "XAF",
    "symbol": "XAF",
    "name": "XAF Currency"
  },
  {
    "code": "XCD",
    "symbol": "XCD",
    "name": "XCD Currency"
  },
  {
    "code": "XCG",
    "symbol": "XCG",
    "name": "XCG Currency"
  },
  {
    "code": "XDR",
    "symbol": "XDR",
    "name": "XDR Currency"
  },
  {
    "code": "XOF",
    "symbol": "XOF",
    "name": "XOF Currency"
  },
  {
    "code": "XPF",
    "symbol": "XPF",
    "name": "XPF Currency"
  },
  {
    "code": "YER",
    "symbol": "YER",
    "name": "YER Currency"
  },
  {
    "code": "ZAR",
    "symbol": "R",
    "name": "South African Rand"
  },
  {
    "code": "ZMW",
    "symbol": "ZMW",
    "name": "ZMW Currency"
  },
  {
    "code": "ZWG",
    "symbol": "ZWG",
    "name": "ZWG Currency"
  },
  {
    "code": "ZWL",
    "symbol": "ZWL",
    "name": "ZWL Currency"
  }
];

export default function CurrencyModal({ 
  isOpen, 
  onClose, 
  currentCurrency, 
  onSelect 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  currentCurrency: string, 
  onSelect: (c: string) => void 
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filtered = allCurrencies.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Select Currency</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by currency code or name (e.g. USD, LKR)..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673AB7] focus:border-transparent text-gray-800 font-medium placeholder-gray-400 shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto p-4 md:p-6 bg-white flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map(c => {
              const isActive = currentCurrency === c.code;
              return (
              <button
                key={c.code}
                onClick={() => { onSelect(c.code); onClose(); }}
                className={"flex items-center justify-between p-4 rounded-xl border transition-all " + (isActive ? "border-[#673AB7] bg-purple-50 shadow-md ring-1 ring-[#673AB7]" : "border-gray-100 hover:border-gray-300 hover:shadow-sm hover:bg-gray-50")}
              >
                <div className="flex flex-col items-start">
                  <span className={"font-black text-lg " + (isActive ? "text-[#673AB7]" : "text-gray-800")}>{c.code}</span>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">{c.name}</span>
                </div>
                <div className={"flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg " + (isActive ? "bg-[#673AB7] text-white" : "bg-gray-100 text-gray-600")}>
                  {c.symbol}
                </div>
              </button>
            )})}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No currencies found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
