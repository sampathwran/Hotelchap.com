import json
import codecs

with codecs.open('C:/src/hotelchap-web/src/app/page.tsx', 'r', 'utf-8') as f:
    content = f.read()

new_tabs = """
  packages: {
    id: "packages",
    title: { EN: "Save more with", SI: "වැඩිපුර ඉතුරු කරන්න", TA: "மேலும் சேமிக்கவும்" },
    subtitle: { EN: "Flight + Hotel Packages", SI: "ගුවන් ගමන් සහ හෝටල් පැකේජ", TA: "விமானம் + ஹோட்டல் தொகுப்புகள்" },
    gradientText: { EN: "combo deals.", SI: "එකට ගෙන ඉතුරු කරන්න.", TA: "ஒருங்கிணைந்த சலுகைகள்." },
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Packages Widget Goes Here", SI: "පැකේජ සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "தொகுப்பு விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["💼 Bundle & Save", "🔒 Secure Booking"], SI: ["💼 පැකේජ වලින් ලාභයි", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["💼 தொகுப்பு & சேமி", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  transfers: {
    id: "transfers",
    title: { EN: "Hassle-free", SI: "කරදරයක් නැතිව ගමන", TA: "எளிதான பயணம்" },
    subtitle: { EN: "Airport Transfers", SI: "ගුවන් තොටුපල ප්‍රවාහනය", TA: "விமான நிலைய பரிமாற்றங்கள்" },
    gradientText: { EN: "straight to your door.", SI: "ඔබේ දොරකඩටම.", TA: "உங்கள் வாசலுக்கு." },
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Transfer Widget Goes Here", SI: "ප්‍රවාහන සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "பரிமாற்ற விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🚕 Professional Drivers", "🔒 Secure Booking"], SI: ["🚕 සුපිරි රියදුරන්", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🚕 தொழில்முறை ஓட்டுநர்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  attractions: {
    id: "attractions",
    title: { EN: "Discover top", SI: "අලුත් තැන් හොයාගන්න", TA: "சிறந்த இடங்களை கண்டறியுங்கள்" },
    subtitle: { EN: "Attractions & Tours", SI: "නැරඹුම් ස්ථාන සහ චාරිකා", TA: "ஈர்ப்புகள் மற்றும் சுற்றுப்பயணங்கள்" },
    gradientText: { EN: "experiences globally.", SI: "ලෝකේ වටේ යන්න.", TA: "உலகளாவிய அனுபவங்கள்." },
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Attractions Widget Goes Here", SI: "චාරිකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "சுற்றுப்பயண விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🎟️ Skip the Line", "🔒 Secure Booking"], SI: ["🎟️ පෝලිම් නැතිව යන්න", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🎟️ வரிசையை தவிர்க்கவும்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  },
  cruises: {
    id: "cruises",
    title: { EN: "Sail away on", SI: "මුහුදේ යන්න", TA: "பயணம் செய்யுங்கள்" },
    subtitle: { EN: "Luxury Cruises", SI: "සුඛෝපභෝගී නෞකා", TA: "சொகுசு கப்பல்கள்" },
    gradientText: { EN: "an ocean adventure.", SI: "මුහුදු චාරිකාවක්.", TA: "ஒரு கடல் சாகசம்." },
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop",
    formPlaceholder: { EN: "Travelpayouts Cruises Widget Goes Here", SI: "නෞකා සෙවීමේ Widget එක මෙහි පැමිණේ", TA: "கப்பல் விட்ஜெட் இங்கே வரும்" },
    badges: { EN: ["🛳️ Top Cruise Lines", "🔒 Secure Booking"], SI: ["🛳️ සුපිරි නෞකා", "🔒 ආරක්ෂිත වෙන්කිරීම්"], TA: ["🛳️ சிறந்த கப்பல்கள்", "🔒 பாதுகாப்பான முன்பதிவு"] }
  }
"""

tab_data_end = content.find("const translations: any = {")
if tab_data_end != -1:
    before = content[:tab_data_end]
    last_brace = before.rfind("}")
    second_last = before.rfind("}", 0, last_brace)
    new_content = content[:second_last+1] + ",\n" + new_tabs + content[second_last+1:]
    
    with codecs.open('C:/src/hotelchap-web/src/app/page.tsx', 'w', 'utf-8') as f:
        f.write(new_content)
    print("Done")
else:
    print("Failed")
