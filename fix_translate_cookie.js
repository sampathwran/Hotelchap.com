const fs = require("fs");

let settings = fs.readFileSync("src/context/SettingsContext.tsx", "utf8");
settings = settings.replace(/\/auto\//g, "/en/");
fs.writeFileSync("src/context/SettingsContext.tsx", settings, "utf8");

let layout = fs.readFileSync("src/app/layout.tsx", "utf8");
layout = layout.replace("function googleTranslateElementInit() {", "window.googleTranslateElementInit = function() {");
fs.writeFileSync("src/app/layout.tsx", layout, "utf8");

