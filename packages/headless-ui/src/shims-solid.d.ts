import type { Player } from '@re.gradient/core';

declare module 'component-register/types/utils.d' {
  export interface ICustomElement extends HTMLElement {}

  export interface ComponentOptions {
    player: Player;
    element: ICustomElement;
  }
}
