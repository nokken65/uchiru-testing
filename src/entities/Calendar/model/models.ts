export enum CalendarActionKind {
  SELECT_DAY = 'SELECT_DAY',
  PREV_MONTH = 'PREV_MONTH',
  NEXT_MONTH = 'NEXT_MONTH',
  SELECT_TODAY = 'SELECT_TODAY',
}

export type CalendarAction = {
  type: CalendarActionKind;
  payload?: number;
};

export type InitialCalendarState = {
  daysOfMonth: number[];
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
};

export type CalendarContextState = {
  state: InitialCalendarState;
  dispatch: React.Dispatch<CalendarAction>;
};
