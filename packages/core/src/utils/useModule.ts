import type {
  PlayerModule,
  PlayerModuleContext,
  PlayerModuleDisposeFn,
  PlayerModuleFn,
} from '@/models/module';
import type { Player } from '@/player';

export function useModule(callback: (context: PlayerModuleContext) => void): PlayerModule {
  let disposeHandlerFn: PlayerModuleDisposeFn;

  const onDispose = (fn: PlayerModuleDisposeFn) => {
    disposeHandlerFn = fn;
  };

  const moduleFn: PlayerModuleFn = (player: Player) => {
    callback({ player, onDispose });
    return player;
  };

  const dispose = () => {
    disposeHandlerFn?.();
  };

  return { moduleFn, dispose };
}
