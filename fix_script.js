const fs = require("fs");
let layout = fs.readFileSync("src/app/layout.tsx", "utf8");

layout = layout.replace(/<Script id="google-translate-init"[\s\S]*?<\/Script>/, `<script dangerouslySetInnerHTML={{ __html: \`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          \`}} />`);

layout = layout.replace(/<Script id="google-translate-script"[\s\S]*?\/>/, `<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>`);

fs.writeFileSync("src/app/layout.tsx", layout, "utf8");
