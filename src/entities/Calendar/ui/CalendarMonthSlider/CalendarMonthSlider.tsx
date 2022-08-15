import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { ArrowIcon } from '@/shared/icons';
import { Button } from '@/shared/ui';
import { getMonthName } from '@/shared/utils';

import { useCalendar } from '../../model';
import { CalendarActionKind } from '../../model/models';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  font-weight: 400;

  & > button > svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  & > button:first-child > svg {
    transform: rotate(90deg);
  }

  & > button:last-child > svg {
    transform: rotate(-90deg);
  }
`;

type CalendarMonthSliderProps = {
  month: string;
  year: number;
  prev: () => void;
  next: () => void;
};

const CalendarMonthSliderView = memo(
  ({ month, year, prev, next }: CalendarMonthSliderProps) => {
    return (
      <Wrapper>
        <Button onClick={prev}>
          <ArrowIcon />
        </Button>
        <p>
          {month} {year}
        </p>
        <Button onClick={next}>
          <ArrowIcon />
        </Button>
      </Wrapper>
    );
  },
);

const CalendarMonthSliderContainer = () => {
  const { state, dispatch } = useCalendar();

  const month = useMemo(
    () => getMonthName(state.selectedMonth),
    [state.selectedMonth],
  );

  const prev = useCallback(
    () => dispatch({ type: CalendarActionKind.PREV_MONTH }),
    [dispatch],
  );
  const next = useCallback(
    () => dispatch({ type: CalendarActionKind.NEXT_MONTH }),
    [dispatch],
  );

  return (
    <CalendarMonthSliderView
      month={month}
      next={next}
      prev={prev}
      year={state.selectedYear}
    />
  );
};

export const CalendarMonthSlider = memo(CalendarMonthSliderContainer);
