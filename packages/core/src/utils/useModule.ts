import type { Player } from '@/player';
import type {
  PlayerModule,
  PlayerModuleContext,
  PlayerModuleDisposeFn,
  PlayerModuleFn,
} from '@/types/module';

/**
 * useModule utility
 *
 * @description The function creates an instance of the module (an external extension of the player) using the resulting module body as a callback function
 * @author Andrei Petrov
 *
 * @example
 * const MyModule = useModule(({ player, onDispose }) => {
 *   const onPlayerError = () => console.error('Error!');
 *
 *   player.$mediaEl.addEventListener('error', onPlayerError);
 *
 *   onDispose(() => {
 *     player.$mediaEl.removeEventListener('error', onPlayerError);
 *   });
 * });
 *
 * Player.use([MyModule]);
 *
 * @param {Function} callback - executable body of the module (external extension)
 * @return {PlayerModule} - a new instance of the module (external extension)
 */
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
