import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import httpBackend from 'i18next-http-backend';
import localStorageBackend from 'i18next-localstorage-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import i18nConfig from './config.mjs';
import { LOCALE_KEY } from 'constants/i18n.mjs';

i18n.on('languageChanged', (lng) => {
	localStorage.setItem(LOCALE_KEY, lng);
});

i18n.use(httpBackend).use(detector).use(initReactI18next).init(i18nConfig);

export default i18n;
