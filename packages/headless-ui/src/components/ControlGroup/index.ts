import { appendStyleSheet } from '@shared/utils/appendStyleSheet.ts';
import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerContainer } from '@shared/utils/registerAsPlayerContainer.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import style from './ControlGroup.scss?inline';
import ControlGroup from './ControlGroup.tsx';

compose(
  register('re-control-group'),
  withSolid,
  appendStyleSheet(style),
  reChainPlayerInstance(),
  registerAsPlayerContainer('control-group'),
)(ControlGroup);

