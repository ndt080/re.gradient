import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import Tooltip, { TooltipProps } from './Tooltip.tsx';

compose(
  register('re-tooltip', {
    text: '',
    target: undefined,
  }),
  withSolid,
)(Tooltip);

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      're-tooltip': TooltipProps;
    }
  }
}
