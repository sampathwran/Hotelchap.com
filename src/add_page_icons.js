const fs = require('fs');
const file = 'C:/src/hotelchap-web/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('Globe, CircleDollarSign')) {
    content = content.replace('import { Car, MapPin, Calendar, Clock, User } from "lucide-react";', 'import { Car, MapPin, Calendar, Clock, User, Globe, CircleDollarSign } from "lucide-react";');
}

// Replace Currency button (Mobile)
content = content.replace(
    '{currency} <span className="text-[10px]">▼</span>',
    '<CircleDollarSign size={16} className="text-gray-500" /> {currency} <span className="text-[10px]">▼</span>'
);

// Replace Language button (Mobile)
content = content.replace(
    '{language} <span className="text-[10px]">▼</span>',
    '<Globe size={16} className="text-gray-500" /> {language} <span className="text-[10px]">▼</span>'
);

// Replace Currency button (Desktop)
content = content.replace(
    '{currency} <span className="text-xs">▼</span>',
    '<CircleDollarSign size={18} className="text-gray-500 mr-1" /> {currency} <span className="text-xs">▼</span>'
);

// Replace Language button (Desktop)
content = content.replace(
    '{language} <span className="text-xs">▼</span>',
    '<Globe size={18} className="text-gray-500 mr-1" /> {language} <span className="text-xs">▼</span>'
);

fs.writeFileSync(file, content, 'utf8');
console.log("page.tsx updated with icons");
