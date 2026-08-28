const fs = require("fs");
let code = fs.readFileSync("src/components/Header.tsx", "utf-8");

// 1. Remove the old i18n constant entirely
code = code.replace(/const i18n: any = \{[\s\S]*?\};\s*(const currencies = [^\n]*\n)*(const languages = [^\n]*\n)*/, "");
// Remove unused imports if any
if (!code.includes("import { useTranslation }")) {
  code = code.replace("import { useSettings }", "import { useTranslation } from \"@/lib/i18n\";\nimport { useSettings }");
}

// 2. Replace const t = i18n... with useTranslation
code = code.replace(/const t = i18n\[language\] \|\| i18n\["EN"\];/, "const { t } = useTranslation();");

fs.writeFileSync("src/components/Header.tsx", code);

