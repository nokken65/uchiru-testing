import { DefaultTheme } from 'styled-components';

import { composeFunc } from '@/shared/utils/composeFunc';

import { withTheme } from './withTheme';

type ProvidersProps = {
  theme: DefaultTheme;
};

export const withProviders = ({ theme }: ProvidersProps) =>
  composeFunc(withTheme(theme));
