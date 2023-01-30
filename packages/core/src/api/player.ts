import { createUUID } from '../utils/createUUID';
import { PlayerModule } from './module';
import { PlayerEngine } from './engine';
import { EventEmitter } from '../modules/events-emmiter';
import { FullscreenMode } from '../modules/fullscreen/fullscreen';
import { Lifecycle, LifecycleHook } from '../modules/lifecycle';
import { Html5EngineModule } from '../engines/html5';

class Player {
  private static readonly _modules: PlayerModule[] = [];
  private readonly _engines: PlayerEngine[] = [];

  readonly id: string;
  readonly $mediaEl: HTMLMediaElement;
  readonly $containerEl: HTMLElement;

  constructor(mediaEl: HTMLMediaElement, containerEl: HTMLElement) {
    this.id = createUUID("player");
    this.$mediaEl = mediaEl;
    this.$containerEl = containerEl;

    Player._modules.forEach((module) => module.fn(this));
    this._triggerHook(LifecycleHook.CREATED);
  }

  dispose() {
    Player._modules.forEach((module) => module.dispose());
    this._triggerHook(LifecycleHook.BEFORE_DISPOSED);
    this._clearHooks();
  }

  installEngine(engine: PlayerEngine) {
    if (!!engine && this._engines.indexOf(engine) < 0) {
      if(engine.isSupported()) {
        this._engines.push(engine);
      }
    }
    this._engines.sort((e1, e2) => e1.priority > e2.priority ? 1 : 0);
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
}

type CoreModules = EventEmitter & FullscreenMode & Lifecycle;

interface Player extends CoreModules {
  [key: string]: unknown;
}

// Register default modules
Player.use([Html5EngineModule, EventEmitter, FullscreenMode, Lifecycle]);
export default Player;


