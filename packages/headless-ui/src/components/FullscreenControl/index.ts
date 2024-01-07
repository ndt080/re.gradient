import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import FullscreenControl from './FullscreenControl.tsx';

compose(
  register('re-fullscreen', {
    tooltipEnterText: 'Enter FullScreen',
    tooltipLeaveText: 'Leave FullScreen',
  }),
  withSolid,
  providePlayer(),
  registerAsControl('fullscreen'),
)(FullscreenControl);
