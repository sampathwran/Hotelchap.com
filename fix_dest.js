const fs = require("fs");
let code = fs.readFileSync("src/components/PopularDestinations.tsx", "utf8");
code = code.replace(
  /router\.push\(\`\/search\?dest=\\$\{encodeURIComponent\(cityName\)\}\`\);/g, 
  "router.push(\`/search?city=\${encodeURIComponent(cityName)}\`);"
);
fs.writeFileSync("src/components/PopularDestinations.tsx", code, "utf8");

