const routes = {
  en: {
    "/": { name: "Home" },
    "/events": { name: "Events" },
    "/about": { name: "Who are we?" },
  },
  fr: {
    "/": { name: "Beranda" },
    "/events": { name: "Kegiatan" },
    "/coc": { name: "Kode Etika" },
  },
};

/**
 * @param {string} locale
 * @returns {Record<string,{name:string;ext?:boolean;}>}
 */
module.exports = (locale = "en") => routes[locale];
