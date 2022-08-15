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

  const selectDay = useCallback(
    (day: number) => {
      dispatch({ type: CalendarActionKind.SELECT_DAY, payload: day });
    },
    [dispatch],
  );

  return (
    <Wrapper ref={wrapperRef}>
      {daysOfMonth.map((day) => (
        <DayCard
          day={day}
          isSelected={day === selectedDay}
          key={day}
          onSelect={selectDay}
        />
      ))}
    </Wrapper>
  );
};

export const CalendarDayPicker = memo(CalendarDayPickerView);
