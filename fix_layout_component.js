const fs = require("fs");
let layout = fs.readFileSync("src/app/layout.tsx", "utf8");

// Remove inline scripts
layout = layout.replace(/<div id="google_translate_element" style=\{\{ display: "none" \}\}><\/div>[\s\S]*?<script src="https:\/\/translate\.google\.com\/translate_a\/element\.js\?cb=googleTranslateElementInit" async defer><\/script>/m, "<GoogleTranslate />");

if (!layout.includes("import GoogleTranslate")) {
  layout = layout.replace("import VisitTracker from \"@/components/VisitTracker\";", "import VisitTracker from \"@/components/VisitTracker\";\nimport GoogleTranslate from \"@/components/GoogleTranslate\";");
}

fs.writeFileSync("src/app/layout.tsx", layout, "utf8");

