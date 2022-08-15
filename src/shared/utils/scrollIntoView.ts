import { RefObject } from 'react';

export const scrollIntoView = (
  ref: RefObject<HTMLElement>,
  options?: ScrollIntoViewOptions,
) => {
  ref.current?.scrollIntoView(options);
};
