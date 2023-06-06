import type { PlayerCore } from '@/player-core';
import type { HookStore, LifecycleHook, SpreadableConstructor } from '@/types';

export function withLifecycleApi<T extends SpreadableConstructor<PlayerCore>>(constructor: T) {
  return class extends constructor {
    readonly _hooks = {} as Record<LifecycleHook, HookStore>;

    triggerHook(this, name: LifecycleHook, ...args) {
      this._hooks[name]?.callbacks.forEach((hook) => hook(this, ...args));
    }

    dispose() {
      super.dispose();
      Object.values(this._hooks).forEach((store: HookStore) => store.clear());
    }
  };
}

export declare class LifecycleApi {
  readonly _hooks: Record<LifecycleHook, HookStore>;
  triggerHook: (name: LifecycleHook, ...args) => void;
}
