import { HookFn, LifecycleHook } from '@/models/lifecycle';

import { Player } from '../api';

export function createHooksStore() {
  const callbacks = new Set<HookFn>();

  const clear = () => callbacks.clear();
  const dispatch = (fn: HookFn) => callbacks.add(fn);

  return { callbacks, dispatch, clear };
}

function createLifecycleHook(name: LifecycleHook) {
  return ({ _hooks }: Player, hook: HookFn) => {
    if (!_hooks[name]) {
      _hooks[name] = createHooksStore();
    }
    _hooks[name].dispatch(hook);
  };
}

export const onCreated = createLifecycleHook('created');
export const onBeforeDisposed = createLifecycleHook('before_disposed');
