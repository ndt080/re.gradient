import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsContainer } from '@shared/utils/registerAsContainer.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import Popover, { PopoverProps } from './Popover.tsx';

compose(
  register('re-popover', {
    for: '',
    placement: 'top',
  }),
  withSolid,
  providePlayer(),
  registerAsContainer('popover'),
)(Popover);

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      're-popover': PopoverProps;
    }
  }
}
