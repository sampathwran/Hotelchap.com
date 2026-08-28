const fs = require('fs');

function processFile(path) {
    let code = fs.readFileSync(path, 'utf-8');

    // Add import
    if(!code.includes('import CurrencyModal')) {
        code = code.replace(
            "from 'lucide-react';",
            "from 'lucide-react';\nimport CurrencyModal from '../components/CurrencyModal';"
        );
        // Header.tsx uses different import depth
        code = code.replace(
            "import CurrencyModal from '../components/CurrencyModal';\nimport CurrencyModal from '../components/CurrencyModal';",
            "import CurrencyModal from '../components/CurrencyModal';"
        );
    }

    // Remove old mobile dropdown
    code = code.replace(
        /\{showCurrency && \([\s\S]*?<div className="absolute top-8 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/,
        ""
    );

    // Remove old desktop dropdown
    code = code.replace(
        /\{showCurrency && \([\s\S]*?<div className="absolute top-10 right-0 w-32[\s\S]*?<\/div>[\s\S]*?\)\}/,
        ""
    );

    // Insert CurrencyModal at the end of the return statement before the final </div>
    if(!code.includes('<CurrencyModal')) {
        code = code.replace(
            /(MegaFooter \/>\s*|\{showLanguage && \([\s\S]*?<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/header>\s*)<\/div>\s*\);\s*\}/,
            "\  <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />\n    </div>\n  );\n}"
        );
        
        // Header fallback
        if(!code.includes('<CurrencyModal')) {
             code = code.replace(
                /<\/header>\s*\);\s*\}/,
                "  <CurrencyModal isOpen={showCurrency} onClose={() => setShowCurrency(false)} currentCurrency={currency} onSelect={(c) => { setCurrency(c); setShowCurrency(false); }} />\n    </header>\n  );\n}"
             );
        }
    }
    
    // Fix Header.tsx import path
    if(path === 'src/components/Header.tsx') {
        code = code.replace("import CurrencyModal from '../components/CurrencyModal';", "import CurrencyModal from './CurrencyModal';");
    }

    fs.writeFileSync(path, code);
    console.log(path + ' updated');
}

processFile('src/app/page.tsx');
processFile('src/components/Header.tsx');
