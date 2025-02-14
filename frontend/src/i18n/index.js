import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import httpBackend from 'i18next-http-backend';
import localStorageBackend from 'i18next-localstorage-backend';
import resourcesToBackend from "i18next-resources-to-backend";

import vi_VN from "./locales/vi_VN/translation.json";
import en_US from "./locales/en_US/translation.json";


i18n.on('languageChanged', function (lng) {
	localStorage.setItem("lang", lng);
})

const resources = {
	vi_VN: {
		translation: vi_VN,
	},
	en_US: {
		translation: en_US,
	},
};

i18n.use(httpBackend)
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en_US',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage'],
			lookupLocalStorage: 'lang',
			checkWhitelist: true
		},
	});

export default i18n;
