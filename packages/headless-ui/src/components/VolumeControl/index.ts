import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { registerStyleSheet } from '@shared/utils/registerStyleSheet.ts';
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
  registerStyleSheet(style),
  providePlayer(),
  registerAsControl('volume'),
)(VolumeControl);
