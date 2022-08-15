/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { calendarModel } from '@/entities/Calendar';
import { EventsActionKind, eventsModel } from '@/entities/Event';
import { scrollIntoView } from '@/shared/utils';

import { useGeneratedEventsGrid } from '../model';
import { EventsGridCell } from './EventsGreedCell';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 48px);
  grid-template-rows: repeat(24, 40px);
  width: 100%;
  overflow-x: hidden;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 48px;
  grid-template-rows: repeat(24, 40px);
`;

const HourCell = styled.div`
  display: flex;
  z-index: 10;
  justify-content: center;
  background-color: ${(props) => props.theme.main.colors.white};

  position: relative;

  &:first-child > p {
    bottom: 0;
    top: 0;
  }

  & > p {
    position: absolute;
    bottom: 85%;
    font-size: 0.8rem;
    color: ${(props) => props.theme.main.colors.gray};
  }
`;

const EventsGridView = () => {
  const {
    state: { selectedDay, daysOfMonth },
  } = calendarModel.useCalendar();
  const {
    state: { activeEventId },
    dispatch,
  } = eventsModel.useEvents();

  const grid = useGeneratedEventsGrid();

  const selectEvent = useCallback(
    (eventId: string) => {
      dispatch({ type: EventsActionKind.SELECT_EVENT, payload: eventId });
    },
    [dispatch],
  );

  const focusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollIntoView(focusRef, {
      behavior: 'smooth',
      inline: 'center',
      block: 'center',
    });
  }, [selectedDay]);

  return (
    <Wrapper>
      <Column>
        {grid.map((_, i) => (
          <HourCell key={i}>
            <p>{`${i + 1 < 10 ? `0${i}` : i}:00`}</p>
          </HourCell>
        ))}
      </Column>
      <Grid columns={daysOfMonth.length}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <EventsGridCell
              columns={daysOfMonth.length}
              eventId={cell}
              isActiveEvent={activeEventId === cell}
              key={`x${j}_y${i}`}
              ref={i === 0 && j + 1 === selectedDay ? focusRef : null}
              x={j}
              y={i}
              onSelect={selectEvent}
            />
          )),
        )}
      </Grid>
    </Wrapper>
  );
};

export const EventsGrid = memo(EventsGridView);
