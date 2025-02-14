import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import translationVN from 'utils/locales/vi_VN/translation.json';

const resources = {
	vi_VN: {
		translation: translationVN,
	},
};

i18n
	.use(backend)
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en_US',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
