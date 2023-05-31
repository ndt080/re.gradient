import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { PipIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './pip-control.styles.scss?inline';

@Component({
  selector: 'drk-vi-pip',
  template: `
    <div class="drk-vi-pip" tabindex="0">
      ${PipIcon({
        className: 'drk-vi-pip__icon',
        width: '22',
        height: '22',
      })}
    </div>
  `,
  styles: $styles,
})
export class PipControlComponent extends HTMLElement {
  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  private get isSupported(): boolean {
    const isDisabled = this._player.$mediaEl.disablePictureInPicture ?? false;
    return document.pictureInPictureEnabled || isDisabled;
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      // Hide control, if PiP unsupported
      if (!this.isSupported) {
        this.style.display = 'none';
      }

      this.addEventListener('click', this.onControlClick);
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onControlClick);
  }

  private onControlClick = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await this._player.$mediaEl.requestPictureInPicture();
      }
    } catch (err) {
      console.error('Picture-in-picture unsupported');
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-pip': PipControlComponent;
  }
}
