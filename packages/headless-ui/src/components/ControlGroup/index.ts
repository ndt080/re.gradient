import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsContainer } from '@shared/utils/registerAsContainer.ts';
import { registerStyleSheet } from '@shared/utils/registerStyleSheet.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import style from './ControlGroup.scss?inline';
import ControlGroup from './ControlGroup.tsx';

compose(
  register('re-control-group', {
    moveWaitingTime: 3000,
  }),
  withSolid,
  registerStyleSheet(style),
  providePlayer(),
  registerAsContainer('control-group'),
)(ControlGroup);
