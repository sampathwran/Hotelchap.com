const fs = require('fs');
const file = 'C:/src/hotelchap-web/src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('GoogleOAuthProvider')) {
    content = content.replace(
        'import { AuthProvider } from "@/context/AuthContext";',
        'import { AuthProvider } from "@/context/AuthContext";\nimport { GoogleOAuthProvider } from "@react-oauth/google";\nimport GoogleOneTap from "@/components/GoogleOneTap";'
    );
}

const authProviderStart = content.indexOf('<AuthProvider>');
const authProviderEnd = content.indexOf('</AuthProvider>') + '</AuthProvider>'.length;

if (authProviderStart !== -1 && !content.includes('<GoogleOAuthProvider')) {
    const authProviderBlock = content.substring(authProviderStart, authProviderEnd);
    const updatedAuthProviderBlock = authProviderBlock.replace(
        '{children}',
        '<GoogleOneTap />\n          {children}'
    );
    
    const wrapper = 
        '<GoogleOAuthProvider clientId="649987888032-d8lsvr95s08c6cp176qegn0vcu2g49qe.apps.googleusercontent.com">\n        ' + 
        updatedAuthProviderBlock + 
        '\n        </GoogleOAuthProvider>';
    
    content = content.substring(0, authProviderStart) + wrapper + content.substring(authProviderEnd);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated layout.tsx for Google One Tap");
} else {
    console.log("Could not update layout.tsx");
}
