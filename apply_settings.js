const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf-8');
code = code.replace('import { useAuth } from "@/context/AuthContext";', 'import { useAuth } from "@/context/AuthContext";\nimport { useSettings } from "@/context/SettingsContext";');
code = code.replace(/const \[currency, setCurrency\] = useState(\"USD\");\s*const \[language, setLanguage\] = useState(\"EN\");/, 'const { currency, setCurrency, language, setLanguage } = useSettings();');
fs.writeFileSync('src/app/page.tsx', code);

let header = fs.readFileSync('src/components/Header.tsx', 'utf-8');
header = header.replace('import { useAuth } from "@/context/AuthContext";', 'import { useAuth } from "@/context/AuthContext";\n\nimport { useSettings } from "@/context/SettingsContext";');
header = header.replace(/const \[currency, setCurrency\] = useState(\"USD\");\\s*const \[language, setLanguage\] = useState(\"EN\");/, 'const { currency, setCurrency, language, setLanguage } = useSettings();');
fs.writeFileSync('src/components/Header.tsx', header);