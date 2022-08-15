import {
  ButtonHTMLAttributes,
  forwardRef,
  memo,
  PropsWithChildren,
} from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  cursor: pointer;
  appearance: none;
  background: none;
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.main.colors.primary};

  transition: all 150ms ease-in-out;

  &:hover {
    background: ${(props) => props.theme.main.colors.primary}10;
  }
`;

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {}
>;

const ButtonView = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper ref={ref} {...props}>
        {children}
      </Wrapper>
    );
  },
);

export const Button = memo(ButtonView);
