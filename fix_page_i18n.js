const fs = require("fs");
let code = fs.readFileSync("src/app/page.tsx", "utf-8");

// 1. Remove the old i18n constant entirely
code = code.replace(/const i18n: any = \{[\s\S]*?\};\s*/, "");
// Remove unused imports if any
if (!code.includes("import { useTranslation }")) {
  code = code.replace("import { useSettings }", "import { useTranslation } from \"@/lib/i18n\";\nimport { useSettings }");
}

// 2. Replace const t = i18n... with useTranslation
// Note: We might have `const { language } = useSettings();` already, so let us just find that.
code = code.replace(/const \{ currency, setCurrency, language, setLanguage \} = useSettings\(\);/, "const { currency, setCurrency, language, setLanguage } = useSettings();\n  const { t } = useTranslation();");
code = code.replace(/const t = i18n\[language\] \|\| i18n\["EN"\];/, "");

// 3. Fix t.key calls
code = code.replace(/t\.searchPlaceholder/g, "t(\"searchPlaceholder\")");
code = code.replace(/t\.signIn/g, "t(\"signIn\")");
code = code.replace(/t\.getApp/g, "t(\"getApp\")");
code = code.replace(/t\.listProperty/g, "t(\"listProperty\")");
code = code.replace(/t\.support/g, "t(\"support\")");
// also fix the tab titles: t[key]
code = code.replace(/t\[key\] \|\| key/g, "t(key)");

fs.writeFileSync("src/app/page.tsx", code);

