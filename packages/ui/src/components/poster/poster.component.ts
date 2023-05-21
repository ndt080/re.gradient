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
  connectedCallback() {
    this.addEventListener('click', this.onPosterClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onPosterClick);
  }

  private onPosterClick = async () => {
    this.style.setProperty('visibility', 'hidden');
    this.style.setProperty('opacity', '0');
    this.setAttribute('data-hidden', 'true');

    await getPlayerInstanceFromControl(this)?.togglePlay();
  };
}
