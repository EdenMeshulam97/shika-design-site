import imageSizes from "./image-sizes.json";

export interface Project {
  slug: string;
  category: "residential" | "commercial" | "hospitality";
  year?: string;
  location?: {
    en: string;
    he: string;
    ar: string;
  };
  area?: string;
  duration?: {
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

// Images live in public/images/projects/<slug>/NN.jpg (see image-sizes.json for the full list).
// `lead` images are shown first (the first one is the hero), followed by the rest in order.
function gallery(slug: string, lead: number[] = []): string[] {
  const all = Object.keys(imageSizes).filter((src) => src.startsWith(`/images/projects/${slug}/`)).sort();
  const leading = lead.map((n) => image(slug, n));
  return [...leading, ...all.filter((src) => !leading.includes(src))];
}

function image(slug: string, n: number): string {
  return `/images/projects/${slug}/${String(n).padStart(2, "0")}.jpg`;
}

export const projects: Project[] = [
  {
    slug: "na-project",
    category: "residential",
    location: { en: "Lod, Israel", he: "לוד, ישראל", ar: "اللد" },
    title: {
      en: "N&A Residence",
      he: "בית N&A",
      ar: "منزل N&A",
    },
    description: {
      en: "A family home in Lod where light is treated as a material. Backlit onyx wraps the kitchen island and the floating media bench, bronze-glass fins divide living and dining, and a gently curved wall softens the open plan. Upstairs, the master suite opens onto a glass-walled walk-in closet and an ensuite clad in bold violet-veined marble, while the children's rooms play with rounded niches, soft pastels and warm oak. A lower-level lounge with its own kitchenette completes a home that feels both glamorous and easy to live in.",
      he: "בית משפחתי בלוד שבו האור מטופל כחומר לכל דבר. אוניקס מואר עוטף את האי במטבח ואת ספסל המדיה הצף, פינים מזכוכית ברונזה מפרידים בין הסלון לפינת האוכל, וקיר מעוגל מרכך את החלל הפתוח. בקומה העליונה, סוויטת ההורים נפתחת לחדר ארונות עם קירות זכוכית ולחדר רחצה מחופה שיש עם עורקים סגולים דרמטיים, וחדרי הילדים משחקים עם נישות עגולות, גווני פסטל רכים ועץ אלון חם. טרקלין בקומה התחתונה עם מטבחון משלים בית שמרגיש זוהר ונוח לחיים בעת ובעונה אחת.",
      ar: "منزل عائلي في اللد يُعامَل فيه الضوء كمادة بحد ذاتها. يلتف الأونيكس المضاء من الخلف حول جزيرة المطبخ ومقعد التلفاز العائم، وتفصل ألواح زجاجية برونزية بين الصالون وغرفة الطعام، بينما يليّن جدار منحني المساحة المفتوحة. في الطابق العلوي، يُفتح الجناح الرئيسي على غرفة ملابس بجدران زجاجية وحمام مكسو برخام ذي عروق بنفسجية جريئة، وتلعب غرف الأطفال بالكوّات الدائرية وألوان الباستيل الناعمة وخشب البلوط الدافئ. وتكمل صالة في الطابق السفلي مع مطبخ صغير منزلاً يجمع بين الفخامة وسهولة العيش.",
    },
    scope: {
      en: "Full interior design, custom millwork, lighting design, furniture selection",
      he: "עיצוב פנים מלא, נגרות בהתאמה אישית, עיצוב תאורה, בחירת ריהוט",
      ar: "تصميم داخلي كامل، نجارة مخصصة، تصميم إضاءة، اختيار الأثاث",
    },
    thumbnail: image("na-project", 7),
    images: gallery("na-project", [45, 7, 11, 4, 8, 10]),
    featured: true,
  },
  {
    slug: "ma-project",
    category: "residential",
    location: { en: "Kafr Qasim, Israel", he: "כפר קאסם, ישראל", ar: "كفر قاسم" },
    title: {
      en: "M&A Residence",
      he: "בית M&A",
      ar: "منزل M&A",
    },
    description: {
      en: "A two-storey family home in Kafr Qasim designed around calm, light and restraint. Soft white walls and sheer curtains meet bouclé seating, smoked-glass tables and travertine-toned surfaces, while black track lighting and a slatted steel stair screen add crisp graphic lines. The kitchen pairs warm oak tall units with a sculptural island and a cylindrical black hood, and the dining nook is built around a glass-topped stone table. Bathrooms continue the quiet palette in stone-look porcelain, oval backlit mirrors and monolithic basins.",
      he: "בית משפחתי דו-קומתי בכפר קאסם שתוכנן סביב שקט, אור ואיפוק. קירות לבנים רכים ווילונות שקופים פוגשים ריהוט בוקלה, שולחנות מזכוכית מעושנת ומשטחים בגווני טרוורטין, בעוד תאורת מסילה שחורה ומחיצת מדרגות מפלדה מוסיפות קווים גרפיים חדים. המטבח משלב ארונות גבוהים מעץ אלון חם עם אי פיסולי וקולט אדים גלילי שחור, ופינת האוכל נבנתה סביב שולחן אבן עם משטח זכוכית. חדרי הרחצה ממשיכים את הפלטה השקטה עם פורצלן בדמוי אבן, מראות אובליות מוארות וכיורים מונוליטיים.",
      ar: "منزل عائلي من طابقين في كفر قاسم صُمّم حول الهدوء والضوء والبساطة. تلتقي الجدران البيضاء الناعمة والستائر الشفافة بمقاعد البوكليه والطاولات من الزجاج المدخّن والأسطح بدرجات الترافرتين، بينما تضيف الإضاءة السوداء على المسارات وحاجز الدرج من الفولاذ خطوطاً واضحة. يجمع المطبخ بين خزائن طويلة من خشب البلوط الدافئ وجزيرة منحوتة وشفّاط أسطواني أسود، وتتمحور زاوية الطعام حول طاولة حجرية بسطح زجاجي. وتواصل الحمامات اللوحة الهادئة ببورسلين يحاكي الحجر ومرايا بيضاوية مضاءة وأحواض متجانسة.",
    },
    scope: {
      en: "Full interior design, kitchen and millwork design, lighting design, styling",
      he: "עיצוב פנים מלא, תכנון מטבח ונגרות, עיצוב תאורה, סטיילינג",
      ar: "تصميم داخلي كامل، تصميم المطبخ والنجارة، تصميم إضاءة، تنسيق",
    },
    thumbnail: image("ma-project", 2),
    images: gallery("ma-project", [10, 2, 14, 5, 15, 22]),
    featured: true,
  },
  {
    slug: "bridal-salon",
    category: "commercial",
    title: {
      en: "Veloura Bridal Salon",
      he: "סלון הכלות Veloura",
      ar: "صالون Veloura للعرائس",
    },
    description: {
      en: "A bridal salon designed as one serene, softly lit world. A textured plaster reception desk, washed in up-light, sits beneath a cascade of white pendant tubes and is framed by arched black-glass openings bearing the Veloura name. The gown showroom flows around a central column, while sheer floor-to-ceiling curtains turn the arched windows and a circular fitting room into soft, glowing backdrops. Beyond the dresses, the salon includes a hair and makeup suite with arched backlit mirrors and a wash station set into a plaster niche, plus a treatment clinic marked by a halo-lit sign, all in the same palette of cream, stone and olive green.",
      he: "סלון כלות שעוצב כעולם אחד שליו ומואר ברכות. דלפק קבלה מטיח מרקמי, מואר מלמטה, ניצב מתחת למפל של צינורות תאורה לבנים וממוסגר בפתחים מקושתים מזכוכית שחורה הנושאים את השם Veloura. אולם השמלות זורם סביב עמוד מרכזי, ווילונות שקופים מהרצפה ועד התקרה הופכים את החלונות המקושתים ואת תא המדידה העגול לרקעים רכים וזוהרים. מעבר לשמלות, הסלון כולל עמדות שיער ואיפור עם מראות מקושתות מוארות ועמדת חפיפה בתוך נישת טיח, וחדר טיפולים המסומן בשלט עם הילת אור, כולם באותה פלטה של שמנת, אבן וירוק זית.",
      ar: "صالون عرائس صُمّم كعالم واحد هادئ بإضاءة ناعمة. يقف مكتب استقبال من الجص المحبّب، مضاء من الأسفل، تحت شلال من أنابيب الإضاءة البيضاء، وتؤطّره فتحات مقوّسة من الزجاج الأسود تحمل اسم Veloura. تنساب صالة الفساتين حول عمود مركزي، وتحوّل الستائر الشفافة الممتدة من الأرض حتى السقف النوافذَ المقوّسة وغرفة القياس الدائرية إلى خلفيات ناعمة متوهجة. وإلى جانب الفساتين، يضم الصالون ركناً لتصفيف الشعر والمكياج بمرايا مقوّسة مضاءة ومغسلة شعر داخل كوّة من الجص، وغرفة علاجات تميّزها لافتة بهالة من الضوء، وكلها بلوحة الألوان ذاتها من الكريمي والحجري والأخضر الزيتوني.",
    },
    scope: {
      en: "Concept design, retail and salon interior design, custom reception desk, lighting design",
      he: "עיצוב קונספט, עיצוב פנים לחנות ולסלון, דלפק קבלה בעיצוב אישי, עיצוב תאורה",
      ar: "تصميم المفهوم، تصميم داخلي للمتجر والصالون، مكتب استقبال مخصص، تصميم إضاءة",
    },
    thumbnail: image("bridal-salon", 16),
    images: gallery("bridal-salon", [10, 16, 13, 21, 22, 5, 2]),
    featured: false,
  },
  {
    slug: "joker-burger",
    category: "hospitality",
    location: { en: "Israel", he: "ישראל", ar: "إسرائيل" },
    title: {
      en: "Joker Burger",
      he: "ג'וקר בורגר",
      ar: "جوكر برغر",
    },
    description: {
      en: "A street-side burger joint with a bold personality. A hand-painted Joker mural on the roller shutter turns the storefront into a local landmark, with bistro seating spilling onto the pavement. Inside, a compact open kitchen in brushed stainless steel is warmed by exposed brick, timber doors and long linear lights, keeping the line efficient without losing character. Even the restroom gets the treatment, with rust-toned porcelain slabs and a monolithic sink.",
      he: "המבורגרייה רחוב עם אישיות נועזת. ציור קיר של הג'וקר על תריס הגלילה הופך את החזית לנקודת ציון שכונתית, עם ישיבת ביסטרו שנשפכת אל המדרכה. בפנים, מטבח פתוח וקומפקטי מנירוסטה מוברשת מתחמם בזכות לבני חשופות, דלתות עץ ותאורה לינארית ארוכה, כך שקו העבודה נשאר יעיל בלי לאבד אופי. גם חדר השירותים זוכה ליחס מיוחד, עם לוחות פורצלן בגוון חלודה וכיור מונוליטי.",
      ar: "مطعم برغر على الشارع بشخصية جريئة. تحوّل جدارية الجوكر المرسومة يدوياً على الباب المعدني الواجهة إلى معلم محلي، مع جلسات بيسترو تمتد إلى الرصيف. في الداخل، يكتسب المطبخ المفتوح المدمج من الفولاذ المصقول دفئاً من الطوب المكشوف والأبواب الخشبية والإضاءة الخطية الطويلة، ليبقى خط العمل فعّالاً دون أن يفقد طابعه. وحتى دورة المياه نالت نصيبها، بألواح بورسلين بلون الصدأ وحوض متجانس.",
    },
    scope: {
      en: "Storefront design, kitchen and service layout, interior design, lighting",
      he: "עיצוב חזית, תכנון מטבח ואזור שירות, עיצוב פנים, תאורה",
      ar: "تصميم الواجهة، تخطيط المطبخ ومنطقة الخدمة، تصميم داخلي، إضاءة",
    },
    thumbnail: image("joker-burger", 5),
    images: gallery("joker-burger", [7, 5, 11, 10, 4, 8]),
    featured: true,
  },
  {
    slug: "kiosk",
    category: "commercial",
    location: { en: "Israel", he: "ישראל", ar: "إسرائيل" },
    title: {
      en: "Fnjan Kiosk",
      he: "קיוסק פנג'אן",
      ar: "كشك فنجان",
    },
    description: {
      en: "A neighbourhood kiosk and coffee bar reimagined as a bright, gallery-like shop. Arched white niches frame candy, snacks and chocolates like display pieces, oak base cabinets ground the space, and a textured plaster counter bearing the Fnjan name anchors the coffee and pastry bar. Clear zones (Pastries, Drinks, Milk & More, Coffee to Go) are lettered straight onto the walls, so browsing feels effortless, while linear lighting keeps everything crisp and inviting.",
      he: "קיוסק ובר קפה שכונתי שעוצב מחדש כחנות בהירה בתחושת גלריה. נישות לבנות מקושתות ממסגרות ממתקים, חטיפים ושוקולדים כמו פריטי תצוגה, ארונות תחתונים מעץ אלון מקרקעים את החלל, ודלפק טיח מרקמי הנושא את השם Fnjan מעגן את בר הקפה והמאפים. אזורים ברורים (מאפים, משקאות, חלב ועוד, קפה לדרך) כתובים ישירות על הקירות כך שההתמצאות טבעית, ותאורה לינארית שומרת על מראה נקי ומזמין.",
      ar: "كشك ومقهى حيّ أُعيد تصوره كمتجر مشرق بروح المعرض. تؤطّر الكوّات البيضاء المقوّسة الحلويات والوجبات الخفيفة والشوكولاتة كقطع عرض، وتمنح الخزائن السفلية من خشب البلوط المساحة ثباتاً، بينما يرتكز ركن القهوة والمعجنات على كاونتر من الجص المحبّب يحمل اسم فنجان. كُتبت الأقسام بوضوح على الجدران (معجنات، مشروبات، حليب والمزيد، قهوة للطريق) ليصبح التجوّل سهلاً، وتحافظ الإضاءة الخطية على مظهر نظيف وجذاب.",
    },
    scope: {
      en: "Retail concept, interior design, custom millwork, signage and lighting",
      he: "קונספט קמעונאי, עיצוב פנים, נגרות בהתאמה אישית, שילוט ותאורה",
      ar: "مفهوم تجاري، تصميم داخلي، نجارة مخصصة، لافتات وإضاءة",
    },
    thumbnail: image("kiosk", 4),
    images: gallery("kiosk", [3, 4, 5, 9]),
    featured: true,
  },
  {
    slug: "apt-100",
    category: "residential",
    location: { en: "Israel", he: "ישראל", ar: "إسرائيل" },
    title: {
      en: "Apt. 100",
      he: "דירה 100",
      ar: "شقة 100",
    },
    description: {
      en: "A serene apartment in a palette of sand, cream and pale oak. Sheer curtains diffuse the light across a deep modular sofa, a travertine-look kitchen island and floor-to-ceiling timber cabinetry that hides the everyday. Décor is kept to a minimum, a dried branch here and a ceramic vase there, so texture does the talking. The guest bath continues the mood with a full-height stone wall and a softly backlit oval mirror.",
      he: "דירה שלווה בפלטה של חול, שמנת ואלון בהיר. וילונות שקופים מפזרים את האור על פני ספה מודולרית עמוקה, אי מטבח בדמוי טרוורטין וארונות עץ מהרצפה ועד התקרה שמסתירים את היומיום. העיצוב נשמר מינימלי, ענף יבש כאן ואגרטל קרמיקה שם, כך שהמרקמים הם שמדברים. חדר הרחצה לאורחים ממשיך את האווירה עם קיר אבן לכל הגובה ומראה אובלית עם תאורה עדינה.",
      ar: "شقة هادئة بلوحة ألوان من الرملي والكريمي والبلوط الفاتح. تنشر الستائر الشفافة الضوء على أريكة معيارية عميقة وجزيرة مطبخ تحاكي الترافرتين وخزائن خشبية من الأرض حتى السقف تخفي تفاصيل الحياة اليومية. أُبقي الديكور في حدّه الأدنى، غصن جاف هنا ومزهرية خزفية هناك، لتتحدث الخامات عن نفسها. ويواصل حمام الضيوف الأجواء ذاتها بجدار حجري بكامل الارتفاع ومرآة بيضاوية بإضاءة خلفية ناعمة.",
    },
    scope: {
      en: "Interior design, kitchen design, furniture selection, styling",
      he: "עיצוב פנים, תכנון מטבח, בחירת ריהוט, סטיילינג",
      ar: "تصميم داخلي، تصميم المطبخ، اختيار الأثاث، تنسيق",
    },
    thumbnail: image("apt-100", 3),
    images: gallery("apt-100", [3, 4, 7]),
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
