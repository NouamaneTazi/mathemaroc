const routes = {
  en: {
    "/": { name: "Home" },
    "/events": { name: "Events" },
    "/about": { name: "Who are we?" },
    "/contact": { name: "Contact" },
    "/conferences": { name: "Conferences" },
  },
  // fr: {
  //   "/": { name: "Page d'acceuil" },
  //   "/events": { name: "Evènements" },
  //   "/about": { name: "Qui sommes-nous ?" },
  // },
  ar: {
    "/": { name: "الصفحة الرئيسية" },
    "/events": { name: "الأحداث" },
    "/about": { name: "من نحن؟" },
    "/contact": { name: "Contact" },
    "/conferences": { name: "Conferences" },
  },
};

/**
 * @param {string} locale
 * @returns {Record<string,{name:string;ext?:boolean;}>}
 */
module.exports = (locale) => routes[locale];
