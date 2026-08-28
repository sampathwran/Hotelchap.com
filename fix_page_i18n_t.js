const fs = require("fs");
let code = fs.readFileSync("src/app/page.tsx", "utf-8");

if (!code.includes("const { t } = useTranslation();")) {
  code = code.replace("export default function Home() {", "export default function Home() {\n  const { t } = useTranslation();");
  fs.writeFileSync("src/app/page.tsx", code);
}

