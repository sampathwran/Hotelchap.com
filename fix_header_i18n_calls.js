const fs = require("fs");
let code = fs.readFileSync("src/components/Header.tsx", "utf-8");

code = code.replace(/t\.searchPlaceholder/g, "t(\"searchPlaceholder\")");
code = code.replace(/t\.signIn/g, "t(\"signIn\")");
code = code.replace(/t\.getApp/g, "t(\"getApp\")");
code = code.replace(/t\.listProperty/g, "t(\"listProperty\")");
code = code.replace(/t\.support/g, "t(\"support\")");

fs.writeFileSync("src/components/Header.tsx", code);

