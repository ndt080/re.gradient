import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { registerStyleSheet } from '@shared/utils/registerStyleSheet.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import style from './TimeControl.scss?inline';
import TimeControl from './TimeControl.tsx';

compose(
  register('re-timeline', {}),
  withSolid,
  registerStyleSheet(style),
  providePlayer(),
  registerAsControl('timeline'),
)(TimeControl);
