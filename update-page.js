const fs = require('fs');
const path = require('path');
const file = path.join('src', 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace('import LanguageModal from "@/components/LanguageModal";', 'import LanguageModal from "@/components/LanguageModal";\nimport LoginModal from "@/components/LoginModal";');

// Add state
content = content.replace('const [showCurrency, setShowCurrency] = useState(false);', 'const [showCurrency, setShowCurrency] = useState(false);\n  const [showLogin, setShowLogin] = useState(false);');

// Replace mobile login link
content = content.replace(/<Link href="\/login" className="font-bold text-white bg-\[#673AB7\] px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-\[#522b94\] transition">([\s\S]*?)<\/Link>/, '<button onClick={() => setShowLogin(true)} className="font-bold text-white bg-[#673AB7] px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-[#522b94] transition"></button>');

// Replace desktop login link
content = content.replace(/<Link href="\/login" className="ml-2 font-semibold text-white bg-\[#673AB7\] px-6 py-2 rounded-full shadow-md hover:bg-\[#522b94\] transition">([\s\S]*?)<\/Link>/, '<button onClick={() => setShowLogin(true)} className="ml-2 font-semibold text-white bg-[#673AB7] px-6 py-2 rounded-full shadow-md hover:bg-[#522b94] transition"></button>');

// Add LoginModal component
content = content.replace(/<LanguageModal/, '<LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />\n      <LanguageModal');

fs.writeFileSync(file, content, 'utf8');
