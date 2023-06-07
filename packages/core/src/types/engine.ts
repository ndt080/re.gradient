import { Engine } from '@/engine';

import type { PlayerModuleContext } from './module';
import type { Source } from './source';

export type EnginePriority = -1 | 0 | 1;

export type SourceHandler = (source: Source) => void;
export type isSupportedFn = () => boolean;
export type isSourceSupportedFn = (source: Source) => CanPlayTypeResult;

export type EngineContext = PlayerModuleContext & {
  readonly engine: Engine;
  setOptions(options: EngineOptions): void;
  onSourceChanged(SourceChangedFn): void;
};

export type EngineOptions = {
  priority: EnginePriority;
  isSupported: isSupportedFn;
  isSourceSupported: isSourceSupportedFn;
} & Record<string, unknown>;
