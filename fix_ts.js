const fs = require("fs");
let code = fs.readFileSync("src/components/GoogleTranslate.tsx", "utf8");
code = code.replace("window.googleTranslateElementInit = () => {", "(window as any).googleTranslateElementInit = () => {");
fs.writeFileSync("src/components/GoogleTranslate.tsx", code, "utf8");

