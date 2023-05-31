import type { Player } from '../player';

export type HookFn = (player: Player, ...args) => void;

export type HookStore = {
  callbacks: Set<HookFn>;
  dispatch: (fn: HookFn) => Set<HookFn>;
  clear: () => void;
};

export type LifecycleHook = 'created' | 'before_disposed';
