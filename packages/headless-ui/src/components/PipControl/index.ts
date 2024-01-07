import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import PipControl from '@/components/PipControl/PipControl.tsx';

compose(
  register('re-pip', {
    tooltipEnterText: 'Enter Picture-in-Picture',
    tooltipLeaveText: 'Leave Picture-in-Picture',
  }),
  withSolid,
  providePlayer(),
  registerAsControl('pip'),
)(PipControl);
