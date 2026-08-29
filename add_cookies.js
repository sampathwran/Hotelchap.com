const fs = require("fs");
let code = fs.readFileSync("src/context/SettingsContext.tsx", "utf8");

code = code.replace(/document\.cookie = "googtrans=\/en\/" \+ code \+ "; path=\/;";/g, 
`document.cookie = "googtrans=/en/" + code + "; path=/;";\n      document.cookie = "googtrans=/auto/" + code + "; path=/;";`);
code = code.replace(/document\.cookie = "googtrans=\/en\/" \+ code \+ "; domain=" \+ window\.location\.hostname \+ "; path=\/;";/g, 
`document.cookie = "googtrans=/en/" + code + "; domain=" + window.location.hostname + "; path=/;";\n      document.cookie = "googtrans=/auto/" + code + "; domain=" + window.location.hostname + "; path=/;";`);

fs.writeFileSync("src/context/SettingsContext.tsx", code, "utf8");

