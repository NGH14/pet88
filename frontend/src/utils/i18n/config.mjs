export const VIETNAM_LOCALE_CODE = 'vi_VN';
export const ENGLISH_LOCALE_CODE = 'en_US';
export const LOCALE_KEY = 'lang';

export const NAMESPACE = {
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
		[NAMESPACE.defaultNS]: VIETNAMESE_DEFAULT,
		[NAMESPACE.commonNS]: VIETNAMESE_COMMON,
		[NAMESPACE.homePageNS]: VIETNAMESE_HOMEPAGE,
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
