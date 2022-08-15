import { memo, useCallback } from 'react';
import styled from 'styled-components';

import { CalendarActionKind, calendarModel } from '@/entities/Calendar';
import { Button } from '@/shared/ui';

const TodayButton = styled(Button)`
  font-size: 1.2rem;
`;

type SelectTodayProps = {
  onDelete: () => void;
};

const SelectTodayView = ({ onDelete }: SelectTodayProps) => {
  return <TodayButton onClick={onDelete}>Today</TodayButton>;
};

const SelectTodayContainer = () => {
  const { dispatch } = calendarModel.useCalendar();

  const onDelete = useCallback(() => {
    dispatch({ type: CalendarActionKind.SELECT_TODAY });
  }, [dispatch]);

  return <SelectTodayView onDelete={onDelete} />;
};

export const SelectToday = memo(SelectTodayContainer);
