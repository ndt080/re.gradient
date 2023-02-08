import { Player } from './player';

export type HookFn = (player: Player, ...args) => void;

export type HookStore = {
  hooks: Set<HookFn>;
  dispatch: (fn: HookFn) => Set<HookFn>;
  clear: () => void;
}

export type LifecycleHook = 'created' | 'before_disposed';

function useHookStore(): HookStore {
  const hooks: Set<HookFn> = new Set<HookFn>();

  const dispatch = (fn: HookFn) => hooks.add(fn);
  const clear = () => hooks.clear();

  return { hooks, dispatch, clear };
}

function createLifecycleHook(name: LifecycleHook) {
  return ({ hooks }: Player, hook: HookFn) => {
    if (!hooks[name]) {
      hooks[name] = useHookStore();
    }
    hooks[name].dispatch(hook);
  };
}

export function useLifecycle() {
  const hooks = {} as Record<LifecycleHook, HookStore>;

  return {
    hooks,
    triggerHook(this: Player, name: LifecycleHook, ...args) {
      hooks[name].hooks.forEach((hook) => hook(this, ...args));
    },
    clearHook(name: LifecycleHook) {
      hooks[name].hooks.clear();
    },
    clearHooks() {
      Object.values(hooks).forEach((store: HookStore) => store.clear());
    },
  };
}

export const onCreated = createLifecycleHook('created');
export const onBeforeDisposed = createLifecycleHook('before_disposed');

