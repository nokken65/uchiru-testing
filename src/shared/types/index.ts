export type EventDate = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type Event = {
  id: string;
  date: EventDate;
};
