import { Player } from '@/player';
import { HookFn, LifecycleHook } from '@/types/lifecycle';

export function createHooksStore() {
  const callbacks = new Set<HookFn>();

  const clear = () => callbacks.clear();
  const dispatch = (fn: HookFn) => callbacks.add(fn);

  return { callbacks, dispatch, clear };
}

function createLifecycleHook(name: LifecycleHook) {
  return ({ __hooks__ }: Player, hook: HookFn) => {
    if (!__hooks__[name]) {
      __hooks__[name] = createHooksStore();
    }
    __hooks__[name].dispatch(hook);
  };
}

export const onCreated = createLifecycleHook('created');
export const onBeforeDisposed = createLifecycleHook('before_disposed');
