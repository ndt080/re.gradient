import { Engine } from '@/engine';
import type { EngineContext, EngineOptions, SourceHandler } from '@/types/engine';

import { useModule } from './useModule';

export function useEngineModule(callback: (ctx: EngineContext) => void) {
  return useModule(({ player, onDispose, ...rest }) => {
    const engine = new Engine();

    const setOptions = (options: EngineOptions) => {
      engine.priority = options.priority;
      engine.isSupported = options.isSupported;
      engine.isSourceSupported = options.isSourceSupported;
    };

    const onSourceChanged = (fn: SourceHandler) => {
      engine.registerSourceHandler(fn);
    };

    callback({ engine, player, setOptions, onSourceChanged, onDispose, ...rest });

    player.installEngine(engine);
  });
}
