const fs = require('fs');

const file = 'C:/src/hotelchap-web/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const hookLogic = `  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowTopNav(false);
        } else {
          setShowTopNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

`;

if (!content.includes('const [showTopNav')) {
    content = content.replace(
        '  return (\n      <div className="flex flex-col min-h-screen bg-[#f5f5f5]">',
        hookLogic + '  return (\n      <div className="flex flex-col min-h-screen bg-[#f5f5f5]">'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed page.tsx");
} else {
    console.log("Already has showTopNav");
}
