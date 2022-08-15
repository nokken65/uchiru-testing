import { CSSProperties, memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

type Attributes = Pick<
  CSSProperties,
  'alignItems' | 'justifyContent' | 'flexDirection' | 'gap' | 'padding'
>;

const Wrapper = styled.div<Attributes>`
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.main.maxWidth.lg};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
`;

Wrapper.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.25rem',
  padding: '1rem',
};

type ContainerProps = PropsWithChildren<Attributes>;

const ContainerView = ({ children, ...props }: ContainerProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export const Container = memo(ContainerView);
