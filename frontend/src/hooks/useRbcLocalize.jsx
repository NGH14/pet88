import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocaleConfig, ENGLISH_LOCALE_CODE, VIETNAM_LOCALE_CODE } from '~/utils/i18n/config.mjs';

const langMessage = {
  [ENGLISH_LOCALE_CODE]: {
    week: 'Week',
    work_week: 'Work Week',
    day: 'Day',
    month: 'Month',
    previous: '<',
    next: '>',
    today: 'Today',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Time',
    event: 'Event',
    allDay: 'All Day',
    noEventsInRange: 'No events in range',
    showMore: total => `+${total} More`,
  },
  [VIETNAM_LOCALE_CODE]: {
    week: 'Tuần',
    work_week: 'Ngày trong tuần',
    day: 'Ngày',
    month: 'Tháng',
    previous: '<',
    next: '>',
    today: 'Hôm nay',
    agenda: 'Lịch trình',
    date: 'Ngày',
    time: 'Thời gian',
    event: 'Sự kiện',
    allDay: 'Cả ngày',
    noEventsInRange: 'Không có sự kiện nào',
    showMore: total => `+${total} Xem Thêm`,
  },
};

export const useCalendarLocale = (lang) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(lang || i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLocale(lng);
    };

    setLocale(i18n.language);
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const messages = useMemo(() => {
    return langMessage[locale] || langMessage[ENGLISH_LOCALE_CODE];
  }, [locale]);


  const culture = useMemo(() => {
    const config = getLocaleConfig(locale);
    return config.calendar;
  }, [locale]);

  return { messages, culture };
};