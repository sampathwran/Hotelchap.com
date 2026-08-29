const fs = require("fs");
let layout = fs.readFileSync("src/app/layout.tsx", "utf8");

// Remove it from the top
layout = layout.replace(/<GoogleTranslate \/>\s*/, "");

// Add it inside SettingsProvider
layout = layout.replace("<SettingsProvider>", "<SettingsProvider>\n          <GoogleTranslate />");

fs.writeFileSync("src/app/layout.tsx", layout, "utf8");

