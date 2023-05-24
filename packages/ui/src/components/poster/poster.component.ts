import { Player } from '@darkvi/core';

import { PlayIcon } from '@/icons';

import { Component } from '../../decorators';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './poster.styles.scss?inline';

@Component({
  selector: 'drk-vi-poster',
  template: `
    <div data-container class="drk-vi-poster">
      <slot></slot>

      <div class="drk-vi-poster__icon">
        <slot name="icon">${PlayIcon()}</slot>
      </div>
    </div>
  `,
  styles: $styles,
})
export class PosterComponent extends HTMLElement {
  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onPosterClick);

    requestAnimationFrame(() => {
      this._player.on('playing', this.hidePoster);
    });
  }

  disconnectedCallback() {
    this._player.off('playing', this.hidePoster);
    this.removeEventListener('click', this.onPosterClick);
  }

  private onPosterClick = async () => {
    this.hidePoster();
    await getPlayerInstanceFromControl(this)?.togglePlay();
  };

  private hidePoster = () => {
    this.style.setProperty('visibility', 'hidden');
    this.style.setProperty('opacity', '0');
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-poster': PosterComponent;
  }
}
