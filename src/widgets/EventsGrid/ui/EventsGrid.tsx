/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { calendarModel } from '@/entities/Calendar';
import { EventsActionKind, eventsModel } from '@/entities/Event';

import { useGeneratedEventsGrid } from '../model';
import { EventsGridCell } from './EventsGreedCell';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;
  position: sticky;
  left: 0;
  z-index: 10;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(100% - 48px);
  overflow-x: hidden;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const HourCell = styled.div`
  width: 3rem;
  height: 2.5rem;
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

  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      const halfContainerWidth =
        wrapperRef.current.getBoundingClientRect().width / 2;
      const offsetLeft = (selectedDay - 1) * 48 - halfContainerWidth + 24;

      wrapperRef.current.scrollTo({
        behavior: 'smooth',
        left: offsetLeft,
        top: 0,
      });
    }
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
      <Grid ref={wrapperRef}>
        {grid.map((row, i) => (
          <Row key={i}>
            {row.map((cell, j) => (
              <EventsGridCell
                columns={daysOfMonth.length}
                eventId={cell}
                isActiveEvent={activeEventId === cell}
                key={`x${j}_y${i}`}
                x={j}
                y={i}
                onSelect={selectEvent}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </Wrapper>
  );
};

export const EventsGrid = memo(EventsGridView);
