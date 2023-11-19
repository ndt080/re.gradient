import { createUUID } from '@/utils';

import type {
  EnginePriority,
  isSourceSupportedFn,
  isSupportedFn,
  Source,
  SourceHandler,
} from './types';

class Engine {
  readonly id: string;
  priority: EnginePriority;
  source: Source | null;
  isSupported: isSupportedFn;
  isSourceSupported: isSourceSupportedFn;

  private __sourceHandlers__ = new Set<SourceHandler>();

  constructor(
    priority: EnginePriority = -1,
    isSupported = (() => true) as isSupportedFn,
    isSourceSupported = (() => 'probably') as isSourceSupportedFn,
  ) {
    this.id = createUUID('engine');
    this.priority = priority;
    this.source = null;
    this.isSupported = isSupported;
    this.isSourceSupported = isSourceSupported;
  }

  registerSourceHandler(fn: SourceHandler) {
    if (this.__sourceHandlers__.has(fn)) return;
    this.__sourceHandlers__.add(fn);
  }

  load(src: Source) {
    this.source = src;
    this.__sourceHandlers__.forEach((fn) => fn(src));
  }
}

export { Engine };


