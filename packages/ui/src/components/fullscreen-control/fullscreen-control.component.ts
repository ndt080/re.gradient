import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { ExitFullscreenIcon, FullscreenIcon } from '../../icons';
import { getNativeEl, getPlayerInstanceFromControl } from '../../utils';
import $styles from './fullscreen-control.styles.scss?inline';

const FullscreenChangeEvents = [
  'fullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
];

@Component({
  selector: 'drk-vi-fullscreen',
  template: ' <div data-container class="drk-vi-fullscreen"></div> ',
  styles: $styles,
})
export class FullscreenControlComponent extends HTMLElement {
  private _containerEl!: HTMLDivElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this._containerEl = getNativeEl<HTMLDivElement>(this, '[data-container]')!;
    this.addEventListener('click', this.onControlClick);

    requestAnimationFrame(() => {
      this.renderControl();

      FullscreenChangeEvents.forEach((event: string) => {
        this._player.$containerEl.addEventListener(event, this.renderControl);
      });
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onControlClick);

    FullscreenChangeEvents.forEach((event: string) => {
      this._player.$containerEl.removeEventListener(event, this.renderControl);
    });
  }

  private onControlClick = () => {
    this._player.isFullscreen ? this._player.fromFullScreen() : this._player.toFullScreen();
  };

  private renderControl = () => {
    const options = {
      className: 'drk-vi-fullscreen__icon',
      width: '22',
      height: '22',
    };

    this._containerEl.innerHTML = this._player.isFullscreen
      ? ExitFullscreenIcon(options)
      : FullscreenIcon(options);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-fullscreen': FullscreenControlComponent;
  }
}

