import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { getDaysOfMonth } from '@/shared/utils';

import {
  CalendarAction,
  CalendarActionKind,
  CalendarContextState,
  InitialCalendarState,
} from './models';

const initialCalendarState = (): InitialCalendarState => {
  const today = new Date();

  return {
    daysOfMonth: getDaysOfMonth(),
    selectedDay: today.getUTCDate(),
    selectedMonth: today.getUTCMonth() + 1,
    selectedYear: today.getUTCFullYear(),
  };
};

const CalendarContext = createContext<CalendarContextState>({
  state: initialCalendarState(),
  dispatch: () => null,
});

const calendarReducer = (
  state: InitialCalendarState,
  action: CalendarAction,
): InitialCalendarState => {
  switch (action.type) {
    case CalendarActionKind.SELECT_DAY:
      return { ...state, selectedDay: action.payload ?? 1 };
    case CalendarActionKind.PREV_MONTH: {
      if (state.selectedMonth === 1) {
        return {
          ...state,
          selectedDay: 1,
          selectedMonth: 12,
          selectedYear: state.selectedYear - 1,
          daysOfMonth: getDaysOfMonth(12, state.selectedYear - 1),
        };
      }

      return {
        ...state,
        selectedDay: 1,
        selectedMonth: state.selectedMonth - 1,
        daysOfMonth: getDaysOfMonth(
          state.selectedMonth - 1,
          state.selectedYear,
        ),
      };
    }
    case CalendarActionKind.NEXT_MONTH: {
      if (state.selectedMonth === 12) {
        return {
          ...state,
          selectedDay: 1,
          selectedMonth: 1,
          selectedYear: state.selectedYear + 1,
          daysOfMonth: getDaysOfMonth(1, state.selectedYear + 1),
        };
      }

      return {
        ...state,
        selectedDay: 1,
        selectedMonth: state.selectedMonth + 1,
        daysOfMonth: getDaysOfMonth(
          state.selectedMonth + 1,
          state.selectedYear,
        ),
      };
    }
    case CalendarActionKind.SELECT_TODAY: {
      const today = new Date();

      return {
        daysOfMonth: getDaysOfMonth(),
        selectedDay: today.getUTCDate(),
        selectedMonth: today.getUTCMonth() + 1,
        selectedYear: today.getUTCFullYear(),
      };
    }

    default:
      return state;
  }
};

const CalendarProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(calendarReducer, initialCalendarState());

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === null) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }

  return context;
};

export { CalendarProvider, useCalendar };
