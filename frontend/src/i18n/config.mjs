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
  fallbackLng: ENGLISH_LOCALE_CODE,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage'],
    lookupLocalStorage: LOCALE_KEY,
  },
};

export default i18nConfig;
