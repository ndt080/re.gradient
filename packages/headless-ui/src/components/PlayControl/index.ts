import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import PlayControl from './PlayControl.tsx';

compose(
  register('re-play', {
    tooltipPlayText: 'Play',
    tooltipPauseText: 'Pause',
  }),
  withSolid,
  providePlayer(),
  registerAsControl('play'),
)(PlayControl);
