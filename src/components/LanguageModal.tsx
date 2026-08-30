import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

export const allLanguages = [
  { code: "EN", name: "English", localName: "English", flag: "gb" },
  { code: "SI", name: "Sinhala", localName: "සිංහල", flag: "lk" },
  { code: "TA", name: "Tamil", localName: "தமிழ்", flag: "lk" },
  { code: "HI", name: "Hindi", localName: "हिन्दी", flag: "in" },
  { code: "AR", name: "Arabic", localName: "العربية", flag: "ae" },
  { code: "FR", name: "French", localName: "Français", flag: "fr" },
  { code: "EN-CA", name: "Canadian", localName: "English (CA)", flag: "ca" },
  { code: "MS", name: "Malay", localName: "Bahasa Melayu", flag: "my" },
  { code: "DE", name: "German", localName: "Deutsch", flag: "de" },
  { code: "ES", name: "Spanish", localName: "Español", flag: "es" },
  { code: "IT", name: "Italian", localName: "Italiano", flag: "it" },
  { code: "JA", name: "Japanese", localName: "日本語", flag: "jp" },
  { code: "KO", name: "Korean", localName: "한국어", flag: "kr" },
  { code: "PT", name: "Portuguese", localName: "Português", flag: "pt" },
  { code: "RU", name: "Russian", localName: "Русский", flag: "ru" },
  { code: "ZH-CN", name: "Chinese", localName: "中文", flag: "cn" },
  { code: "TH", name: "Thai", localName: "ไทย", flag: "th" },
  { code: "NL", name: "Dutch", localName: "Nederlands", flag: "nl" },
  { code: "SV", name: "Swedish", localName: "Svenska", flag: "se" },
  { code: "NO", name: "Norwegian", localName: "Norsk", flag: "no" },
  { code: "FI", name: "Finnish", localName: "Suomi", flag: "fi" },
  { code: "DA", name: "Danish", localName: "Dansk", flag: "dk" },
  { code: "TR", name: "Turkish", localName: "Türkçe", flag: "tr" },
  { code: "VI", name: "Vietnamese", localName: "Tiếng Việt", flag: "vn" },
  { code: "ID", name: "Indonesian", localName: "Bahasa Indonesia", flag: "id" },
  { code: "PL", name: "Polish", localName: "Polski", flag: "pl" },
  { code: "EL", name: "Greek", localName: "Ελληνικά", flag: "gr" },
  { code: "HE", name: "Hebrew", localName: "עברית", flag: "il" },
  { code: "UK", name: "Ukrainian", localName: "Українська", flag: "ua" },
  { code: "BN", name: "Bengali", localName: "বাংলা", flag: "bd" }
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
                <div className="flex items-center gap-3">
                  <span className={`fi fi-${l.flag} text-3xl rounded-sm`}></span>
                  <div className="flex flex-col items-start">
                    <span className={"font-black text-lg " + (isActive ? "text-[#673AB7]" : "text-gray-800")}>{l.localName}</span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">{l.name}</span>
                  </div>
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
