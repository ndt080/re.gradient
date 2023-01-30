import type Player from '../../api/player';

export type HookFn = (player: Player) => void;

export class HookStore {
  private readonly _hooks: Set<HookFn> = new Set<HookFn>();

  get hooks() {
    return this._hooks;
  }

  dispatch(fn: HookFn) {
    this._hooks.add(fn);
  }

  clear() {
    this._hooks.clear();
  }
}
