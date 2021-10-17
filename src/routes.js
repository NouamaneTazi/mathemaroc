const routes = {
  en: {
    "/": { name: "Home" },
    "/events": { name: "Events" },
    "/about": { name: "Who are we?" },
  },
  fr: {
    "/": { name: "Page d'acceuil" },
    "/events": { name: "Evènements" },
    "/about": { name: "Who are we?" },
  },
  ar: {
    "/": { name: "الصفحة الرئيسية" },
    "/events": { name: "الأحداث" },
    "/about": { name: "من نحن؟" },
  },
};

/**
 * @param {string} locale
 * @returns {Record<string,{name:string;ext?:boolean;}>}
 */
module.exports = (locale = "en") => routes[locale];
