import * as React from "react";

import { aboutAr, aboutEn, aboutFr } from "@/modules/about";
import { motPresidentEn, motPresidentFr, motPresidentAr, formation_olympiqueEn, formation_olympiqueFr, formation_olympiqueAr,
  initiative_covidEn, initiative_covidFr, initiative_covidAr, journalEn, journalFr, journalAr } from "@/modules/about";
import { competitionAr, competitionEn, competitionFr } from "@/modules/competition";
import { contactAr, contactEn, contactFr, NouscontacterEn, NouscontacterFr, NouscontacterAr } from "@/modules/contact";

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
    members: {
      en: "Members",
      fr: "Membres",
      ar: "أعضاء",
    },
    activities: {
      en: "Our main actions",
      fr: "Nos principales actions",
      ar: "أعمالنا الرئيسية",
    },
    motPresident: {
      en: "the president speech",
      fr: "Le mot du Président",
      ar: "كلمةالرئيس",
    },
    page: {
      en: aboutEn,
      fr: aboutFr,
      ar: aboutAr,
    },
    formation_olympique_title:{
      en: "Olympic training",
      fr: "Formation Olympique",
      ar: "التدريب الاولمبي",
    },
    initiative_covid_title:{
      en: "Covid initiative",
      fr: "Initiative Covid",
      ar: "مبادرة كوفيد",
    },
    journal_title:{
      en: "Math&Morocco newspaper",
      fr: "Le journal de Math&Maroc",
      ar: "جريدة الرياضيات والمغرب",
    },
    formation_olympique:{
      en: formation_olympiqueEn,
      fr: formation_olympiqueFr,
      ar: formation_olympiqueAr,
    },
    initiative_covid:{
      en: initiative_covidEn,
      fr: initiative_covidFr,
      ar: initiative_covidAr,
    },
    journal:{
      en: journalEn,
      fr: journalFr,
      ar: journalAr,
    },
    motPresidentContent: {
      en: motPresidentEn,
      fr: motPresidentFr,
      ar: motPresidentAr,
    },
    
  },
  competition: {
    title: {
      en: "Competitions",
      fr: "Competitions",
      ar: "مسابقات",
    },
    page: {
      en: competitionEn,
      fr: competitionFr,
      ar: competitionAr,
    },
  },
  contact: {
    title: {
      en: "Contact",
      fr: "Contact",
      ar: "اتصل بنا",
    },
    sponsor: {
      en: "Our partnership offers",
      fr: "Nos offres de partenariat",
      ar: "عروض شراكتنا",
    },
    image: {
      en: "http://127.0.0.1:8080/mathemaroc/src/public/partenariat_eng.png",
      fr: "http://127.0.0.1:8080/mathemaroc/src/public/partenariat_fr.png",
      ar: "http://127.0.0.1:8080/mathemaroc/src/public/partenariat_ar.png",
    },
    confiance: {
      en: "They trusted us",
      fr: "Ils nous ont fait confiance",
      ar: "وثقوا بنا",
    },
    contact:{
      en: NouscontacterEn,
      fr: NouscontacterFr,
      ar: NouscontacterAr,
    },
    page: {
      en: contactEn,
      fr: contactFr,
      ar: contactAr,
    },
  },
  footer: {
    navigate: {
      en: "Navigate",
      fr: "Naviguer",
      ar: "التنقل",
    },
    socials: {
      en: "Socials",
      fr: "Réseaux sociaux",
      ar: "شبكات التواصل",
    },
  },
  tooltip: {
    email: {
      en: "Click to copy email address 📮",
      fr: "Cliquez pour copier l'adresse email 📮",
      ar: "انقر لنسخ عنوان البريد الإلكتروني 📮",
    },
    lightmode: {
      en: "Toggle light mode 🌓",
      fr: "Basculer le mode d'éclairage 🌓",
      ar: "تبديل وضع الإضاءة 🌓",
    },
    lang: {
      en: "Select language 🔡",
      fr: "Sélectionnez la langue 🔡",
      ar: "اختيار اللغة 🔡",
    },
  },
  flag: {
    en: "en",
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
    fr: "Événements récents",
    ar: "الأحداث الأخيرة",
  },
  "home-revents-subtitle": {
    en: <>View more recent meetups and workshops on the events page.</>,
    fr: <>Consultez les rencontres et les ateliers les plus récents sur la page des événements.</>,
    ar: <>عرض المزيد من اللقاءات وورش العمل الأخيرة على صفحة الأحداث</>,
  },
  "home-revents-more": {
    en: "View more events",
    fr: "Voir plus d'évènements",
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
    en: "Recent Events",
    fr: "Activités récentes",
    ar: "الأحداث الأخيرة",
  },
  "events-subtitle": {
    en: <>Here are our recent events.</>,
    fr: <>Voici nos activités récentes.</>,
    ar: <>هي أنشطتنا السابقة.</>,
  },
  "conferences-title": {
    en: "Conferences",
    fr: "Rencontres et ateliers",
    ar: "محاضرات",
  },
  "conferences-subtitle": {
    en: <>Here are our recent conferences.</>,
    fr: <>Voici nos activités récentes.</>,
    ar: "",
  },
  "orientations-title": {
    en: "Orientation guides",
    fr: "Rencontres et ateliers",
    ar: "خاص بالتوجيه",
  },
  "orientations-subtitle": {
    en: "",
    fr: <>Voici nos activités récentes.</>,
    ar: "",
  },
  "journals-title": {
    en: "Journals",
    fr: "Rencontres et ateliers",
    ar: "جرائد",
  },
  "journals-subtitle": {
    en: "",
    fr: <>Voici nos activités récentes.</>,
    ar: "",
  },
  "404-title": {
    en: "Four Oh Four!",
    fr: "Empat Nol Empat!",
    ar: "404",
  },
  "404-subtitle": {
    en: "The page you requested does not exist or may have been moved.",
    fr: "Halaman yang Anda minta tidak ada atau mungkin telah dipindahkan.",
    ar: "الصفحة التي طلبتها غير موجودة أو ربما تم نقلها.",
  },
  "under-construction-title": {
    en: "We're working on it!",
    fr: "Nous travaillons sur cela!",
    ar: "نحن نعمل على ذلك!",
  },
  "under-construction-subtitle": {
    en: "Please come back later...",
    fr: "Veuillez revenir plus tard...",
    ar: "يرجى العودة لاحقًا...",
  },
  "404-button": {
    en: "Back to home page",
    fr: "Retour à la page d'accueil",
    ar: "العودة إلى الصفحة الرئيسية",
  },
  "view-pdf": {
    en: "View PDF",
    fr: "Voir PDF",
    ar: "عرض الملف",
  },
};
