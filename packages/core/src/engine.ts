import type {
  EnginePriority,
  isSourceSupportedFn,
  isSupportedFn,
  SourceHandler,
} from '@/models/engine';
import type { Source } from '@/models/source';
import { createUUID } from '@/utils';

class Engine {
  readonly id: string;
  priority: EnginePriority;
  source: Source | null;
  isSupported: isSupportedFn;
  isSourceSupported: isSourceSupportedFn;
  private _sourceHandlers = new Set<SourceHandler>();

  constructor(
    priority: EnginePriority = -1,
    isSupported = () => true,
    isSourceSupported = (_: Source): CanPlayTypeResult => 'probably',
  ) {
    this.id = createUUID('engine');
    this.priority = priority;
    this.source = null;
    this.isSupported = isSupported;
    this.isSourceSupported = isSourceSupported;
  }

  registerSourceHandler(fn: SourceHandler) {
    if (this._sourceHandlers.has(fn)) return;
    this._sourceHandlers.add(fn);
  }

  load(src: Source) {
    this.source = src;
    this._sourceHandlers.forEach((fn) => fn(src));
  }
}

export { Engine };


