const fs = require("fs");
let code = fs.readFileSync("src/components/PopularDestinations.tsx", "utf8");
code = code.replace(/import\('@\/lib\/analytics'\)\.then\(m => m\.trackEvent\('dest_click', \{ dest: dest\.name \}\)\);/, 
  "import('@/lib/analytics').then(m => m.trackEvent('dest_click'));");
fs.writeFileSync("src/components/PopularDestinations.tsx", code, "utf8");

