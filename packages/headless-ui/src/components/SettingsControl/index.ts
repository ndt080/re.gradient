import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerControl } from '@shared/utils/registerAsPlayerControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import SettingsControl from './SettingsControl.tsx';

compose(
  register('re-settings', { tooltipText: 'Settings' }),
  withSolid,
  reChainPlayerInstance(),
  registerAsPlayerControl('settings'),
)(SettingsControl);
