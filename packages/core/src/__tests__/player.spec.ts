import { beforeAll, describe, expect, it } from 'vitest';

import { Player } from '../player';

describe('Player', () => {
  let player: Player;

  beforeAll(() => {
    const mediaEl = document.createElement('video');
    const containerEl = document.createElement('div');

    player = new Player(mediaEl, containerEl);
  });

  it('Player creating', () => {
    expect(player).toBeTruthy();
  });
});
