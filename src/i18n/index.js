import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'tr', 'fr', 'ar'],
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        react: {
            useSuspense: true,
        },
    });

// Function to update document direction for RTL languages
export const updateDirection = (lng) => {
    const rtlLanguages = ['ar'];
    const isRtl = rtlLanguages.includes(lng);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
};

// Listen for language changes
i18n.on('languageChanged', (lng) => {
    updateDirection(lng);
});

export default i18n;
