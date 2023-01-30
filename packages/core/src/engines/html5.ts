import { PlayerEngine } from '../api/engine';
import { useModule } from '../api/module';

class Html5Engine extends PlayerEngine {
  isSupported(): boolean {
    // HTML5 media is supported in all browsers
    return true;
  }

  isSourceSupported(type: string): CanPlayTypeResult {
    return this._player.$mediaEl.canPlayType(type);
  }
}

export const Html5EngineModule = useModule(({ player, onDispose }) => {
  const engine = new Html5Engine(player);
  player.installEngine(engine);

  onDispose(() => engine.dispose());
});
