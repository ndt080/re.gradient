import { HookFn, HookStore } from './hook-store';
import Player from '../../api/player';
import { useModule } from '../../api/module';
import { usePlayerExtend } from '../../utils/usePlayerExtend';

export enum LifecycleHook {
  CREATED = "created",
  BEFORE_DISPOSED = "beforeDisposed",
}

const createLifecycleHook = (name: LifecycleHook) => {
  return (player: Player, hook: HookFn) => {
    player._hooks[name].dispatch(hook);
  };
};

export const Lifecycle = useModule(({ player }) => {
  const hooks = {} as Record<LifecycleHook, HookStore>;

  Object.values(LifecycleHook).forEach((key: LifecycleHook) => {
    hooks[key] = new HookStore();
  });

  usePlayerExtend({
    _hooks: hooks,
    _triggerHook(name: LifecycleHook) {
      hooks[name].hooks.forEach((hook) => {
        hook(player);
      });
    },
    _clearHook(name: LifecycleHook) {
      hooks[name].hooks.clear();
    },
    _clearHooks() {
      Object.values(LifecycleHook).forEach((name: LifecycleHook) => {
        hooks[name].hooks.clear();
      });
    },
  });
});

export interface Lifecycle {
  readonly _hooks: Record<LifecycleHook, HookStore>;

  _triggerHook(name: LifecycleHook): void;
  _clearHook(name: LifecycleHook): void;
  _clearHooks(): void;
}

export const onCreated = createLifecycleHook(LifecycleHook.CREATED);
export const onBeforeDisposed = createLifecycleHook(LifecycleHook.BEFORE_DISPOSED);
