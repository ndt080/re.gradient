import type { Source } from '../core/types';
import { useEngineModule } from '../utils/useEngineModule';

export const HTML5Engine = useEngineModule(({ player, engine, setOptions, onSourceChanged }) => {
  setOptions({
    priority: -1,
    isSupported: () => true,
    isSourceSupported(source: Source): CanPlayTypeResult {
      return source.type ? player.$mediaEl.canPlayType(source.type) : 'probably';
    },
  });

  onSourceChanged((source: Source) => {
    if (engine.isSourceSupported(source)) {
      player.$mediaEl.src = source.src;
    } else {
      engine.source = null;
      throw new Error('This source is not supported by the current playback engine');
    }
  });
});
