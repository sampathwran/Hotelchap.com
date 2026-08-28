const fs = require('fs');
let code = fs.readFileSync('src/app/search/page.tsx', 'utf-8');
code = code.replace('import { Suspense, useState, useMemo, useEffect } from "react";', 'import { Suspense, useState, useMemo, useEffect } from "react";\nimport { useSettings } from "@/context/SettingsContext";');
code = code.replace(/const \[selectedFilters, setSelectedFilters\] = useState<string\\[\]>(\[\]);/, 'const { currency } = useSettings();\n  const [activeCurrency, setActiveCurrency] = useState(currency);\n  useEffect(() => { setActiveCurrency(currency); }, [currency]);\n  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);');
code = code.replace(/\/api\/hotels\/search\?city=\${destination}&checkin=\${checkin}&checkout=\${checkout}/, '/api/hotels/search?city=${destination}&checkin=${checkin}&checkout=${checkout}&currency=${activeCurrency}');
code = code.replace(/\[maxPrice, selectedFilters\]);/, '[maxPrice, selectedFilters, activeCurrency]);');
fs.writeFileSync('src/app/search/page.tsx', code);