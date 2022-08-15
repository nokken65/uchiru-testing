import { forwardRef, memo } from 'react';
import styled from 'styled-components';

const Cell = styled.div<{
  columns: number;
  x: number;
  y: number;
  isActiveEvent: boolean;
  hasEvent: boolean;
}>`
  width: 48px;
  min-width: 48px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.main.colors.grayPale};
  z-index: 1;

  ${(props) => (props.y === 0 ? 'border-top:none;' : null)}
  ${(props) => (props.y === 23 ? 'border-bottom:none;' : null)}
  ${(props) => (props.x === 0 ? 'border-left:none;' : null)}
  ${(props) => (props.x === props.columns - 1 ? 'border-right:none;' : null)}


  cursor: ${(props) => (props.hasEvent ? 'pointer' : 'auto')};

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 90%;

    transition: all 150ms ease-in-out;

    background-color: ${(props) => {
      if (props.hasEvent) {
        if (props.isActiveEvent) {
          return props.theme.main.colors.blue;
        }

        return props.theme.main.colors.bluePale;
      }

      return 'white';
    }};
  }
`;

type EventsGridCellProps = {
  eventId: string | null;
  x: number;
  y: number;
  columns: number;
  isActiveEvent: boolean;
  onSelect: (eventId: string) => void;
};

const EventsGridCellView = forwardRef<HTMLDivElement, EventsGridCellProps>(
  ({ eventId, columns, x, y, isActiveEvent, onSelect }, ref) => {
    return (
      <Cell
        columns={columns}
        hasEvent={!!eventId}
        isActiveEvent={isActiveEvent}
        ref={ref}
        role='cell'
        x={x}
        y={y}
        onClick={() => onSelect(eventId ?? '')}
      />
    );
  },
);

export const EventsGridCell = memo(EventsGridCellView);
