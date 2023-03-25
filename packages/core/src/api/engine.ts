import type { Engine } from '@/engine';
import { PlayerCore } from '@/player-core';
import type { Source } from '@/types/source';

export function withEngineApi<T extends typeof PlayerCore>(_: T) {
  return class extends PlayerCore {
    readonly _engines: Engine[] = [];

    installEngine(engine: Engine) {
      if (!engine || this._engines.indexOf(engine) >= 0) return;

      if (engine.isSupported()) {
        this._engines.push(engine);
      }

      this._engines.sort((e1, e2) => (e1.priority < e2.priority ? 1 : 0));
    }

    load(source: Source) {
      this._engines.forEach(({ load, isSupported, isSourceSupported }: Engine) => {
        if (!isSupported()) return;
        if (!isSourceSupported(source)) return;

        load(source);
      });
    }
  };
}

export declare class EngineApi {
  installEngine: (engine: Engine) => void;
  load: (src: Source) => void;
  private readonly _engines: Engine[];
}
