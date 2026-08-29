import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProductStore } from "@/store/ProductStore";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MessageIcon from "@mui/icons-material/Message";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TranslateIcon from "@mui/icons-material/Translate";
import PaletteIcon from "@mui/icons-material/Palette";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion, AnimatePresence } from "framer-motion";

// --- i18n Translations ---
const translations = {
  en: {
    title: "Islam X",
    nav: ["Features", "Products", "Contact"],
    hero: {
      title: "Build Something Amazing",
      subtitle:
        "Create modern, responsive websites with stunning animations using React, Tailwind, Zustand and shadcn/ui.",
      cta: "Get Started",
      learn: "Learn More",
    },
    features: {
      fast: "Fast",
      fastDesc: "Lightning-fast performance with optimized components.",
      customizable: "Customizable",
      customDesc: "Easily adapt the design to match your brand identity.",
      responsive: "Responsive",
      respDesc: "Looks perfect on all devices and screen sizes.",
    },
    products: {
      title: "Product Management",
      subtitle: "Add and manage your products with ease",
      addNew: "Add New Product",
      name: "Product Name",
      description: "Description",
      price: "Price",
      add: "Add Product",
      remove: "Remove",
      empty: "No products yet. Add your first product!",
    },
    contact: {
      title: "Ready to Start?",
      subtitle:
        "Whether you have a question, want to start a project, or just want to say hi — we'd love to hear from you!",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
    },
    footer: "© 2025 Islam. All rights reserved.",
    footerNote: "Designed with 💜 using React & Tailwind",
  },
  ar: {
    title: "إسلام X",
    nav: ["المميزات", "المنتجات", "اتصل بنا"],
    hero: {
      title: "ابنِ شيئاً مذهلاً",
      subtitle:
        "أنشئ مواقع حديثة ومتجاوبة مع رسوم متحركة مذهلة باستخدام React و Tailwind و Zustand و shadcn/ui",
      cta: "ابدأ الآن",
      learn: "اعرف المزيد",
    },
    features: {
      fast: "سريع",
      fastDesc: "أداء فائق السرعة مع مكونات محسّنة.",
      customizable: "قابل للتخصيص",
      customDesc: "تكيف التصميم بسهولة ليتناسب مع هوية علامتك التجارية.",
      responsive: "متجاوب",
      respDesc: "يبدو مثالياً على جميع الأجهزة وأحجام الشاشات.",
    },
    products: {
      title: "إدارة المنتجات",
      subtitle: "أضف وأدر منتجاتك بسهولة",
      addNew: "إضافة منتج جديد",
      name: "اسم المنتج",
      description: "الوصف",
      price: "السعر",
      add: "إضافة منتج",
      remove: "حذف",
      empty: "لا توجد منتجات بعد. أضف منتجك الأول!",
    },
    contact: {
      title: "مستعد للبدء؟",
      subtitle:
        "سواء كان لديك سؤال، أو تريد بدء مشروع، أو فقط تريد إلقاء التحية — يسعدنا سماعك!",
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
      send: "إرسال الرسالة",
    },
    footer: "© 2025 إسلام. جميع الحقوق محفوظة.",
    footerNote: "صمم بحب 💜 باستخدام React و Tailwind",
  },
};

type Language = "en" | "ar";

// --- Theme Configuration ---
type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
  bgStart: string;
  bgMiddle: string;
  bgEnd: string;
  cardBg: string;
  border: string;
  text: string;
  textMuted: string;
  gradientFrom: string;
  gradientTo: string;
};

const themes: Record<string, ThemeColor> = {
  violet: {
    primary: "violet",
    secondary: "purple",
    accent: "pink",
    bgStart: "from-violet-900",
    bgMiddle: "via-purple-900",
    bgEnd: "to-pink-800",
    cardBg: "bg-white/10",
    border: "border-white/20",
    text: "text-white",
    textMuted: "text-white/70",
    gradientFrom: "from-pink-300",
    gradientTo: "to-purple-300",
  },
  blue: {
    primary: "blue",
    secondary: "cyan",
    accent: "sky",
    bgStart: "from-blue-900",
    bgMiddle: "via-cyan-900",
    bgEnd: "to-sky-800",
    cardBg: "bg-white/10",
    border: "border-white/20",
    text: "text-white",
    textMuted: "text-white/70",
    gradientFrom: "from-cyan-300",
    gradientTo: "to-blue-300",
  },
  emerald: {
    primary: "emerald",
    secondary: "teal",
    accent: "green",
    bgStart: "from-emerald-900",
    bgMiddle: "via-teal-900",
    bgEnd: "to-green-800",
    cardBg: "bg-white/10",
    border: "border-white/20",
    text: "text-white",
    textMuted: "text-white/70",
    gradientFrom: "from-emerald-300",
    gradientTo: "to-teal-300",
  },
  rose: {
    primary: "rose",
    secondary: "pink",
    accent: "red",
    bgStart: "from-rose-900",
    bgMiddle: "via-pink-900",
    bgEnd: "to-red-800",
    cardBg: "bg-white/10",
    border: "border-white/20",
    text: "text-white",
    textMuted: "text-white/70",
    gradientFrom: "from-rose-300",
    gradientTo: "to-pink-300",
  },
  amber: {
    primary: "amber",
    secondary: "orange",
    accent: "yellow",
    bgStart: "from-amber-900",
    bgMiddle: "via-orange-900",
    bgEnd: "to-yellow-800",
    cardBg: "bg-white/10",
    border: "border-white/20",
    text: "text-white",
    textMuted: "text-white/70",
    gradientFrom: "from-amber-300",
    gradientTo: "to-orange-300",
  },
};

// --- Animation Variants (Fully Stable - with 'as any' to bypass type issues) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
} as any;

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
} as any;

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
} as any;

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
} as any;

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
} as any;

const pulseGlow = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
} as any;

export default function App() {
  // --- States ---
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dis, setDis] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // --- New Features States ---
  const [language, setLanguage] = useState<Language>("en");
  const [isDark, setIsDark] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("violet");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { products, addProduct, removeProduct } = useProductStore();
  const t = translations[language];
  const theme = themes[selectedTheme];

  // --- Handlers ---
  const handleAdd = () => {
    if (!name.trim() || !price) return;
    addProduct({
      id: Date.now(),
      name,
      dis,
      price: parseFloat(price),
    });
    setName("");
    setDis("");
    setPrice("");
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "en" ? "ar" : "en"));
  };

  const toggleTheme = () => {
    setIsDark((dark) => !dark);
  };

  const changeColor = (colorName: string) => {
    setSelectedTheme(colorName);
    setShowColorPicker(false);
  };

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply direction based on language
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // --- Dynamic Styles ---
  const bgGradient = isDark
    ? `bg-gradient-to-br ${theme.bgStart} ${theme.bgMiddle} ${theme.bgEnd}`
    : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/70" : "text-gray-700";
  const cardBg = isDark ? "bg-white/10" : "bg-white/80";
  const borderColor = isDark ? "border-white/20" : "border-gray-300";
  const headerBg = scrolled
    ? isDark
      ? `${theme.primary}-900/90 backdrop-blur-lg`
      : "bg-white/90 backdrop-blur-lg shadow-lg"
    : "bg-transparent";

  const gradientText = `bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} bg-clip-text text-transparent`;

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${bgGradient} ${textColor} overflow-x-hidden`}
    >
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg} ${scrolled ? "py-3 shadow-xl" : "py-5"}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className={`text-xl md:text-2xl font-bold ${gradientText}`}
          >
            {t.title}
          </motion.h1>

          <div className="flex items-center gap-2">
            {/* Color Picker Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`p-2 rounded-full hover:bg-white/10 transition-all duration-300 ${isDark ? "text-white" : "text-gray-800"}`}
              title="Change Color"
            >
              <PaletteIcon />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-white/10 transition-all duration-300 ${isDark ? "text-white" : "text-gray-800"}`}
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className={`p-2 rounded-full hover:bg-white/10 transition-all duration-300 ${isDark ? "text-white" : "text-gray-800"} flex items-center gap-1`}
              title="Toggle Language"
            >
              <TranslateIcon />
              <span className="text-xs font-medium hidden sm:inline">
                {language === "en" ? "EN" : "عربي"}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>

          {/* Navbar */}
          <AnimatePresence>
            {(mobileMenuOpen || window.innerWidth >= 768) && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                } md:flex fixed md:static top-0 left-0 h-screen md:h-auto w-full md:w-auto ${
                  isDark ? "bg-violet-900/95" : "bg-white/95"
                } md:bg-transparent flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-sm font-medium p-4 md:p-0 z-40 transition-all duration-300`}
              >
                {t.nav.map((item, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={`#${["features", "products", "contact"][idx]}`}
                    className={`hover:${theme.accent}-200 transition-colors duration-300 py-2 md:py-0 ${
                      !isDark && "text-gray-800 hover:text-gray-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button
              size="sm"
              className={`bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} text-white hover:from-${theme.primary}-300 hover:to-${theme.secondary}-300 transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              {t.hero.cta}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Color Picker Dropdown */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 z-50 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/20"
          >
            <h3 className="text-sm font-semibold mb-3 text-center">
              Choose Theme
            </h3>
            <div className="flex gap-3 flex-wrap justify-center">
              {Object.keys(themes).map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => changeColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    selectedTheme === color
                      ? "border-white scale-110 shadow-lg"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor:
                      color === "violet"
                        ? "#7c3aed"
                        : color === "blue"
                          ? "#2563eb"
                          : color === "emerald"
                            ? "#059669"
                            : color === "rose"
                              ? "#e11d48"
                              : "#d97706",
                  }}
                  title={color}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-10 md:pt-32 md:pb-0"
      >
        <motion.div variants={fadeInUp} className="relative">
          <motion.div
            animate={floatingAnimation}
            className="absolute -top-20 -right-20 text-6xl opacity-20"
          >
            <AutoAwesomeIcon style={{ fontSize: 80 }} />
          </motion.div>
          <motion.div
            animate={floatingAnimation}
            className="absolute -bottom-20 -left-20 text-6xl opacity-20"
            style={{ animationDelay: "1.5s" }}
          >
            <RocketLaunchIcon style={{ fontSize: 80 }} />
          </motion.div>

          <motion.h1
            whileHover={{ scale: 1.02 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 ${gradientText} px-2`}
          >
            {t.hero.title}
          </motion.h1>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className={`text-base sm:text-lg md:text-xl ${textMuted} max-w-2xl mb-6 md:mb-8 leading-relaxed px-2`}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className={`bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} text-white hover:from-${theme.primary}-300 hover:to-${theme.secondary}-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              {t.hero.cta}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className={`border-${theme.accent}-300 text-${theme.accent}-500 hover:bg-${theme.accent}-300/10 transition-all duration-300`}
            >
              {t.hero.learn}
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="features"
        className="py-16 md:py-20 px-4 grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto"
      >
        {[
          {
            title: t.features.fast,
            desc: t.features.fastDesc,
            icon: <ElectricBoltIcon className={`text-${theme.accent}-300`} />,
          },
          {
            title: t.features.customizable,
            desc: t.features.customDesc,
            icon: <ColorLensIcon className={`text-${theme.accent}-300`} />,
          },
          {
            title: t.features.responsive,
            desc: t.features.respDesc,
            icon: <PhoneAndroidIcon className={`text-${theme.accent}-300`} />,
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`${cardBg} ${borderColor} backdrop-blur-sm ${isDark ? "text-white" : "text-gray-800"} hover:${isDark ? "bg-white/15" : "bg-white/95"} hover:shadow-2xl transition-all duration-300 group h-full`}
            >
              <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl"
                >
                  {feature.icon}
                </motion.div>
                <CardTitle
                  className={`${isDark ? `text-${theme.accent}-200 group-hover:text-${theme.accent}-100` : `text-${theme.accent}-700 group-hover:text-${theme.accent}-600`} transition-colors`}
                >
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent
                className={isDark ? "text-white/80" : "text-gray-600"}
              >
                {feature.desc}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        id="products"
        className="py-16 px-4 max-w-6xl mx-auto"
      >
        <motion.h1
          variants={fadeInLeft}
          className={`text-2xl md:text-3xl font-bold mb-2 ${gradientText} text-center md:text-left`}
        >
          {t.products.title}
        </motion.h1>
        <motion.p
          variants={fadeInLeft}
          className={`${textMuted} mb-6 md:mb-8 text-center md:text-left`}
        >
          {t.products.subtitle}
        </motion.p>

        <motion.div variants={fadeInUp} className="mb-6">
          <h2
            className={`text-lg md:text-xl font-semibold mb-3 ${isDark ? `text-${theme.accent}-200` : `text-${theme.accent}-700`}`}
          >
            {t.products.addNew}
          </h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder={t.products.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-4 py-2 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/50" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 flex-1 min-w-[200px] transition-all`}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder={t.products.description}
              value={dis}
              onChange={(e) => setDis(e.target.value)}
              className={`px-4 py-2 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/50" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 flex-1 min-w-[200px] transition-all`}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              placeholder={t.products.price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`px-4 py-2 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/50" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 w-full md:w-32 transition-all`}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAdd}
                className={`bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} hover:from-${theme.primary}-300 hover:to-${theme.secondary}-300 transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                {t.products.add}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                layout
              >
                <Card
                  className={`${cardBg} ${borderColor} backdrop-blur-sm ${isDark ? "text-white" : "text-gray-800"} hover:${isDark ? "bg-white/15" : "bg-white/95"} hover:shadow-xl transition-all duration-300 group h-full`}
                >
                  <CardHeader>
                    <CardTitle
                      className={`${isDark ? `text-${theme.accent}-200 group-hover:text-${theme.accent}-100` : `text-${theme.accent}-700 group-hover:text-${theme.accent}-600`} transition-colors text-base md:text-lg`}
                    >
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography
                      className={`${isDark ? `text-${theme.accent}-200` : `text-${theme.accent}-700`} text-sm md:text-base mb-2`}
                    >
                      {product.dis}
                    </Typography>
                    <p
                      className={`text-xl md:text-2xl font-semibold ${gradientText}`}
                    >
                      ${product.price}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3"
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 transition-all duration-300"
                        onClick={() => removeProduct(product.id)}
                      >
                        {t.products.remove}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-white/50"
          >
            <p className="text-base md:text-lg">{t.products.empty}</p>
          </motion.div>
        )}
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="contact"
        className={`text-center py-16 md:py-20 transition-all duration-500 relative overflow-hidden`}
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${
                selectedTheme === "violet"
                  ? "rgba(139,92,246,0.3)"
                  : selectedTheme === "blue"
                    ? "rgba(59,130,246,0.3)"
                    : selectedTheme === "emerald"
                      ? "rgba(16,185,129,0.3)"
                      : selectedTheme === "rose"
                        ? "rgba(244,63,94,0.3)"
                        : "rgba(245,158,11,0.3)"
              }, ${
                selectedTheme === "violet"
                  ? "rgba(236,72,153,0.3)"
                  : selectedTheme === "blue"
                    ? "rgba(6,182,212,0.3)"
                    : selectedTheme === "emerald"
                      ? "rgba(20,184,166,0.3)"
                      : selectedTheme === "rose"
                        ? "rgba(244,114,182,0.3)"
                        : "rgba(251,191,36,0.3)"
              })`
            : "linear-gradient(135deg, rgba(229,231,235,0.5), rgba(209,213,219,0.5))",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Background Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${
              selectedTheme === "violet"
                ? "#7c3aed"
                : selectedTheme === "blue"
                  ? "#2563eb"
                  : selectedTheme === "emerald"
                    ? "#059669"
                    : selectedTheme === "rose"
                      ? "#e11d48"
                      : "#d97706"
            }, transparent)`,
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${
              selectedTheme === "violet"
                ? "#8b5cf6"
                : selectedTheme === "blue"
                  ? "#3b82f6"
                  : selectedTheme === "emerald"
                    ? "#10b981"
                    : selectedTheme === "rose"
                      ? "#f43f5e"
                      : "#f59e0b"
            }, transparent)`,
          }}
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2
            variants={fadeInUp}
            className={`text-2xl md:text-3xl font-bold mb-4 ${gradientText}`}
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className={`max-w-xl mx-auto mb-8 md:mb-10 text-base md:text-lg ${textMuted} leading-relaxed`}
          >
            {t.contact.subtitle}
          </motion.p>

          <motion.form
            variants={staggerContainer}
            className="max-w-2xl mx-auto grid gap-4 text-left"
          >
            <motion.div variants={fadeInUp}>
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: `0 0 20px ${
                    selectedTheme === "violet"
                      ? "rgba(139,92,246,0.3)"
                      : selectedTheme === "blue"
                        ? "rgba(59,130,246,0.3)"
                        : selectedTheme === "emerald"
                          ? "rgba(16,185,129,0.3)"
                          : selectedTheme === "rose"
                            ? "rgba(244,63,94,0.3)"
                            : "rgba(245,158,11,0.3)"
                  }`,
                }}
                type="text"
                placeholder={t.contact.name}
                className={`px-4 py-3 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/60" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 transition-all duration-300 w-full`}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: `0 0 20px ${
                    selectedTheme === "violet"
                      ? "rgba(139,92,246,0.3)"
                      : selectedTheme === "blue"
                        ? "rgba(59,130,246,0.3)"
                        : selectedTheme === "emerald"
                          ? "rgba(16,185,129,0.3)"
                          : selectedTheme === "rose"
                            ? "rgba(244,63,94,0.3)"
                            : "rgba(245,158,11,0.3)"
                  }`,
                }}
                type="email"
                placeholder={t.contact.email}
                className={`px-4 py-3 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/60" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 transition-all duration-300 w-full`}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.textarea
                whileFocus={{
                  scale: 1.02,
                  boxShadow: `0 0 20px ${
                    selectedTheme === "violet"
                      ? "rgba(139,92,246,0.3)"
                      : selectedTheme === "blue"
                        ? "rgba(59,130,246,0.3)"
                        : selectedTheme === "emerald"
                          ? "rgba(16,185,129,0.3)"
                          : selectedTheme === "rose"
                            ? "rgba(244,63,94,0.3)"
                            : "rgba(245,158,11,0.3)"
                  }`,
                }}
                placeholder={t.contact.message}
                rows={4}
                className={`px-4 py-3 rounded-lg ${cardBg} ${borderColor} ${textColor} placeholder-${isDark ? "white/60" : "gray-500"} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-400/50 transition-all duration-300 w-full resize-y`}
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2"
            >
              <motion.div animate={pulseGlow} className="w-full">
                <Button
                  size="lg"
                  className={`w-full bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} hover:from-${theme.primary}-300 hover:to-${theme.secondary}-300 transition-all duration-300 shadow-md hover:shadow-lg text-base py-6`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.span
                    animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                    transition={{
                      duration: 0.5,
                      repeat: isHovered ? Infinity : 0,
                    }}
                    className="flex items-center gap-2"
                  >
                    {t.contact.send}
                    <motion.span
                      animate={
                        isHovered ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <AutoAwesomeIcon />
                    </motion.span>
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {[
              {
                icon: <EmailIcon />,
                label: "Email",
                href: "mailto:info@mybrand.com",
                color: "hover:text-yellow-300",
              },
              {
                icon: <MessageIcon />,
                label: "WhatsApp",
                href: "https://wa.me/1234567890",
                color: "hover:text-green-300",
              },
              {
                icon: <TwitterIcon />,
                label: "Twitter",
                href: "https://twitter.com/mybrand",
                color: "hover:text-blue-300",
              },
              {
                icon: <CameraAltIcon />,
                label: "Instagram",
                href: "https://instagram.com/mybrand",
                color: "hover:text-pink-300",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.3, y: -5 }}
                whileTap={{ scale: 0.8 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${social.color} ${isDark ? "text-white/80" : "text-gray-700"}`}
              >
                <span className="text-xl md:text-2xl">{social.icon}</span>
                <span className="text-xs opacity-70">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-center py-6 md:py-8 ${isDark ? "text-white/50" : "text-gray-600"} text-xs md:text-sm ${isDark ? "bg-black/20" : "bg-gray-200/50"} transition-all`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.p
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t.footer}
          </motion.p>
          <motion.p
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-1 text-xs opacity-50"
          >
            {t.footerNote}
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
