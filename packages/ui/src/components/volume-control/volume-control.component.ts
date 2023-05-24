import { Player } from '@darkvi/core';

import { MutedIcon, SoundIcon } from '@/icons';

import { Component } from '../../decorators';
import { getNativeEl, getPlayerInstanceFromControl } from '../../utils';
import $styles from './volume-control.styles.scss?inline';

@Component({
  selector: 'drk-vi-volume',
  template: `
    <div data-container class="drk-vi-volume">
      <div data-button class="drk-vi-volume__button"></div>

      <input
        data-slider
        class="drk-vi-volume__slider drk-vi-slider"
        role="slider"
        type="range"
        min="0"
        max="1"
        value="0"
        step="0.01"
      />
    </div>
  `,
  styles: $styles,
})
export class VolumeControlComponent extends HTMLElement {
  protected _containerEl!: HTMLDivElement;
  protected _sliderEl!: HTMLInputElement;
  protected _buttonEl!: HTMLDivElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this._containerEl = getNativeEl<HTMLDivElement>(this, '[data-container]')!;
    this._sliderEl = getNativeEl<HTMLInputElement>(this, '[data-slider]')!;
    this._buttonEl = getNativeEl<HTMLDivElement>(this, '[data-button]')!;

    requestAnimationFrame(() => {
      this.onVolumeUpdate();
      this.renderButton(this._player.$mediaEl.muted);

      this._player.on('volumechange', this.onVolumeUpdate);
      this._sliderEl.addEventListener('input', this.setNewVolume);
      this._buttonEl.addEventListener('click', this.toggleMute);
    });
  }

  disconnectedCallback() {
    this._player.off('volumechange', this.onVolumeUpdate);
    this._sliderEl.removeEventListener('input', this.setNewVolume);
    this._buttonEl.removeEventListener('click', this.toggleMute);
  }

  private onVolumeUpdate = () => {
    const { volume, muted } = this._player.$mediaEl;

    this._sliderEl.value = volume.toString();
    this.rePaintSliderEl(volume * 100);

    muted
      ? this._containerEl.classList.add('drk-vi-volume--muted')
      : this._containerEl.classList.remove('drk-vi-volume--muted');
  };

  private setNewVolume = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value) ?? 0;
    this._player.$mediaEl.volume = value;
    this.rePaintSliderEl(value * 100);

    if (this._player.$mediaEl.muted) this.toggleMute();
  };

  private toggleMute = () => {
    this._player.$mediaEl.muted = !this._player.$mediaEl.muted;

    requestAnimationFrame(() => {
      this.renderButton(this._player.$mediaEl.muted);
    });
  };

  private renderButton = (isMuted: boolean) => {
    const options = {
      className: 'drk-vi-volume__icon',
      width: '22',
      height: '22',
    };

    this._buttonEl.innerHTML = isMuted ? MutedIcon(options) : SoundIcon(options);
  };

  private rePaintSliderEl = (progress: number) => {
    this._sliderEl.style.setProperty('--value', `${progress}%`);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-volume': VolumeControlComponent;
  }
}
