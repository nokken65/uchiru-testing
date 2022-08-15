import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { useCalendar } from '../../model';
import { CalendarActionKind } from '../../model/models';
import { DayCard } from './DayCard';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;

const CalendarDayPickerView = () => {
  const {
    state: { selectedDay, daysOfMonth },
    dispatch,
  } = useCalendar();

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

  const selectDay = useCallback(
    (day: number) => {
      dispatch({ type: CalendarActionKind.SELECT_DAY, payload: day });
    },
    [dispatch],
  );

  return (
    <Wrapper ref={wrapperRef}>
      {daysOfMonth.map((day) => (
        <div key={day} ref={day === selectedDay ? focusRef : null}>
          <DayCard
            day={day}
            isSelected={day === selectedDay}
            onSelect={selectDay}
          />
        </div>
      ))}
    </Wrapper>
  );
};

export const CalendarDayPicker = memo(CalendarDayPickerView);
