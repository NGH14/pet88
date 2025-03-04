import { ENGLISH_LOCALE_CODE, LOCALE_KEY, VIETNAM_LOCALE_CODE } from 'constants/i18n.mjs';

import { ENGLISH, VIETNAMESE } from './locales/translations.js';

const RESOURCES = {
	[ENGLISH_LOCALE_CODE]: {
		translation: ENGLISH,
	},
	[VIETNAM_LOCALE_CODE]: {
		translation: VIETNAMESE,
	},
};

const i18nConfig = {
	resources: RESOURCES,
	supportedLngs: [ENGLISH_LOCALE_CODE, VIETNAM_LOCALE_CODE],
	fallbackLng: ENGLISH_LOCALE_CODE,
	interpolation: {
		escapeValue: false,
	},
	keySeparator: '::',
	detection: {
		order: ['localStorage'],
		lookupLocalStorage: LOCALE_KEY,
	},
};

export default i18nConfig;
