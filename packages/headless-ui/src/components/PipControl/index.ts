import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import PipControl from '@/components/PipControl/PipControl.tsx';

compose(
  register('re-pip', {
    tooltipEnterText: 'Enter Picture-in-Picture',
    tooltipLeaveText: 'Leave Picture-in-Picture',
  }),
  withSolid,
  reChainPlayerInstance(),
  registerAsPlayerControl('pip'),
)(PipControl);
