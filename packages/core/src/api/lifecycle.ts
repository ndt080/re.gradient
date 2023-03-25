import { PlayerCore } from '@/player-core';
import { HookStore, LifecycleHook } from '@/types/lifecycle';

export function withLifecycleApi<T extends typeof PlayerCore>(_: T) {
  return class extends PlayerCore {
    readonly _hooks = {} as Record<LifecycleHook, HookStore>;

    triggerHook(this, name: LifecycleHook, ...args) {
      this._hooks[name].hooks.forEach((hook) => hook(this, ...args));
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
