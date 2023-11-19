import { appendStyleSheet } from '@shared/utils/appendStyleSheet.ts';
import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import style from './TimeControl.scss?inline';
import TimeControl from './TimeControl.tsx';

compose(
  register('re-timeline', {}),
  withSolid,
  appendStyleSheet(style),
  reChainPlayerInstance(),
  registerAsPlayerControl('timeline'),
)(TimeControl);
