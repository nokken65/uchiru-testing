import { CSSProperties, memo, PropsWithChildren } from 'react';
import styled from 'styled-components';

type Attributes = Pick<
  CSSProperties,
  'alignItems' | 'justifyContent' | 'padding'
>;

const Wrapper = styled.tr<Attributes>`
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.main.maxWidth.lg};
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding};
  overflow: hidden;
`;

Wrapper.defaultProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0',
};

type TableRowContainerProps = PropsWithChildren<Attributes>;

const TableRowContainerView = ({
  children,
  ...props
}: TableRowContainerProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export const TableRowContainer = memo(TableRowContainerView);
