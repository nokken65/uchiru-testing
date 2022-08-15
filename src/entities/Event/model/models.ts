import type { Event } from '@/shared/types';

export enum EventsActionKind {
  ADD = 'ADD',
  DELETE = 'DELETE',
  SELECT_EVENT = 'SELECT_EVENT',
}

export type EventsAction = {
  type: EventsActionKind;
  payload?: string | void;
};

export type InitialEventsState = {
  activeEventId: string;
  events: Event[];
};

export type EventsContextState = {
  state: InitialEventsState;
  dispatch: React.Dispatch<EventsAction>;
};
