import { useMemo } from 'react';

import { calendarModel } from '@/entities/Calendar';
import { eventsModel } from '@/entities/Event';

export const useGeneratedEventsGrid = () => {
  const {
    state: { daysOfMonth, selectedMonth, selectedYear },
  } = calendarModel.useCalendar();
  const {
    state: { events },
  } = eventsModel.useEvents();

  const generatedGrid = useMemo(() => {
    const grid: (string | null)[][] = [];

    for (let i = 0; i < 24; i += 1) {
      const row: (string | null)[] = [];

      for (let j = 0; j < daysOfMonth.length; j += 1) {
        row.push(
          events.find(
            ({ date }) =>
              date.year === selectedYear &&
              date.month === selectedMonth &&
              date.day === j + 1 &&
              date.hours === i,
          )?.id ?? null,
        );
      }

      grid.push(row);
    }

    return grid;
  }, [daysOfMonth.length, events, selectedMonth, selectedYear]);

  return generatedGrid;
};
