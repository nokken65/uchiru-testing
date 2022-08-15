import { memo, useCallback } from 'react';
import styled from 'styled-components';

import { EventsActionKind, eventsModel } from '@/entities/Event';
import { Button } from '@/shared/ui';

const DeleteButton = styled(Button)`
  font-size: 1.2rem;
`;

type DeleteEventProps = {
  onDelete: () => void;
};

const DeleteEventView = ({ onDelete }: DeleteEventProps) => {
  return <DeleteButton onClick={onDelete}>Delete</DeleteButton>;
};

const DeleteEventContainer = () => {
  const { state, dispatch } = eventsModel.useEvents();

  const onDelete = useCallback(() => {
    dispatch({ type: EventsActionKind.DELETE, payload: state.activeEventId });
  }, [state, dispatch]);

  return state.activeEventId ? <DeleteEventView onDelete={onDelete} /> : null;
};

export const DeleteEvent = memo(DeleteEventContainer);
