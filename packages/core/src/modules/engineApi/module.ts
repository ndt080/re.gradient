import { useModule } from '@/utils';

import { Engine } from './core/engine';
import { Source } from './core/types';

const EngineApiModule = useModule(({ player }) => {
  Reflect.set(player, '__engines__', []);

  player.installEngine = function (engine: Engine) {
    if (!engine || this.__engines__.indexOf(engine) >= 0) return;

    if (engine.isSupported()) {
      this.__engines__.push(engine);
    }

    this.__engines__.sort((e1, e2) => {
      if (e1.priority < e2.priority) return 1;
      if (e1.priority > e2.priority) return -1;
      return 0;
    });
  };

  player.loadSource = function (source: Source | string) {
    if (typeof source === 'string') {
      source = { src: source } as Source;
    }

    if (!source?.src) return;

    for (const engine of this.__engines__) {
      if (!engine.isSupported()) continue;
      if (!engine.isSourceSupported(source as Source)) continue;

      engine.load(source as Source);
      break;
    }
  };
});

export default EngineApiModule;
