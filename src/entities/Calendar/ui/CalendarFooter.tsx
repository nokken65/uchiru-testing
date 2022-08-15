import { memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { TableRowContainer } from '@/shared/ui';

const Wrapper = styled.tfoot`
  background-color: ${(props) => props.theme.main.colors.grayPale};
  border: 2px solid ${(props) => props.theme.main.colors.gray};
  border-left: none;
  border-right: none;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

const Container = styled.td`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CalendarFooterView = memo(({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <TableRowContainer padding='1rem'>
        <Container>{children}</Container>
      </TableRowContainer>
    </Wrapper>
  );
});

export const CalendarFooter = memo(CalendarFooterView);
