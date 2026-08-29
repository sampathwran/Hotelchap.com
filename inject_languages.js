const fs = require("fs");
const b64 = fs.readFileSync("encoded.txt", "utf8").trim();
const newContent = Buffer.from(b64, "base64").toString("utf8");
let code = fs.readFileSync("src/components/LanguageModal.tsx", "utf8");
code = code.replace(/export const allLanguages = \[\s*\{[\s\S]*?\}\s*\];/, newContent);
fs.writeFileSync("src/components/LanguageModal.tsx", code, "utf8");

