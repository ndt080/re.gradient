import { beforeAll, describe, expect, it } from 'vitest';

import { PlayerModule } from '../models/module';
import { PlayerCore } from '../player-core';
import { useModule } from '../utils';

describe('Player Core', () => {
  let core: PlayerCore;

  beforeAll(() => {
    core = new PlayerCore();
  });

  it('PlayerCore instance creating', () => {
    expect(core).toBeTruthy();
  });

  it('Adding correct module', () => {
    const initialModulesCount = PlayerCore._modules.length;

    const module = useModule(() => null);
    PlayerCore.use([module]);

    expect(initialModulesCount + 1).toEqual(PlayerCore._modules.length);
  });

  it('Core do not adding duplicated module', () => {
    const initialModulesCount = PlayerCore._modules.length;

    const module = useModule(() => null);
    PlayerCore.use([module, module, module]);

    expect(initialModulesCount + 1).toEqual(PlayerCore._modules.length);
  });

  it('PlayerCore do not adding null', () => {
    const initialModulesCount = PlayerCore._modules.length;

    PlayerCore.use([null as unknown as PlayerModule]);
    PlayerCore.use([undefined as unknown as PlayerModule]);

    expect(initialModulesCount).toEqual(PlayerCore._modules.length);
  });
});
