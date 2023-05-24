import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './loader.styles.scss?inline';

@Component({
  selector: 'drk-vi-loader',
  template: '',
  styles: $styles,
})
export class LoaderComponent extends HTMLElement {
  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this.hideLoader();
    
    requestAnimationFrame(() => {
      this._player.on('loadstart', this.showLoader);
      this._player.on('waiting', this.showLoader);
      this._player.on('canplay', this.hideLoader);
    });
  }

  disconnectedCallback() {
    this._player.off('loadstart', this.showLoader);
    this._player.off('waiting', this.showLoader);
    this._player.off('canplay', this.hideLoader);
  }

  private showLoader = () => {
    this.style.setProperty('visibility', 'visible');
    this.style.setProperty('opacity', '1');
  };

  private hideLoader = () => {
    this.style.setProperty('visibility', 'hidden');
    this.style.setProperty('opacity', '0');
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-loader': LoaderComponent;
  }
}
