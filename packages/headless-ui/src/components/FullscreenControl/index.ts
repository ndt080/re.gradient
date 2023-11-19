import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import FullscreenControl from './FullscreenControl.tsx';

compose(
  register('re-fullscreen', {
    tooltipEnterText: 'Enter FullScreen',
    tooltipLeaveText: 'Leave FullScreen',
  }),
  withSolid,
  reChainPlayerInstance(),
  registerAsPlayerControl('fullscreen'),
)(FullscreenControl);
