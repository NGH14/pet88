import { ENGLISH_LOCALE_CODE, LOCALE_KEY, VIETNAM_LOCALE_CODE } from 'constants/i18n.mjs';

import {
	ENGLISH_COMMON,
	ENGLISH_DEFAULT,
	ENGLISH_HOMEPAGE,
	VIETNAMESE_COMMON,
	VIETNAMESE_DEFAULT,
	VIETNAMESE_HOMEPAGE,
} from './locales/translations.js';

const NAMESPACE = {
	defaultNS: 'translation',
	commonNS: 'common',
	homePageNS: 'homepage',
};

const RESOURCES = {
	[ENGLISH_LOCALE_CODE]: {
		[NAMESPACE.defaultNS]: ENGLISH_DEFAULT,
		[NAMESPACE.commonNS]: ENGLISH_COMMON,
		[NAMESPACE.homePageNS]: ENGLISH_HOMEPAGE,
	},
	[VIETNAM_LOCALE_CODE]: {
		translation: VIETNAMESE_DEFAULT,
		common: VIETNAMESE_COMMON,
		homepage: VIETNAMESE_HOMEPAGE,
	},
};

const i18nConfig = {
	resources: RESOURCES,
	ns: [[NAMESPACE.defaultNS], [NAMESPACE.commonNS], [NAMESPACE.homePageNS]],
	defaultNS: 'translation',
	supportedLngs: [ENGLISH_LOCALE_CODE, VIETNAM_LOCALE_CODE],
	fallbackLng: ENGLISH_LOCALE_CODE,
	interpolation: {
		escapeValue: false,
	},
	keySeparator: '@',
	detection: {
		order: ['localStorage'],
		lookupLocalStorage: LOCALE_KEY,
	},
};

export default i18nConfig;
