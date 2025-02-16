import { ENGLISH, VIETNAMESE } from './locales/translations.mjs';

import { ENGLISH_LOCALE_CODE, VIETNAM_LOCALE_CODE, LOCALE_KEY } from 'constants/i18n.mjs';

const resources = {
	[ENGLISH_LOCALE_CODE]: {
		translation: ENGLISH,
	},
	[VIETNAM_LOCALE_CODE]: {
		translation: VIETNAMESE,
	},
};

const i18nConfig = {
	resources,
	fallbackLng: ENGLISH_LOCALE_CODE,
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ['localStorage'],
		lookupLocalStorage: LOCALE_KEY,
		checkWhitelist: true,
	},
};

export default i18nConfig;
