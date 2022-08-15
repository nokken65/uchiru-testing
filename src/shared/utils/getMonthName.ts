type GetMonthNameFn = (month?: number) => string;

export const getMonthName: GetMonthNameFn = (_month) => {
  if (_month !== undefined && (_month < 1 || _month > 12)) {
    throw new Error('Incorrect month.');
  }

  const month = _month ? _month - 1 : new Date().getUTCMonth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[month];
};
