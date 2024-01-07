import { registerAsContainer } from '@shared/utils/registerAsContainer.ts';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';

import Player from './Player.tsx';

compose(
  register('re-player', {
    src: '',
    tracks: [],
    playsinline: true,
    autoplay: false,
    controls: false,
    muted: false,
    loop: false,
    poster: undefined,
    preload: undefined,
    mediaGroup: undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    crossOrigin: true,
  }),
  withSolid,
  registerAsContainer('video'),
)(Player);
