import { withEmitterApi } from '@/api/emitter';
import { FullscreenApi, withFullscreenApi } from '@/api/fullscreen';
import { PlayerModule } from '@/types';

import { EmitterApi } from './api/emitter';
import { EngineApi } from './api/engine';
import { LifecycleApi } from './api/lifecycle';
import { TracksApi, withTracksApi } from './api/tracks';
import { PlayerCore } from './player-core';
import { createUUID } from './utils';

@withFullscreenApi
@withEmitterApi
@withTracksApi
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class Player extends PlayerCore {
  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  constructor(mediaEl: HTMLMediaElement, containerEl: HTMLElement, modules: PlayerModule[] = []) {
    super();
    this.id = createUUID('player');
    this.$mediaEl = mediaEl;
    this.$containerEl = containerEl;

    Player.use(modules);
    Player._modules.forEach((module) => module.moduleFn(this));
  }

  togglePlay(): Promise<void> | void {
    this.$mediaEl.paused || this.$mediaEl.ended ? this.$mediaEl.play() : this.$mediaEl.pause();
  }

  dispose() {
    this.triggerHook('before_disposed');
    super.dispose();
  }
}

type PlayerCoreWithApis = FullscreenApi &
  TracksApi &
  LifecycleApi &
  EngineApi &
  EmitterApi &
  PlayerCore;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
declare interface Player extends PlayerCoreWithApis {
  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  togglePlay(): void;
}

export { Player };
