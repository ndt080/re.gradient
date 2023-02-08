import type { Player } from './player';

export type PlayerModuleFn = (player: Player) => Player;
export type PlayerModuleDisposeFn = () => void;

export interface PlayerModule {
  moduleFn: PlayerModuleFn;
  dispose(): void;
}

export interface PlayerModuleContext {
  player: Player;
  onDispose(fn: () => void): void;
}

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
