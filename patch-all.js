const fs = require('fs');
const path = require('path');
const si = require('./src/lib/dictionaries/SI.json');

const keys = Object.keys(si).filter(k => k.length > 3);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let modified = false;

  for (const key of keys) {
    const esc = escapeRegExp(key);
    
    // Check if key exists in the file before trying replacements
    if (!content.includes(key)) continue;

    modified = true;

    // >Text<
    const re1 = new RegExp(`>(\\s*)${esc}(\\s*)<`, 'g');
    content = content.replace(re1, `>$1{t("${key}")}$2<`);
    
    // "Text" inside objects/props where it might be e.g. title: "Text"
    const re2 = new RegExp(`title:\\s*"${esc}"`, 'g');
    content = content.replace(re2, `title: t("${key}")`);

    const re3 = new RegExp(`desc:\\s*"${esc}"`, 'g');
    content = content.replace(re3, `desc: t("${key}")`);

    const re4 = new RegExp(`name:\\s*"${esc}"`, 'g');
    content = content.replace(re4, `name: t("${key}")`);

    const re5 = new RegExp(`q:\\s*"${esc}"`, 'g');
    content = content.replace(re5, `q: t("${key}")`);

    const re6 = new RegExp(`a:\\s*"${esc}"`, 'g');
    content = content.replace(re6, `a: t("${key}")`);

    const re7 = new RegExp(`>${esc}</p>`, 'g');
    content = content.replace(re7, `>{t("${key}")}</p>`);
  }

  // Handle specific edge cases in JSX text
  if (content.includes('Protect Your Journey, <br className="hidden lg:block"/> Anywhere You Go.')) {
    content = content.replace(
      'Protect Your Journey, <br className="hidden lg:block"/> Anywhere You Go.',
      '{t("Protect Your Journey, Anywhere You Go.")}'
    );
    modified = true;
  }
  
  if (content.includes('Protect Your Journey, <br className="hidden lg:block"/> Anywhere You Go.')) {
      // just in case
  }

  if (modified && content !== originalContent) {
    if (!content.includes('useTranslation')) {
      if (content.includes('"use client";') || content.includes("'use client';")) {
        content = content.replace(/["']use client["'];\n?/, '"use client";\nimport { useTranslation } from "@/lib/i18n";\n');
      } else {
        content = '"use client";\nimport { useTranslation } from "@/lib/i18n";\n' + content;
      }
      
      content = content.replace(/export default function (\w+)\(\) \{/, match => match + '\n  const { t } = useTranslation();');
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Patched', file);
  }
}

processDir('src/app');
processDir('src/components');
