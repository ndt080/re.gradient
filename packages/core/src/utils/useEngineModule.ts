import { Engine } from '@/engine';
import type { EngineContext, EngineOptions, SourceHandler } from '@/types/engine';

import { useModule } from './useModule';

/**
 * useEngineModule utility
 *
 * @description Abstraction over the useModule utility. Used to create a module that will register a new playback technology (Engine) in the player
 * @author Andrei Petrov
 *
 * @example
 * const MyEngine = useEngineModule(({ player, setOptions, onSourceChanged, onDispose }) => {
 *   let tech: SomeTech | null = null;
 *
 *   setOptions({
 *     priority: 1,
 *     isSupported: () => SomeTech.isSupported(),
 *     isSourceSupported(source: Source): CanPlayTypeResult {
 *       const typeRE = /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i;
 *       const extRE = /\.m3u8/i;
 *
 *       switch (true) {
 *         case typeRE.test(source.type):
 *           return 'probably';
 *         case extRE.test(source.src):
 *           return 'maybe';
 *         default:
 *           return '';
 *       }
 *     },
 *   });
 *
 *   onSourceChanged((source: Source) => {
 *     if (tech) {
 *       tech.destroy();
 *     }
 *
 *     tech = new SomeTech();
 *     tech.loadSource(source.src);
 *     tech.attachMedia(player.$mediaEl);
 *   });
 *
 *   onDispose(() => {
 *     tech.destroy();
 *   });
 * });
 *
 * Player.use([MyEngine]);
 *
 * @param {Function} callback - the executable body of the module that implements the new playback technology (Engine)
 * @return {PlayerModule} - a new instance of the module
 */
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
