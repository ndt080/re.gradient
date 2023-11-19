import { appendStyleSheet } from '@shared/utils/appendStyleSheet.ts';
import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import style from './VolumeControl.scss?inline';
import VolumeControl from './VolumeControl.tsx';

compose(
  register('re-volume', {
    tooltipMuteText: 'Mute',
    tooltipUnmuteText: 'Unmute',
  }),
  withSolid,
  appendStyleSheet(style),
  reChainPlayerInstance(),
  registerAsPlayerControl('volume'),
)(VolumeControl);
