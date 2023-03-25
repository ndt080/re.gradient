import { HookFn, LifecycleHook } from '@/types/lifecycle';

import { Player } from '../api';

function createHooksStore() {
  const hooks = new Set<HookFn>();

  const clear = () => hooks.clear();
  const dispatch = (fn: HookFn) => hooks.add(fn);

  return { hooks, dispatch, clear };
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
