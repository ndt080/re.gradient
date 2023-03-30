import { EngineApi } from './api/engine';
import { LifecycleApi } from './api/lifecycle';
import type { EventEmitterModule, FullscreenModule } from './modules';
import { PlayerCore } from './player-core';
import { createUUID } from './utils';

type IPlayerCore = EventEmitterModule & FullscreenModule & LifecycleApi & EngineApi & PlayerCore;

class Player extends PlayerCore {
  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  constructor(mediaEl: HTMLMediaElement, containerEl: HTMLElement) {
    super();
    this.id = createUUID('player');
    this.$mediaEl = mediaEl;
    this.$containerEl = containerEl;

    Player._modules.forEach((module) => module.moduleFn(this));
  }

  togglePlay() {
    this.$mediaEl.paused || this.$mediaEl.ended ? this.$mediaEl.play() : this.$mediaEl.pause();
  }

  dispose() {
    this.triggerHook('before_disposed');
    super.dispose();
  }
}

declare interface Player extends IPlayerCore {
  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  togglePlay(): void;
}

export { Player };
