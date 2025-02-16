import {vi_VN, en_US} from './locales/translations.mjs';


const resources = {
	vi_VN: {
		translation: vi_VN,
	},
	en_US: {
		translation: en_US,
	},
};

const i18nConfig = {
	resources,
	fallbackLng: 'en_US',
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ['localStorage'],
		lookupLocalStorage: 'lang',
		checkWhitelist: true,
	},
};

export default i18nConfig;
