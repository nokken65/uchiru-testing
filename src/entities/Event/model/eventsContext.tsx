import { nanoid } from 'nanoid';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { parseEventDate } from '@/shared/utils';

import {
  EventsAction,
  EventsActionKind,
  EventsContextState,
  InitialEventsState,
} from './models';

const initialEventsState = (): InitialEventsState => {
  return {
    activeEventId: '',
    events: [
      {
        id: nanoid(),
        date: parseEventDate('2022-8-14 4:5:0'),
      },
      {
        id: nanoid(),
        date: parseEventDate('2022-8-16 2:5:0'),
      },
    ],
  };
};

const EventsContext = createContext<EventsContextState>({
  state: initialEventsState(),
  dispatch: () => null,
});

const EventsReducer = (
  state: InitialEventsState,
  action: EventsAction,
): InitialEventsState => {
  switch (action.type) {
    case EventsActionKind.SELECT_EVENT:
      return { ...state, activeEventId: action.payload ?? '' };
    case EventsActionKind.ADD: {
      const parsedDate = action.payload && parseEventDate(action.payload);
      if (parsedDate) {
        return {
          ...state,
          activeEventId: '',
          events: [...state.events, { id: nanoid(), date: parsedDate }],
        };
      }
      alert(`date: ${action.payload} is incorrect.`);

      return state;
    }
    case EventsActionKind.DELETE:
      return {
        ...state,
        activeEventId:
          action.payload === state.activeEventId ? '' : state.activeEventId,
        events: state.events.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
};

const EventsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(EventsReducer, initialEventsState());

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === null) {
    throw new Error('useEvents must be used within a EventsProvider');
  }

  return context;
};

export { EventsProvider, useEvents };
