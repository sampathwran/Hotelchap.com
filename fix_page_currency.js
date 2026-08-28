const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf-8');

if(!code.includes('import CurrencyModal')) {
    code = code.replace(
        "import { ChevronDown, MapPin, Calendar, Users, Search as SearchIcon, Globe, CircleDollarSign, Menu, X, ArrowRight, Star, Plane, Car, Map, Anchor, Package, Check, Phone, ArrowUpRight } from 'lucide-react';",
        "import { ChevronDown, MapPin, Calendar, Users, Search as SearchIcon, Globe, CircleDollarSign, Menu, X, ArrowRight, Star, Plane, Car, Map, Anchor, Package, Check, Phone, ArrowUpRight } from 'lucide-react';\nimport CurrencyModal from '../components/CurrencyModal';"
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

// Add the CurrencyModal near the end of the return statement (just before the last </div> or inside the top level)
if(!code.includes('<CurrencyModal')) {
    code = code.replace(
        "return (",
        "return (\n    <>\n      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={setCurrency} />"
    );
    // Since we added <> at the top, we need to add </> at the bottom
    // The easiest way is to wrap the whole return, but let's just insert it safely
    // Actually, page.tsx return already starts with a container. Let's just insert it after the very first tag.
    code = code.replace(
        "return (\n    <>\n      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={setCurrency} />",
        "return ("
    ); // revert the previous bad replace
    
    code = code.replace(
        "return (",
        "return (\n    <>\n      <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />"
    );
    
    // Now add </> at the very end of the file before the final parenthesis.
    const lastParenIndex = code.lastIndexOf(');');
    code = code.substring(0, lastParenIndex) + "\n    </>\n  " + code.substring(lastParenIndex);
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('page.tsx currency updated');
