import { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export const withTheme =
  (theme: DefaultTheme) => (component: () => ReactNode) => () =>
    <ThemeProvider theme={theme}>{component()}</ThemeProvider>;
