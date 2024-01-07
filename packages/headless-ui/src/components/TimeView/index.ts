import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsContainer } from '@shared/utils/registerAsContainer.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import TimeView from './TimeView.tsx';

compose(
  register('re-time', { variant: 'both' }),
  withSolid,
  providePlayer(),
  registerAsContainer('time', true),
)(TimeView);
