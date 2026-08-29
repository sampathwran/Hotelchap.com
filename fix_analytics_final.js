const fs = require("fs");
let code = fs.readFileSync("src/components/PopularDestinations.tsx", "utf8");
code = code.replace(/trackEvent\('dest_click'\)/g, "trackEvent('clicks')");
fs.writeFileSync("src/components/PopularDestinations.tsx", code, "utf8");
