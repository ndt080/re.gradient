import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement } from '../../core';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './loader.styles.scss?inline';

@CustomElement('drk-vi-loader')
export class LoaderComponent extends BaseComponent {
  $$styles = $styles;

  private get player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onCreated() {
    this.hideLoader();
  }

  onMount() {
    this.player.on('loadstart', this.showLoader);
    this.player.on('waiting', this.showLoader);
    this.player.on('canplay', this.hideLoader);
  }

  onDestroy() {
    this.player.off('loadstart', this.showLoader);
    this.player.off('waiting', this.showLoader);
    this.player.off('canplay', this.hideLoader);
  }

  render(): Node {
    return <span></span>;
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

  interface IntrinsicElements {
    ['drk-vi-loader']: LoaderComponent;
  }
}
