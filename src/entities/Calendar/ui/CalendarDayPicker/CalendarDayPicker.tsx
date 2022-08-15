import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { scrollIntoView } from '@/shared/utils';

import { useCalendar } from '../../model';
import { CalendarActionKind } from '../../model/models';
import { DayCard } from './DayCard';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const CalendarDayPickerView = () => {
  const {
    state: { selectedDay, daysOfMonth },
    dispatch,
  } = useCalendar();

  const focusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollIntoView(focusRef, {
      behavior: 'smooth',
      inline: 'center',
      block: 'center',
    });
  }, [selectedDay]);

  const selectDay = useCallback(
    (day: number) => {
      dispatch({ type: CalendarActionKind.SELECT_DAY, payload: day });
    },
    [dispatch],
  );

  return (
    <Wrapper>
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
