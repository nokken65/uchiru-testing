import { memo, useCallback } from 'react';
import styled from 'styled-components';

import { EventsActionKind, eventsModel } from '@/entities/Event';
import { AddIcon } from '@/shared/icons';
import { Button } from '@/shared/ui';

const AddIconStyled = styled(AddIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

type AddEventProps = {
  add: (date: string) => void;
};

const AddEventView = ({ add }: AddEventProps) => {
  const handleClick = () => {
    const input = prompt('Enter event time:\nYYYY-MM-DD HH:mm:ss');
    if (input) {
      add(input);
    }
  };

  return (
    <Button onClick={handleClick}>
      <AddIconStyled />
    </Button>
  );
};

const AddEventContainer = () => {
  const { dispatch } = eventsModel.useEvents();

  const add = useCallback(
    (date: string) => {
      dispatch({ type: EventsActionKind.ADD, payload: date });
    },
    [dispatch],
  );

  return <AddEventView add={add} />;
};

export const AddEvent = memo(AddEventContainer);
