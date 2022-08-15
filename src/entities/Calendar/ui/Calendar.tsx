import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { CalendarProvider } from '../model';
import { CalendarBody } from './CalendarBody';
import { CalendarDayPicker } from './CalendarDayPicker';
import { CalendarFooter } from './CalendarFooter';
import { CalendarHeader } from './CalendarHeader';
import { CalendarMonthSlider } from './CalendarMonthSlider';

const Wrapper = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

const Calendar = ({ children }: PropsWithChildren) => {
  return (
    <CalendarProvider>
      <Wrapper>{children}</Wrapper>
    </CalendarProvider>
  );
};

Calendar.Header = CalendarHeader;
Calendar.Body = CalendarBody;
Calendar.Footer = CalendarFooter;
Calendar.DayPicker = CalendarDayPicker;
Calendar.MonthSlider = CalendarMonthSlider;

export { Calendar };
