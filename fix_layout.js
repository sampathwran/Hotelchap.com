const fs = require("fs");
let code = fs.readFileSync("src/app/layout.tsx", "utf8");

const scriptInjection = `
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Script id="google-translate-init" strategy="beforeInteractive">
          {\`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          \`}
        </Script>
        <Script id="google-translate-script" strategy="beforeInteractive" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
`;

code = code.replace('<body className="min-h-full flex flex-col bg-sky-50 text-gray-900">', '<body className="min-h-full flex flex-col bg-sky-50 text-gray-900">' + scriptInjection);

fs.writeFileSync("src/app/layout.tsx", code, "utf8");

let css = fs.readFileSync("src/app/globals.css", "utf8");
css += `\n
/* Google Translate Hiding Rules */
body { top: 0 !important; position: static !important; }
.skiptranslate { display: none !important; }
#goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
.goog-te-banner-frame.skiptranslate { display: none !important; }
.goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
`;
fs.writeFileSync("src/app/globals.css", css, "utf8");
