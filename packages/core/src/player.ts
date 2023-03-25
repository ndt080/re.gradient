import { EngineApi } from './api/engine';
import { LifecycleApi } from './api/lifecycle';
import { EventEmitterModule, FullscreenModule, Html5EngineModule } from './modules';
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
    this.triggerHook('created');
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
}

Player.use([Html5EngineModule, EventEmitterModule, FullscreenModule]);

export { Player };
