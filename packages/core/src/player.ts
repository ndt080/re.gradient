import EmitterApiModule from '@/modules/emitterApi';
import EngineApiModule, { HTML5Engine } from '@/modules/engineApi';
import FullscreenApiModule from '@/modules/fullscreenApi';
import TracksApiModule from '@/modules/trackApi';
import { HookStore, LifecycleHook, PlayerModule } from '@/types';

import { createUUID } from './utils';

const DefaultModules: PlayerModule[] = [
  EmitterApiModule,
  FullscreenApiModule,
  EngineApiModule,
  TracksApiModule,
  HTML5Engine,
];

export class Player {
  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  readonly __modules__: PlayerModule[] = [];
  readonly __hooks__ = {} as Record<LifecycleHook, HookStore>;

  constructor(mediaEl: HTMLMediaElement, containerEl: HTMLElement, modules: PlayerModule[] = []) {
    this.id = createUUID('player');
    this.$mediaEl = mediaEl;
    this.$containerEl = containerEl;

    this.installModules(DefaultModules);
    this.installModules(modules);
    this.__modules__.forEach((module) => module.moduleFn(this));
  }

  triggerHook(this, name: LifecycleHook, ...args) {
    this.__hooks__[name]?.callbacks.forEach((hook) => hook(this, ...args));
  }

  togglePlay(): Promise<void> | void {
    this.$mediaEl.paused || this.$mediaEl.ended ? this.$mediaEl.play() : this.$mediaEl.pause();
  }

  dispose() {
    this.triggerHook('before_disposed');
    this.__modules__.forEach((module) => module.dispose());
    Object.values(this.__hooks__).forEach((store: HookStore) => store.clear());
  }

  hotInstallModules(modules: PlayerModule[]) {
    this.installModules(modules, true);
  }

  installModules(modules: PlayerModule[], hot = false) {
    for (const module of modules) {
      if (Boolean(module) && this.__modules__.indexOf(module) < 0) {
        this.__modules__.push(module);
        if (hot) module.moduleFn(this);
      }
    }
  }
}
