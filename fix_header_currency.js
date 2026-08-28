const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf-8');

if(!code.includes('import CurrencyModal')) {
    code = code.replace(
        "import { Globe, CircleDollarSign, Menu, X, Check, FileText, Anchor } from 'lucide-react';",
        "import { Globe, CircleDollarSign, Menu, X, Check, FileText, Anchor } from 'lucide-react';\nimport CurrencyModal from './CurrencyModal';"
    );
}

// Remove the inline mobile currency dropdown
code = code.replace(
    /\{showCurrency && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/,
    ""
);

// Remove the inline desktop currency dropdown
code = code.replace(
    /\{showCurrency && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/,
    ""
);

if(!code.includes('<CurrencyModal')) {
    code = code.replace(
        "return (",
        "return (\n    <>\n      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />"
    );
    
    // Now add </> at the very end of the file before the final parenthesis.
    const lastParenIndex = code.lastIndexOf(');');
    code = code.substring(0, lastParenIndex) + "\n    </>\n  " + code.substring(lastParenIndex);
}

fs.writeFileSync('src/components/Header.tsx', code);
console.log('Header.tsx currency updated');
