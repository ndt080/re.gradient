import { Source } from '../../types';
import { useEngine } from '../../api/engine';

export const HTML5Engine = useEngine(({ player, engine, setOptions, onSourceChanged }) => {
  setOptions({
    priority: -1,
    // @NOTE: HTML5 media is supported in all browsers
    isSupported: () => true,
    isSourceSupported(type: string): CanPlayTypeResult {
      return player.$mediaEl.canPlayType(type);
    },
  });

  onSourceChanged(({ src, type }: Source) => {
    if (engine.isSourceSupported(type)) {
      engine.source = src;
      engine.sourceType = type;
      player.$mediaEl.src = src;
    } else {
      throw new Error('This source is not supported by the current playback engine');
    }
  });
});
