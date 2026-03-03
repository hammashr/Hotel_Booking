export const RATE_PLANS = {
  apple: {
    label: 'Tiny Homes',
    weekday: 205,
    weekend: 255,
  },
  aFrame: {
    label: 'A-Frame Homes',
    weekday: 215,
    weekend: 285,
  },
};

export const getRatePlanBySlug = (slug = '') => {
  if (slug.startsWith('apple-')) return RATE_PLANS.apple;
  if (slug.startsWith('triangle-')) return RATE_PLANS.aFrame;
  return null;
};

export const countWeekdayWeekendNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return { weekdayNights: 0, weekendNights: 0, nights: 0 };

  const parseYMDToUTC = (value) => {
    const match = /^\d{4}-\d{2}-\d{2}$/.exec(value || '');
    if (!match) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };

  const start = parseYMDToUTC(checkIn);
  const end = parseYMDToUTC(checkOut);
  if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return { weekdayNights: 0, weekendNights: 0, nights: 0 };
  }

  let weekdayNights = 0;
  let weekendNights = 0;
  let cursor = new Date(start);

  while (cursor < end) {
    const day = cursor.getUTCDay();
    if (day === 5 || day === 6) {
      weekendNights += 1;
    } else {
      weekdayNights += 1;
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return {
    weekdayNights,
    weekendNights,
    nights: weekdayNights + weekendNights,
  };
};
