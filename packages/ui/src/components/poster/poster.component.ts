import { Player } from '@darkvi/core';

import { PlayIcon } from '@/icons';
import { getPlayerInstanceFromControl } from '@/utils';

import { Component } from '../../decorators';
import $styles from './poster.styles.scss?inline';

@Component({
  selector: 'drk-vi-poster',
  template: `
    <div class="drk-vi-poster">
      <slot></slot>

      <div class="drk-vi-poster__icon">
        <slot name="icon">${PlayIcon()}</slot>
      </div>
    </div>
  `,
  styles: $styles,
})
export class PosterComponent extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.onPosterClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onPosterClick);
  }

  private onPosterClick = async () => {
    const player = getPlayerInstanceFromControl(this) as Player | null;

    if (!player) return;

    await player.$mediaEl.play();

    if (this.getAttribute('waitPlaying')) {
      player.once('playing', this.hidePoster);
    } else {
      this.hidePoster();
    }
  };

  private hidePoster = () => {
    this.hidden = true;
  };
}
