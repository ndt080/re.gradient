import { withEngineApi } from '@/api/engine';
import { withLifecycleApi } from '@/api/lifecycle';

import { PlayerModule } from './models/module';

@withEngineApi
@withLifecycleApi
class PlayerCore {
  static readonly _modules: PlayerModule[] = [];

  static installModule(module: PlayerModule) {
    if (!!module && this._modules.indexOf(module) < 0) {
      this._modules.push(module);
    }
  }

  static use(modules: PlayerModule[]) {
    modules.forEach((m) => this.installModule(m));
    return this;
  }

  dispose() {
    PlayerCore._modules.forEach((module) => module.dispose());
  }
}

export { PlayerCore };

