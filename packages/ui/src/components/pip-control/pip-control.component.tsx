import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement, withTooltip } from '../../core';
import { PipIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './pip-control.styles.scss?inline';

@CustomElement('drk-vi-pip')
@withTooltip('[data-tooltip="tooltip"]')
export class PipControlComponent extends BaseComponent {
  $$styles = $styles;

  get isSupported(): boolean {
    const isDisabled = this._player?.$mediaEl.disablePictureInPicture ?? false;
    return document.pictureInPictureEnabled || isDisabled;
  }

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  render(): Node {
    if (!this.isSupported) {
      return <span></span>;
    }

    return (
      <div class="drk-vi-pip" tabIndex="0" onclick={this.onControlClick}>
        <PipIcon className="drk-vi-pip__icon" width="22" height="22" />

        <span data-tooltip="tooltip" role="tooltip" class="drk-vi-tooltip">
          PIP
        </span>
      </div>
    );
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

  interface IntrinsicElements {
    ['drk-vi-pip']: PipControlComponent;
  }
}
