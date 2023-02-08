import { PlayerModuleContext, useModule } from './module';
import { Source } from '../types';

type SourceChangedFn = (src: Source) => void;

type PlayerEngineContext = PlayerModuleContext & {
  readonly engine: PlayerEngine;
  setOptions(options: PlayerEngineOptions): void;
  onSourceChanged(SourceChangedFn): void;
};

interface PlayerEngineOptions {
  priority: -1 | 0 | 1;

  isSupported(): boolean;

  isSourceSupported(type: string): CanPlayTypeResult;

  [key: string]: unknown;
}

export interface PlayerEngine {
  priority: -1 | 0 | 1;
  source: string;
  sourceType: string;

  isSupported(): boolean;

  load(src: Source): void;

  isSourceSupported(type: string): CanPlayTypeResult;

  [key: string]: unknown;
}

export function useEngine(callback: (ctx: PlayerEngineContext) => void) {
  const sourceChangedFns = new Set<SourceChangedFn>();

  const engine = {
    priority: -1,
    isSupported: () => true,
    load(src: Source) {
      sourceChangedFns.forEach((fn) => fn(src));
    },
    isSourceSupported: (_) => 'probably',
  } as PlayerEngine;

  const setOptions = (options: PlayerEngineOptions) => {
    engine.priority = options.priority;
    engine.isSupported = options.isSupported;
    engine.isSourceSupported = options.isSourceSupported;
  };

  const onSourceChanged = (fn: SourceChangedFn) => {
    sourceChangedFns.add(fn);
  };

  return useModule(({ player, onDispose, ...rest }) => {
    const context = { engine, player, setOptions, onSourceChanged, onDispose, ...rest } as PlayerEngineContext;
    callback(context);

    player.installEngine(engine);
  });
}
