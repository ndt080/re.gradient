import type { EmitterApi } from './modules/emitterApi';
import type { EngineApi } from './modules/engineApi';
import type { FullscreenApi } from './modules/fullscreenApi';
import type { TracksApi } from './modules/trackApi';
import { Player } from './player';

export { onBeforeDisposed, onCreated } from './modules/default/lifecycle-hooks';
export * from './modules/engineApi';
export * from './modules/trackApi';
export * from './types';
export * from './utils';

declare module './player' {
  interface Player extends EmitterApi, FullscreenApi, EngineApi, TracksApi {}
}

export { Player };
