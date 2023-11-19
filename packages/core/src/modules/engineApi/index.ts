import type { Engine } from './core/engine';
import type { Source } from './core/types';
import EngineApiModule from './module';

export * from './core/types';
export * from './engines/html5-engine';
export * from './utils/safeLoadSource';
export * from './utils/useEngineModule';

export default EngineApiModule;

export declare class EngineApi {
  installEngine: (engine: Engine) => void;
  loadSource: (src: Source | string) => void;
  readonly __engines__: Engine[];
}
