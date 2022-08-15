import { memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { TableRowContainer } from '@/shared/ui';

const Container = styled.td`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CalendarBodyView = ({ children }: PropsWithChildren) => {
  return (
    <tbody>
      <TableRowContainer>
        <Container>{children}</Container>
      </TableRowContainer>
    </tbody>
  );
};

export const CalendarBody = memo(CalendarBodyView);
