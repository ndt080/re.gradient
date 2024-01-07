import type { ComponentOptions } from 'component-register';
import { createMixin } from 'component-register';

import type { HtmlPlayerElement } from '@/types';

export function providePlayer() {
  return createMixin((options: ComponentOptions) => {
    const { element } = options;
    const playerInstance = (element.parentElement as HtmlPlayerElement).player;

    if (playerInstance) {
      element.player = playerInstance;
    }

    return { ...options, player: playerInstance };
  });
}
