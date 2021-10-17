import * as React from "react";

import { COC, KodeEtika } from "@/modules/coc";
import { aboutAr, aboutEn, aboutFr } from "@/modules/about";

export default {
  "i18n-code": {
    en: "en-US",
    fr: "fr",
    ar: "ar",
  },
  about: {
    title: {
      en: "Who are we",
      fr: "Qui sommes-nous",
      ar: "من نحن؟",
    },
    page: {
      en: aboutEn,
      fr: aboutFr,
      ar: aboutAr,
    },
  },
  flag: {
    en: "🇺🇸",
    fr: "fr",
    ar: "ar",
  },
  "home-title": {
    en: "To promote mathematics in Morocco.",
    fr: "Pour promouvoir les mathématiques au Maroc.",
    ar: "لتعزيز الرياضيات في المغرب",
  },
  "home-subtitle": {
    en: "Moroccan association working for a better preparation of young Moroccans to the International Mathematics Olympiads.",
    fr: "Association marocaine œuvrant pour une meilleure préparation des jeunes marocains aux Olympiades Internationales de Mathématiques.",
    ar: "جمعية مغربية تعمل من أجل إعداد أفضل للشباب المغربي للأولمبياد الدولي للرياضيات.",
  },
  "home-revents-title": {
    en: "Recent Events",
    fr: "Kegiatan Terakhir",
    ar: "الأحداث الأخيرة",
  },
  "home-revents-subtitle": {
    en: <>View more recent meetups and workshops on the events page.</>,
    fr: <>Lihat meetup dan workshop selebihnya pada laman kegiatan.</>,
    ar: <>عرض المزيد من اللقاءات وورش العمل الأخيرة على صفحة الأحداث</>,
  },
  "home-revents-more": {
    en: "View more events",
    fr: "Lihat kegiatan lainnya",
    ar: "عرض المزيد من الأحداث",
  },
  "home-saps-title": {
    en: "Our Sponsors and Partners",
    fr: "Sponsor dan Partner Kami",
  },
  "home-saps-subtitle": {
    en: "We are thankful for the support from our friends below.",
    fr: "Kami berterima kasih atas dukungan dari teman-teman kami di bawah ini.",
  },
  "events-title": {
    en: "Meetups and Workshops",
    fr: "Meetup dan Workshop",
  },
  "events-subtitle": {
    en: <>Here are our recent events.</>,
    fr: <>Berikut merupakan kegiatan kami sebelumnya.</>,
  },
  "404-title": {
    en: "Four Oh Four!",
    fr: "Empat Nol Empat!",
    ar: "404",
  },
  "404-subtitle": {
    en: "The page you requested does not exist or may have been moved.",
    fr: "Halaman yang Anda minta tidak ada atau mungkin telah dipindahkan.",
    ar: "The page you requested does not exist or may have been moved.",
  },
  "404-button": {
    en: "Back to home page",
    fr: "Back to home page",
    ar: "Back to home page",
  },
};
