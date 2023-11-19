import { reChainPlayerInstance } from '@shared/utils/reChainPlayerInstance.ts';
import { registerAsPlayerContainer } from '@shared/utils/registerAsPlayerContainer.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import TimeView from './TimeView.tsx';

compose(
  register('re-time', { variant: 'both' }),
  withSolid,
  reChainPlayerInstance(),
  registerAsPlayerContainer('time', true),
)(TimeView);
