import { forwardRef, memo, useMemo } from 'react';
import styled from 'styled-components';

import { Button } from '@/shared/ui';
import { getDayOfWeek } from '@/shared/utils';

const Wrapper = styled(Button)<Pick<DayCardProps, 'isSelected'>>`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => props.theme.main.colors.black};

  cursor: pointer;

  & > span {
    font-size: 0.8rem;
  }

  & > p {
    font-weight: 400;
    font-size: 1.2rem;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;

    transition: all 150ms ease-in-out;

    background-color: ${(props) =>
      props.isSelected ? props.theme.main.colors.primary : 'transparent'};
    color: ${(props) =>
      props.isSelected
        ? props.theme.main.colors.white
        : props.theme.main.colors.black};
  }
`;

type DayCardProps = {
  day: number;
  isSelected?: boolean;
  onSelect: (day: number) => void;
};

const DayCardView = forwardRef<HTMLButtonElement, DayCardProps>(
  ({ day, isSelected = false, onSelect }, ref) => {
    const dayOfWeek = useMemo(() => getDayOfWeek(day), [day]);

    return (
      <Wrapper isSelected={isSelected} ref={ref} onClick={() => onSelect(day)}>
        <span>{dayOfWeek}</span>
        <p>{day}</p>
      </Wrapper>
    );
  },
);

export const DayCard = memo(DayCardView);
