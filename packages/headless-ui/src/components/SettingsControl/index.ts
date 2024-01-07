import { providePlayer } from '@shared/utils/providePlayer.ts';
import { registerAsControl } from '@shared/utils/registerAsControl.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import SettingsControl from './SettingsControl.tsx';

compose(
  register('re-settings', { tooltipText: 'Settings' }),
  withSolid,
  providePlayer(),
  registerAsControl('settings'),
)(SettingsControl);
