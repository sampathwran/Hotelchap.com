const fs = require("fs");
function fixTs(filePath) {
  let code = fs.readFileSync(filePath, "utf-8");
  code = code.replace("const getCurrencySymbol = (code) =>", "const getCurrencySymbol = (code: string) =>");
  fs.writeFileSync(filePath, code);
}
fixTs("src/app/search/page.tsx");
fixTs("src/app/hotel/[id]/page.tsx");

