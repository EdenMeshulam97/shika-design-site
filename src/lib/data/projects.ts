export interface Project {
  slug: string;
  category: "residential" | "commercial" | "hospitality";
  year: string;
  location: {
    en: string;
    he: string;
    ar: string;
  };
  area: string;
  duration: {
    en: string;
    he: string;
    ar: string;
  };
  title: {
    en: string;
    he: string;
    ar: string;
  };
  description: {
    en: string;
    he: string;
    ar: string;
  };
  scope: {
    en: string;
    he: string;
    ar: string;
  };
  thumbnail: string;
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "modern-tel-aviv-penthouse",
    category: "residential",
    year: "2024",
    location: { en: "Tel Aviv, Israel", he: "תל אביב, ישראל", ar: "تل أبيب، إسرائيل" },
    area: "220 m²",
    duration: { en: "8 months", he: "8 חודשים", ar: "8 أشهر" },
    title: {
      en: "Modern Tel Aviv Penthouse",
      he: "פנטהאוז מודרני בתל אביב",
      ar: "بنتهاوس حديث في تل أبيب",
    },
    description: {
      en: "A luxurious penthouse overlooking the Mediterranean, designed with a seamless blend of contemporary minimalism and warm natural materials. Floor-to-ceiling windows flood the space with light, while custom furnishings create intimate moments throughout.",
      he: "פנטהאוז יוקרתי עם נוף לים התיכון, מעוצב בשילוב חלק של מינימליזם עכשווי וחומרים טבעיים חמים. חלונות מהרצפה עד התקרה מציפים את החלל באור, בעוד ריהוט מותאם אישית יוצר רגעים אינטימיים.",
      ar: "بنتهاوس فاخر يطل على البحر الأبيض المتوسط، مصمم بمزيج سلس من البساطة المعاصرة والمواد الطبيعية الدافئة.",
    },
    scope: {
      en: "Full interior design, custom furniture, lighting design",
      he: "עיצוב פנים מלא, ריהוט מותאם אישית, עיצוב תאורה",
      ar: "تصميم داخلي كامل، أثاث مخصص، تصميم إضاءة",
    },
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "serene-jaffa-apartment",
    category: "residential",
    year: "2024",
    location: { en: "Jaffa, Israel", he: "יפו, ישראל", ar: "يافا، إسرائيل" },
    area: "140 m²",
    duration: { en: "6 months", he: "6 חודשים", ar: "6 أشهر" },
    title: {
      en: "Serene Jaffa Apartment",
      he: "דירה שלווה ביפו",
      ar: "شقة هادئة في يافا",
    },
    description: {
      en: "A historic Jaffa apartment transformed into a serene modern retreat. Original stone walls meet contemporary design elements, creating a dialogue between old and new that honors the building's rich history.",
      he: "דירה היסטורית ביפו שהפכה למפלט מודרני שליו. קירות אבן מקוריים פוגשים אלמנטים עיצוביים עכשוויים, ויוצרים דיאלוג בין ישן לחדש שמכבד את ההיסטוריה העשירה של הבניין.",
      ar: "شقة تاريخية في يافا تحولت إلى ملاذ حديث هادئ. الجدران الحجرية الأصلية تلتقي بعناصر التصميم المعاصر.",
    },
    scope: {
      en: "Renovation, interior design, art curation",
      he: "שיפוץ, עיצוב פנים, אוצרות אמנות",
      ar: "تجديد، تصميم داخلي، تنسيق فني",
    },
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "boutique-hotel-lobby",
    category: "hospitality",
    year: "2023",
    location: { en: "Haifa, Israel", he: "חיפה, ישראל", ar: "حيفا، إسرائيل" },
    area: "350 m²",
    duration: { en: "12 months", he: "12 חודשים", ar: "12 شهراً" },
    title: {
      en: "Boutique Hotel Lobby",
      he: "לובי מלון בוטיק",
      ar: "بهو فندق بوتيكي",
    },
    description: {
      en: "A welcoming hotel lobby that sets the tone for an unforgettable stay. Rich textures, warm lighting, and curated art pieces create an atmosphere of refined hospitality that reflects the local culture.",
      he: "לובי מלון מזמין שקובע את הטון לשהייה בלתי נשכחת. מרקמים עשירים, תאורה חמה ופריטי אמנות אצורים יוצרים אווירה של אירוח מעודן המשקף את התרבות המקומית.",
      ar: "بهو فندق ترحيبي يضبط نغمة إقامة لا تُنسى. الأنسجة الغنية والإضاءة الدافئة وقطع الفن المنسقة.",
    },
    scope: {
      en: "Interior design, furniture design, lighting concept",
      he: "עיצוב פנים, עיצוב רהיטים, קונספט תאורה",
      ar: "تصميم داخلي، تصميم أثاث، مفهوم إضاءة",
    },
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "minimalist-workspace",
    category: "commercial",
    year: "2023",
    location: { en: "Herzliya, Israel", he: "הרצליה, ישראל", ar: "هرتسليا، إسرائيل" },
    area: "500 m²",
    duration: { en: "10 months", he: "10 חודשים", ar: "10 أشهر" },
    title: {
      en: "Minimalist Tech Workspace",
      he: "מרחב עבודה טכנולוגי מינימליסטי",
      ar: "مساحة عمل تقنية بسيطة",
    },
    description: {
      en: "A modern workspace designed for a tech startup, balancing collaborative open areas with private focus zones. Natural materials and biophilic design elements promote wellbeing and productivity.",
      he: "מרחב עבודה מודרני שתוכנן עבור סטארט-אפ טכנולוגי, המאזן בין אזורים פתוחים לשיתוף פעולה לבין אזורי מיקוד פרטיים. חומרים טבעיים ואלמנטים עיצוביים ביופיליים מקדמים רווחה ופרודוקטיביות.",
      ar: "مساحة عمل حديثة مصممة لشركة تقنية ناشئة، تحقق التوازن بين المناطق المفتوحة التعاونية ومناطق التركيز الخاصة.",
    },
    scope: {
      en: "Space planning, interior design, acoustic solutions",
      he: "תכנון מרחב, עיצוב פנים, פתרונות אקוסטיים",
      ar: "تخطيط المساحة، تصميم داخلي، حلول صوتية",
    },
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
    ],
    featured: false,
  },
  {
    slug: "coastal-villa-caesarea",
    category: "residential",
    year: "2023",
    location: { en: "Caesarea, Israel", he: "קיסריה, ישראל", ar: "قيسارية، إسرائيل" },
    area: "380 m²",
    duration: { en: "14 months", he: "14 חודשים", ar: "14 شهراً" },
    title: {
      en: "Coastal Villa in Caesarea",
      he: "וילה חופית בקיסריה",
      ar: "فيلا ساحلية في قيسارية",
    },
    description: {
      en: "A stunning coastal villa that embraces its seaside setting. The design captures the essence of Mediterranean living with airy spaces, natural stone, and a palette inspired by sea and sand.",
      he: "וילה חופית מרהיבה שמחבקת את סביבתה הימית. העיצוב לוכד את מהות החיים הים-תיכוניים עם חללים אוורירים, אבן טבעית ופלטה בהשראת ים וחול.",
      ar: "فيلا ساحلية مذهلة تحتضن موقعها البحري. يلتقط التصميم جوهر الحياة المتوسطية مع مساحات جيدة التهوية وحجر طبيعي.",
    },
    scope: {
      en: "Full design, landscape coordination, custom millwork",
      he: "עיצוב מלא, תיאום נוף, נגרות מותאמת אישית",
      ar: "تصميم كامل، تنسيق المناظر الطبيعية، نجارة مخصصة",
    },
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "urban-restaurant-concept",
    category: "hospitality",
    year: "2022",
    location: { en: "Jerusalem, Israel", he: "ירושלים, ישראל", ar: "القدس، إسرائيل" },
    area: "180 m²",
    duration: { en: "7 months", he: "7 חודשים", ar: "7 أشهر" },
    title: {
      en: "Urban Restaurant Concept",
      he: "קונספט מסעדה אורבני",
      ar: "مفهوم مطعم حضري",
    },
    description: {
      en: "An intimate restaurant that tells the story of Jerusalem through design. Local materials, artisan craftsmanship, and a warm atmosphere create a dining experience that connects guests to the city's rich heritage.",
      he: "מסעדה אינטימית שמספרת את סיפורה של ירושלים דרך עיצוב. חומרים מקומיים, אומנות אומנים ואווירה חמה יוצרים חוויית אוכל שמחברת את האורחים למורשת העשירה של העיר.",
      ar: "مطعم حميم يروي قصة القدس من خلال التصميم. المواد المحلية والحرفية والأجواء الدافئة تخلق تجربة طعام فريدة.",
    },
    scope: {
      en: "Concept design, interior design, branding integration",
      he: "עיצוב קונספט, עיצוב פנים, שילוב מיתוג",
      ar: "تصميم المفهوم، تصميم داخلي، تكامل العلامة التجارية",
    },
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80",
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
