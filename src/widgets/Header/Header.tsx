import { memo } from 'react';
import styled from 'styled-components';

import { AddEvent } from '@/features/addEvent';
import { Container } from '@/shared/ui';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  padding: 0.5rem;

  @media screen and (max-width: 400px) {
    padding: 0;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  margin: 0;
`;

const HeaderView = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Interview Calendar</Title>
        <AddEvent />
      </Container>
    </Wrapper>
  );
};

export const Header = memo(HeaderView);
