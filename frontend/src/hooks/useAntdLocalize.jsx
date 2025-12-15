import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocaleConfig } from '~/utils/i18n/config.mjs';
import dayjs from 'dayjs';

export const useAntdLocale = () => {
  const { i18n } = useTranslation();

  const [locale, setLocale] = useState(() => {
    const config = getLocaleConfig(i18n.language);
    return config.antd;
  });

  useEffect(() => {
    const updateLocale = (lng) => {
      const config = getLocaleConfig(lng);
      setLocale(config.antd);
      dayjs.locale(config.dayjs);
    };

    // Set initial locale (important for page reload)
    updateLocale(i18n.language);

    // Listen for language changes
    i18n.on('languageChanged', updateLocale);

    return () => {
      i18n.off('languageChanged', updateLocale);
    };
  }, [i18n]);

  return locale;
};