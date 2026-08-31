const fs = require('fs');
const path = require('path');
const file = path.join('src', 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace mobile empty button
content = content.replace(/<button onClick=\{\(\) => setShowLogin\(true\)\} className="font-bold text-white bg-\[#673AB7\] px-3 py-1 rounded-full shadow-md text-xs ml-1 hover:bg-\[#522b94\] transition"><\/button>/, '<button onClick={() => setShowLogin(true)} className="font-bold text-white bg-[#673AB7] px-3 py-1.5 rounded-full shadow-md text-[10px] ml-1 hover:bg-[#522b94] transition whitespace-nowrap">Create Account / Sign In</button>');

// Replace desktop empty button
content = content.replace(/<button onClick=\{\(\) => setShowLogin\(true\)\} className="ml-2 font-semibold text-white bg-\[#673AB7\] px-6 py-2 rounded-full shadow-md hover:bg-\[#522b94\] transition"><\/button>/, '<button onClick={() => setShowLogin(true)} className="ml-2 font-semibold text-white bg-[#673AB7] px-6 py-2 rounded-full shadow-md hover:bg-[#522b94] transition whitespace-nowrap">Create Account / Sign In</button>');

// Update user fallback from email to displayName
content = content.replace(/\{user\.email\?\.charAt\(0\)\.toUpperCase\(\)\}/g, '{(user.displayName || user.email || "U").charAt(0).toUpperCase()}');

fs.writeFileSync(file, content, 'utf8');
