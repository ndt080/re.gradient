import { createUUID } from '../utils';
import { PlayerModule } from './module';
import { PlayerEngine } from './engine';
import { EventEmitter, FullscreenMode, HTML5Engine } from '../modules';
import { HookStore, LifecycleHook, useLifecycle } from './lifecycle';
import { Source } from '../types';

export class Player {
  private static readonly _modules: PlayerModule[] = [];
  private readonly _engines: PlayerEngine[] = [];

  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  readonly hooks: Record<LifecycleHook, HookStore>;
  readonly triggerHook: (name: LifecycleHook, ...args) => void;
  readonly clearHook: (name: LifecycleHook, ...args) => void;
  readonly clearHooks: () => void;

  load(src: Source) {
    this._engines.forEach(({ load, isSupported, isSourceSupported }: PlayerEngine) => {
      if(!isSupported()) return;
      if(!isSourceSupported(src.type)) return;

      load(src);
    });
  }

  constructor(mediaEl: HTMLMediaElement, containerEl: HTMLElement) {
    this.id = createUUID('player');
    this.$mediaEl = mediaEl;
    this.$containerEl = containerEl;

    const { hooks, triggerHook, clearHook, clearHooks } = useLifecycle();

    this.hooks = hooks;
    this.triggerHook = triggerHook;
    this.clearHook = clearHook;
    this.clearHooks = clearHooks;

    Player._modules.forEach((module) => module.moduleFn(this));
    this.triggerHook('created');
  }

  static installModule(module: PlayerModule) {
    if (!!module && this._modules.indexOf(module) < 0) {
      this._modules.push(module);
    }
  }

  static use(modules: PlayerModule[]) {
    modules.forEach((m) => this.installModule(m));
    return this;
  }

  dispose() {
    this.triggerHook('before_disposed');
    Player._modules.forEach((module) => module.dispose());
    this.clearHooks();
  }

  installEngine(engine: PlayerEngine) {
    if (!!engine && this._engines.indexOf(engine) < 0) {
      if (engine.isSupported()) {
        this._engines.push(engine);
      }
    }
    this._engines.sort((e1, e2) => e1.priority < e2.priority ? 1 : 0);
  }
}

// @NOTE: Register default modules
Player.use([HTML5Engine, EventEmitter, FullscreenMode]);

declare type CoreModules = EventEmitter & FullscreenMode;
export declare interface Player extends CoreModules {}


