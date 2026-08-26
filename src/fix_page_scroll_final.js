const fs = require('fs');
const file = 'C:/src/hotelchap-web/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const hookLogic = `
  const [showTopNav, setShowTopNav] = useState(true);
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

content = content.replace('  const currentData = tabData[activeTab];', '  const currentData = tabData[activeTab];\n' + hookLogic);
fs.writeFileSync(file, content, 'utf8');
console.log("Success");
