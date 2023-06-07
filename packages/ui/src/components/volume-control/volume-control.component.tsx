import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement, withTooltip } from '../../core';
import { MutedIcon, SoundIcon } from '../../icons';
import { getNativeEl, getPlayerInstanceFromControl } from '../../utils';
import $styles from './volume-control.styles.scss?inline';

@CustomElement('drk-vi-volume')
@withTooltip('[data-tooltip="tooltip"]', 'top-start')
export class VolumeControlComponent extends BaseComponent {
  $$styles = $styles;

  protected _sliderEl!: HTMLInputElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onUpdated() {
    this._sliderEl = getNativeEl<HTMLInputElement>(this, '[data-slider]')!;
  }

  onMount() {
    this._sliderEl = getNativeEl<HTMLInputElement>(this, '[data-slider]')!;
    this.onVolumeUpdate();
    this._player.on('volumechange', this.onVolumeUpdate);
  }

  onDestroy() {
    this._player.off('volumechange', this.onVolumeUpdate);
  }

  render(): Node {
    const isMuted = Boolean(this._player?.$mediaEl.muted);
    const Icon = isMuted ? MutedIcon : SoundIcon;
    const mutedStyleClass = isMuted ? 'drk-vi-volume--muted' : '';

    return (
      <div class={`drk-vi-volume ${mutedStyleClass}`}>
        <div class="drk-vi-volume__button" onclick={this.toggleMute}>
          <Icon className="drk-vi-volume__icon" width="22" height="22" />
        </div>

        <span data-tooltip="tooltip" role="tooltip" class="drk-vi-tooltip">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>

        <input
          data-slider
          class="drk-vi-volume__slider drk-vi-slider"
          role="slider"
          type="range"
          min="0"
          max="1"
          value="0"
          step="0.01"
          oninput={this.setNewVolume}
        />
      </div>
    );
  }

  private onVolumeUpdate = () => {
    const { volume } = this._player.$mediaEl;

    this._sliderEl.value = volume.toString();
    this.rePaintSliderEl(volume * 100);
  };

  private setNewVolume = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value) ?? 0;

    this._player.$mediaEl.volume = value;
    this.rePaintSliderEl(value * 100);

    if (this._player.$mediaEl.muted) this.toggleMute();
  };

  private toggleMute = () => {
    this._player.$mediaEl.muted = !this._player.$mediaEl.muted;
    requestAnimationFrame(() => this.$$detectChanges());
  };

  private rePaintSliderEl = (progress: number) => {
    this._sliderEl.style.setProperty('--value', `${progress}%`);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-volume': VolumeControlComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-volume']: VolumeControlComponent;
  }
}
