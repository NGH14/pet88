import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import httpBackend from 'i18next-http-backend';
import localStorageBackend from 'i18next-localstorage-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import i18nInit from './constants.js';

i18n.on('languageChanged', (lng) => {
	localStorage.setItem('lang', lng);
});

i18n.use(httpBackend).use(detector).use(initReactI18next).init(i18nInit);

export default i18n;
