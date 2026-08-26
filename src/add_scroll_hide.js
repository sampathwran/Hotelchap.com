const fs = require('fs');

const hookLogic = `  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowTopNav(false);
        } else {
          setShowTopNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
`;

function addScrollLogic(filePath, isPage) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add useEffect to import
    if (content.includes('import { useState } from "react";')) {
        content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";');
    }

    // Add state and hook before return
    const returnStr = isPage ? '    const t = i18n[language] || i18n["EN"];\n\n    return (' : '  const t = i18n[language] || i18n["EN"];\n\n  return (';
    
    if (content.includes(returnStr) && !content.includes('showTopNav')) {
        content = content.replace(returnStr, hookLogic + '\n' + returnStr);
    }

    // Modify header className
    if (isPage) {
        content = content.replace(
            '<header className="w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0 relative">',
            '<header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0 relative transition-transform duration-300 ${showTopNav ? "translate-y-0" : "-translate-y-full"}`}>'
        );
    } else {
        content = content.replace(
            '<header className="w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0">',
            '<header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-0 md:px-8 md:h-20 bg-white shadow-sm z-[60] sticky top-0 gap-3 md:gap-0 transition-transform duration-300 ${showTopNav ? "translate-y-0" : "-translate-y-full"}`}>'
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated", filePath);
}

addScrollLogic('C:/src/hotelchap-web/src/components/Header.tsx', false);
addScrollLogic('C:/src/hotelchap-web/src/app/page.tsx', true);
