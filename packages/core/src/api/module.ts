import type Player from './player';

export type PlayerModuleFn = (player: Player) => Player;

export interface PlayerModule {
  fn: PlayerModuleFn;
  dispose(): void;
}

export interface PlayerModuleContext {
  player: Player;
  onDispose(handler: () => void): void;
}

export function useModule(callback: (context: PlayerModuleContext) => void): PlayerModule {
  let disposeHandlerFn: () => void;

  const onDispose = (handler: () => void) => {
    disposeHandlerFn = handler;
  };

  const fn: PlayerModuleFn = (player: Player) => {
    callback({ player, onDispose });
    return player;
  };

  const dispose = () => {
    disposeHandlerFn?.();
  };

  return { fn, dispose };
}
