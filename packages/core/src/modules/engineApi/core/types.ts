import { PlayerModuleContext } from '@/types';

import { Engine } from './engine';

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

export type SourceType = 'video/ogg' | 'video/avi' | 'video/mp4' | 'video/JPEG' | 'video/jpeg200';

export interface Source {
  src: string;
  type: SourceType;
}
