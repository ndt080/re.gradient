import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { PauseIcon, PlayIcon } from '../../icons';
import { getNativeEl, getPlayerInstanceFromControl } from '../../utils';
import $styles from './play-control.styles.scss?inline';

@Component({
  selector: 'drk-vi-play',
  template: ' <div data-container class="drk-vi-play"></div> ',
  styles: $styles,
})
export class PlayControlComponent extends HTMLElement {
  private _containerEl!: HTMLDivElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this._containerEl = getNativeEl<HTMLDivElement>(this, '[data-container]')!;
    this.addEventListener('click', this.onControlClick);

    requestAnimationFrame(() => {
      this.renderControl(!this._player.$mediaEl.paused);
      this._player.on('playing', this.onPlaying);
      this._player.on('pause', this.onPause);
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onControlClick);
    this._player.off('playing', this.onPlaying);
    this._player.off('pause', this.onPause);
  }

  private onControlClick = () => this._player.togglePlay();
  private onPlaying = () => this.renderControl(true);
  private onPause = () => this.renderControl(false);

  private renderControl = (isPlaying: boolean) => {
    const options = {
      className: 'drk-vi-play__icon',
      width: '22',
      height: '22',
    };

    this._containerEl.innerHTML = isPlaying ? PauseIcon(options) : PlayIcon(options);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-play': PlayControlComponent;
  }
}
