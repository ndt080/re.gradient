import type { Engine } from '@/engine';
import type { Source } from '@/models/source';
import { PlayerCore } from '@/player-core';

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

      this._engines.sort((e1, e2) => {
        if (e1.priority < e2.priority) return 1;
        if (e1.priority > e2.priority) return -1;
        return 0;
      });
    }

    load(source: Source | string) {
      if (typeof source === 'string') {
        source = { src: source } as Source;
      }

      if (!source?.src) return;

      for (const engine of this._engines) {
        if (!engine.isSupported()) continue;
        if (!engine.isSourceSupported(source as Source)) continue;

        engine.load(source as Source);
        break;
      }
    }
  };
}

export declare class EngineApi {
  installEngine: (engine: Engine) => void;
  load: (src: Source) => void;
  readonly _engines: Engine[];
}
