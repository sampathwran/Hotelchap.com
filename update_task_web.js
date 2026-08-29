const fs = require("fs");
let task = fs.readFileSync("C:/Users/Sampath/.gemini/antigravity/brain/75e770ca-33e0-497a-a26a-d59959ed9e4f/task.md", "utf8");
task = task.replace(/- \[ \] \*\*2. Update Web App \(Next.js\)\*\*/, "- [x] **2. Update Web App (Next.js)**");
task = task.replace(/- \[ \] Refactor \`src\/components\/PopularDestinations.tsx\`/g, "- [x] Refactor \`src/components/PopularDestinations.tsx\`");
task = task.replace(/- \[ \] Fetch both \`countries\` and \`cities\`/g, "- [x] Fetch both \`countries\` and \`cities\`");
task = task.replace(/- \[ \] Implement React Tab interface/g, "- [x] Implement React Tab interface");
task = task.replace(/- \[ \] Implement \*\*Countries UI\*\*/g, "- [x] Implement **Countries UI**");
task = task.replace(/- \[ \] Implement \*\*Cities UI\*\*/g, "- [x] Implement **Cities UI**");
fs.writeFileSync("C:/Users/Sampath/.gemini/antigravity/brain/75e770ca-33e0-497a-a26a-d59959ed9e4f/task.md", task, "utf8");

