import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import PlayControl from './PlayControl.tsx';

compose(
  register('re-play', {
    tooltipPlayText: 'Play',
    tooltipPauseText: 'Pause',
  }),
  withSolid,
  reChainPlayerInstance(),
  registerAsPlayerControl('play'),
)(PlayControl);
