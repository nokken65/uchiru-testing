import { memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { TableRowContainer } from '@/shared/ui';

const Wrapper = styled.thead`
  background-color: ${(props) => props.theme.main.colors.grayPale};
  border: 2px solid ${(props) => props.theme.main.colors.gray};
  border-left: none;
  border-right: none;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.th`
  max-width: calc(100% - 48px);
  display: flex;
  flex-direction: column;
`;

const CalendarHeaderView = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <TableRowContainer padding='0.2rem 0'>
        <th style={{ minWidth: '48px' }} />
        <Container>{children}</Container>
      </TableRowContainer>
    </Wrapper>
  );
};

export const CalendarHeader = memo(CalendarHeaderView);
