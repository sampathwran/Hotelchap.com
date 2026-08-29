const fs = require("fs");
let code = fs.readFileSync("src/components/PopularDestinations.tsx", "utf8");

if (!code.includes("useRouter")) {
  code = code.replace('import { useEffect, useState } from "react";', 'import { useEffect, useState } from "react";\nimport { useRouter } from "next/navigation";');
}

if (!code.includes("const router = useRouter()")) {
  code = code.replace(/export default function PopularDestinations\(\) \{/, "export default function PopularDestinations() {\n  const router = useRouter();");
}

code = code.replace(/onClick=\{\(\) => \{[\s\S]*?\}\}/, `onClick={() => {
                  import('@/lib/analytics').then(m => m.trackEvent('dest_click', { dest: dest.name }));
                  router.push(\`/search?dest=\${encodeURIComponent(dest.name)}\`);
                }}`);

fs.writeFileSync("src/components/PopularDestinations.tsx", code, "utf8");
