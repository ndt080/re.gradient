import { Player } from '../player';

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
