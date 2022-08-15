import 'reseter.css';
import './index.css';

import { ReactNode } from 'react';

import { Routing } from '@/pages';
import { theme } from '@/shared/styles';

import { withProviders } from './providers';

const AppView = () => {
  return <Routing />;
};

export const App = withProviders({ theme })(
  AppView as () => ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as React.ComponentType<any>;
