import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { LOCALE_KEY } from '~/utils/i18n/config.mjs';

import i18nConfig from './config.mjs';

i18n.on('languageChanged', lng => {
	localStorage.setItem(LOCALE_KEY, lng);
});

i18n.use(detector).use(initReactI18next).init(i18nConfig);

export default i18n;
