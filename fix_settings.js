const fs = require("fs");
let code = fs.readFileSync("src/context/SettingsContext.tsx", "utf8");

code = code.replace(/const setLanguage = \(newLanguage: string\) => \{[\s\S]*?  \};/, `const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    localStorage.setItem("app_language", newLanguage);
    
    // Set Google Translate cookie
    const code = newLanguage.toLowerCase();
    if (code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
    } else {
      document.cookie = "googtrans=/auto/" + code + "; path=/;";
      document.cookie = "googtrans=/auto/" + code + "; domain=" + window.location.hostname + "; path=/;";
    }
    
    // Force reload to apply Google Translate to the whole DOM immediately
    window.location.reload();
  };`);

fs.writeFileSync("src/context/SettingsContext.tsx", code, "utf8");

