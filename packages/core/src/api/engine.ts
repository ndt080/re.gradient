import type { Engine } from '@/engine';
import { PlayerCore } from '@/player-core';
import type { Source } from '@/types/source';

export function withEngineApi<T extends typeof PlayerCore>(constructor: T) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return class extends constructor {
    readonly _engines: Engine[] = [];

    installEngine(engine: Engine) {
      if (!engine || this._engines.indexOf(engine) >= 0) return;

      if (engine.isSupported()) {
        this._engines.push(engine);
      }

      this._engines.sort((e1, e2) => (e1.priority < e2.priority ? 1 : 0));
    }

    load(source: Source | string) {
      if (typeof source === 'string') {
        source = { src: source } as Source;
      }

      if (!source?.src) return;

      this._engines.forEach((engine: Engine) => {
        if (!engine.isSupported()) return;
        if (!engine.isSourceSupported(source as Source)) return;

        engine.load(source as Source);
      });
    }
  };
}

export declare class EngineApi {
  installEngine: (engine: Engine) => void;
  load: (src: Source) => void;
  private readonly _engines: Engine[];
}
