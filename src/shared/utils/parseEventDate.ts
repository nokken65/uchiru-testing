import { EventDate } from '../types';

export const parseEventDate = (date: string): EventDate | null => {
  try {
    const [first, second] = date.split(' ');
    const [year, month, day] = first.split('-').map((v) => +v);
    const [hours, minutes, seconds] = second.split(':').map((v) => +v);

    const isValidYear = +year >= 100 && +year <= 5000;
    const isValidMonth = +month > 0 && +month <= 12;
    const isValidDay = +day > 0 && +day <= 31;
    const isValidHours = +hours >= 0 && +hours < 24;
    const isValidMinutes = +minutes >= 0 && +minutes < 60;
    const isValidSeconds = +seconds >= 0 && +seconds < 60;
    if (
      isValidYear &&
      isValidMonth &&
      isValidDay &&
      isValidHours &&
      isValidMinutes &&
      isValidSeconds
    ) {
      return { year, month, day, hours, minutes, seconds };
    }
    throw new Error('Cannot parse');
  } catch (error) {
    console.error(error);

    return null;
  }
};
