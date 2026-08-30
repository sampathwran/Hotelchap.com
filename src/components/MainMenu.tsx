"use client";
import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 font-bold text-gray-800 drop-shadow-sm transition p-2 rounded-full hover:bg-gray-100/50 hover:text-[#673AB7]"
      >
        <Menu size={22} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
          <button className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#673AB7] transition">{t("getApp")}</button>
          <button className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#673AB7] transition">{t("listProperty")}</button>
          <div className="h-px bg-gray-100 my-1"></div>
          <button className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#673AB7] transition">{t("support")}</button>
        </div>
      )}
    </div>
  );
}
