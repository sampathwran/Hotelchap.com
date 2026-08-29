import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const allLanguages = [
  {
    "code": "AF",
    "name": "Afrikaans",
    "localName": "Afrikaans"
  },
  {
    "code": "SQ",
    "name": "Albanian",
    "localName": "Shqip"
  },
  {
    "code": "AM",
    "name": "Amharic",
    "localName": "????"
  },
  {
    "code": "AR",
    "name": "Arabic",
    "localName": "???????"
  },
  {
    "code": "HY",
    "name": "Armenian",
    "localName": "???????"
  },
  {
    "code": "AZ",
    "name": "Azerbaijani",
    "localName": "Az?rbaycan"
  },
  {
    "code": "EU",
    "name": "Basque",
    "localName": "Euskara"
  },
  {
    "code": "BE",
    "name": "Belarusian",
    "localName": "??????????"
  },
  {
    "code": "BN",
    "name": "Bengali",
    "localName": "?????"
  },
  {
    "code": "BS",
    "name": "Bosnian",
    "localName": "Bosanski"
  },
  {
    "code": "BG",
    "name": "Bulgarian",
    "localName": "?????????"
  },
  {
    "code": "CA",
    "name": "Catalan",
    "localName": "Catal�"
  },
  {
    "code": "CEB",
    "name": "Cebuano",
    "localName": "Cebuano"
  },
  {
    "code": "NY",
    "name": "Chichewa",
    "localName": "Chichewa"
  },
  {
    "code": "ZH-CN",
    "name": "Chinese (Simplified)",
    "localName": "????"
  },
  {
    "code": "ZH-TW",
    "name": "Chinese (Traditional)",
    "localName": "????"
  },
  {
    "code": "CO",
    "name": "Corsican",
    "localName": "Corsu"
  },
  {
    "code": "HR",
    "name": "Croatian",
    "localName": "Hrvatski"
  },
  {
    "code": "CS",
    "name": "Czech",
    "localName": "Ce�tina"
  },
  {
    "code": "DA",
    "name": "Danish",
    "localName": "Dansk"
  },
  {
    "code": "NL",
    "name": "Dutch",
    "localName": "Nederlands"
  },
  {
    "code": "EN",
    "name": "English",
    "localName": "English"
  },
  {
    "code": "EO",
    "name": "Esperanto",
    "localName": "Esperanto"
  },
  {
    "code": "ET",
    "name": "Estonian",
    "localName": "Eesti"
  },
  {
    "code": "TL",
    "name": "Filipino",
    "localName": "Filipino"
  },
  {
    "code": "FI",
    "name": "Finnish",
    "localName": "Suomi"
  },
  {
    "code": "FR",
    "name": "French",
    "localName": "Fran�ais"
  },
  {
    "code": "FY",
    "name": "Frisian",
    "localName": "Frysk"
  },
  {
    "code": "GL",
    "name": "Galician",
    "localName": "Galego"
  },
  {
    "code": "KA",
    "name": "Georgian",
    "localName": "???????"
  },
  {
    "code": "DE",
    "name": "German",
    "localName": "Deutsch"
  },
  {
    "code": "EL",
    "name": "Greek",
    "localName": "????????"
  },
  {
    "code": "GU",
    "name": "Gujarati",
    "localName": "???????"
  },
  {
    "code": "HT",
    "name": "Haitian Creole",
    "localName": "Krey�l"
  },
  {
    "code": "HA",
    "name": "Hausa",
    "localName": "Hausa"
  },
  {
    "code": "HAW",
    "name": "Hawaiian",
    "localName": "Hawai?i"
  },
  {
    "code": "IW",
    "name": "Hebrew",
    "localName": "?????"
  },
  {
    "code": "HI",
    "name": "Hindi",
    "localName": "??????"
  },
  {
    "code": "HMN",
    "name": "Hmong",
    "localName": "Hmoob"
  },
  {
    "code": "HU",
    "name": "Hungarian",
    "localName": "Magyar"
  },
  {
    "code": "IS",
    "name": "Icelandic",
    "localName": "�slenska"
  },
  {
    "code": "IG",
    "name": "Igbo",
    "localName": "Igbo"
  },
  {
    "code": "ID",
    "name": "Indonesian",
    "localName": "Indonesia"
  },
  {
    "code": "GA",
    "name": "Irish",
    "localName": "Gaeilge"
  },
  {
    "code": "IT",
    "name": "Italian",
    "localName": "Italiano"
  },
  {
    "code": "JA",
    "name": "Japanese",
    "localName": "???"
  },
  {
    "code": "JW",
    "name": "Javanese",
    "localName": "Jawa"
  },
  {
    "code": "KN",
    "name": "Kannada",
    "localName": "?????"
  },
  {
    "code": "KK",
    "name": "Kazakh",
    "localName": "?????"
  },
  {
    "code": "KM",
    "name": "Khmer",
    "localName": "?????"
  },
  {
    "code": "RW",
    "name": "Kinyarwanda",
    "localName": "Kinyarwanda"
  },
  {
    "code": "KO",
    "name": "Korean",
    "localName": "???"
  },
  {
    "code": "KU",
    "name": "Kurdish (Kurmanji)",
    "localName": "Kurd�"
  },
  {
    "code": "KY",
    "name": "Kyrgyz",
    "localName": "????????"
  },
  {
    "code": "LO",
    "name": "Lao",
    "localName": "???"
  },
  {
    "code": "LA",
    "name": "Latin",
    "localName": "Latina"
  },
  {
    "code": "LV",
    "name": "Latvian",
    "localName": "Latvie�u"
  },
  {
    "code": "LT",
    "name": "Lithuanian",
    "localName": "Lietuviu"
  },
  {
    "code": "LB",
    "name": "Luxembourgish",
    "localName": "L�tzebuergesch"
  },
  {
    "code": "MK",
    "name": "Macedonian",
    "localName": "??????????"
  },
  {
    "code": "MG",
    "name": "Malagasy",
    "localName": "Malagasy"
  },
  {
    "code": "MS",
    "name": "Malay",
    "localName": "Melayu"
  },
  {
    "code": "ML",
    "name": "Malayalam",
    "localName": "??????"
  },
  {
    "code": "MT",
    "name": "Maltese",
    "localName": "Malti"
  },
  {
    "code": "MI",
    "name": "Maori",
    "localName": "Maori"
  },
  {
    "code": "MR",
    "name": "Marathi",
    "localName": "?????"
  },
  {
    "code": "MN",
    "name": "Mongolian",
    "localName": "??????"
  },
  {
    "code": "MY",
    "name": "Myanmar (Burmese)",
    "localName": "??????"
  },
  {
    "code": "NE",
    "name": "Nepali",
    "localName": "??????"
  },
  {
    "code": "NO",
    "name": "Norwegian",
    "localName": "Norsk"
  },
  {
    "code": "OR",
    "name": "Odia (Oriya)",
    "localName": "?????"
  },
  {
    "code": "PS",
    "name": "Pashto",
    "localName": "????"
  },
  {
    "code": "FA",
    "name": "Persian",
    "localName": "?????"
  },
  {
    "code": "PL",
    "name": "Polish",
    "localName": "Polski"
  },
  {
    "code": "PT",
    "name": "Portuguese",
    "localName": "Portugu�s"
  },
  {
    "code": "PA",
    "name": "Punjabi",
    "localName": "??????"
  },
  {
    "code": "RO",
    "name": "Romanian",
    "localName": "Rom�na"
  },
  {
    "code": "RU",
    "name": "Russian",
    "localName": "???????"
  },
  {
    "code": "SM",
    "name": "Samoan",
    "localName": "Samoa"
  },
  {
    "code": "GD",
    "name": "Scots Gaelic",
    "localName": "G�idhlig"
  },
  {
    "code": "SR",
    "name": "Serbian",
    "localName": "??????"
  },
  {
    "code": "ST",
    "name": "Sesotho",
    "localName": "Sesotho"
  },
  {
    "code": "SN",
    "name": "Shona",
    "localName": "Shona"
  },
  {
    "code": "SD",
    "name": "Sindhi",
    "localName": "????"
  },
  {
    "code": "SI",
    "name": "Sinhala",
    "localName": "?????"
  },
  {
    "code": "SK",
    "name": "Slovak",
    "localName": "Slovencina"
  },
  {
    "code": "SL",
    "name": "Slovenian",
    "localName": "Sloven�cina"
  },
  {
    "code": "SO",
    "name": "Somali",
    "localName": "Soomaali"
  },
  {
    "code": "ES",
    "name": "Spanish",
    "localName": "Espa�ol"
  },
  {
    "code": "SU",
    "name": "Sundanese",
    "localName": "Sunda"
  },
  {
    "code": "SW",
    "name": "Swahili",
    "localName": "Kiswahili"
  },
  {
    "code": "SV",
    "name": "Swedish",
    "localName": "Svenska"
  },
  {
    "code": "TG",
    "name": "Tajik",
    "localName": "??????"
  },
  {
    "code": "TA",
    "name": "Tamil",
    "localName": "?????"
  },
  {
    "code": "TT",
    "name": "Tatar",
    "localName": "?????"
  },
  {
    "code": "TE",
    "name": "Telugu",
    "localName": "??????"
  },
  {
    "code": "TH",
    "name": "Thai",
    "localName": "???"
  },
  {
    "code": "TR",
    "name": "Turkish",
    "localName": "T�rk�e"
  },
  {
    "code": "TK",
    "name": "Turkmen",
    "localName": "T�rkmen"
  },
  {
    "code": "UK",
    "name": "Ukrainian",
    "localName": "??????????"
  },
  {
    "code": "UR",
    "name": "Urdu",
    "localName": "????"
  },
  {
    "code": "UG",
    "name": "Uyghur",
    "localName": "????????"
  },
  {
    "code": "UZ",
    "name": "Uzbek",
    "localName": "O?zbek"
  },
  {
    "code": "VI",
    "name": "Vietnamese",
    "localName": "Ti?ng Vi?t"
  },
  {
    "code": "CY",
    "name": "Welsh",
    "localName": "Cymraeg"
  },
  {
    "code": "XH",
    "name": "Xhosa",
    "localName": "isiXhosa"
  },
  {
    "code": "YI",
    "name": "Yiddish",
    "localName": "??????"
  },
  {
    "code": "YO",
    "name": "Yoruba",
    "localName": "Yor�b�"
  },
  {
    "code": "ZU",
    "name": "Zulu",
    "localName": "isiZulu"
  }
];

export default function LanguageModal({ 
  isOpen, 
  onClose, 
  currentLanguage, 
  onSelect 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  currentLanguage: string, 
  onSelect: (l: string) => void 
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filtered = allLanguages.filter(l => 
    l.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.localName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Select Language</h2>
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
              placeholder="Search for a language (e.g. English, Sinhala)..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673AB7] focus:border-transparent text-gray-800 font-medium placeholder-gray-400 shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto p-4 md:p-6 bg-white flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map(l => {
              const isActive = currentLanguage === l.code;
              return (
              <button
                key={l.code}
                onClick={() => { onSelect(l.code); onClose(); }}
                className={"flex items-center justify-between p-4 rounded-xl border transition-all " + (isActive ? "border-[#673AB7] bg-purple-50 shadow-md ring-1 ring-[#673AB7]" : "border-gray-100 hover:border-gray-300 hover:shadow-sm hover:bg-gray-50")}
              >
                <div className="flex flex-col items-start">
                  <span className={"font-black text-lg " + (isActive ? "text-[#673AB7]" : "text-gray-800")}>{l.localName}</span>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">{l.name}</span>
                </div>
                <div className={"flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm " + (isActive ? "bg-[#673AB7] text-white" : "bg-gray-100 text-gray-600")}>
                  {l.code}
                </div>
              </button>
            )})}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No languages found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
