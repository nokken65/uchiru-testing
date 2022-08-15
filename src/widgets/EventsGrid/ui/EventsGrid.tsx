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

const Column = styled.div<{ width?: string; sticky?: boolean }>`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: ${(props) => props.width ?? '100%'};
  ${(props) => (props.sticky ? 'position: sticky; left: 0; z-index: 10;' : '')};
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
  const focusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (focusRef.current && wrapperRef.current) {
      const wr = wrapperRef.current;
      const el = focusRef.current;

      const halfContainerWidth = wr.getBoundingClientRect().width / 2;

      wr.scrollTo({
        behavior: 'smooth',
        left: el.offsetLeft - halfContainerWidth,
        top: 0,
      });
    }
  }, [selectedDay]);

  return (
    <Wrapper>
      <Column sticky width='48px'>
        {grid.map((_, i) => (
          <HourCell key={i}>
            <p>{`${i + 1 < 10 ? `0${i}` : i}:00`}</p>
          </HourCell>
        ))}
      </Column>
      <Column ref={wrapperRef}>
        {grid.map((row, i) => (
          <Row key={i}>
            {row.map((cell, j) => (
              <EventsGridCell
                columns={daysOfMonth.length}
                eventId={cell}
                isActiveEvent={activeEventId === cell}
                key={`x${j}_y${i}`}
                ref={i === 0 && j + 2 === selectedDay ? focusRef : null}
                x={j}
                y={i}
                onSelect={selectEvent}
              />
            ))}
          </Row>
        ))}
      </Column>
    </Wrapper>
  );
};

export const EventsGrid = memo(EventsGridView);
