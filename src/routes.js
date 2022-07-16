const routes = {
  en: {
    "/": { name: "Home" },
    "/events": { name: "Events" },
    "/about": { name: "Who are we?" },
    "/contact": { name: "Contact" },
    "/conferences": { name: "Conferences" },
    "/student": {
      name: "For students",
      submenu: [
        { sub_name: "Student's guide", sub_href: "/student/guide" },
        { sub_name: "Orientation", sub_href: "/student/orientation" },
      ],
    },
    "/journal": { name: "Journal" },
    "/olympiads": { name: "Olympiads" },
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
    "/student": {
      name: "For students",
      submenu: [
        { sub_name: "Student's guide", sub_href: "/student/guide" },
        { sub_name: "Orientation", sub_href: "/student/orientation" },
      ],
    },
    "/journal": { name: "Journal" },
    "/olympiads": { name: "Olympiads" },
  },
};

/**
 * @param {string} locale
 * @returns {Record<string,{name:string;ext?:boolean;submenu?:{sub_name:string;sub_href:string}[]}>}
 */
module.exports = (locale) => routes[locale];
