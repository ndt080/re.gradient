import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import Tooltip, { TooltipProps } from './TooltipCE.tsx';

compose(
  register('re-tooltip', {
    text: '',
    target: undefined,
  }),
  withSolid,
)(Tooltip);

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      're-tooltip': TooltipProps;
    }
  }
}
