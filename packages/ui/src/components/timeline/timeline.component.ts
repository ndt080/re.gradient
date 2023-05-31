import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { getNativeEl, getPlayerInstanceFromControl } from '../../utils';
import $styles from './timeline.styles.scss?inline';

@Component({
  selector: 'drk-vi-timeline',
  template: `
    <input
      class="drk-vi-timeline__seek drk-vi-slider"
      role="slider"
      type="range"
      min="0"
      max="100"
      value="0"
      step="0.01"
      tabindex="0"
    />

    <progress
      class="drk-vi-timeline__buffer drk-vi-progress"
      role="progressbar"
      min="0"
      max="100"
      value="0"
      aria-hidden="true"
    ></progress>
  `,
  styles: $styles,
})
export class TimelineComponent extends HTMLElement {
  private _seekEl!: HTMLInputElement;
  private _bufferEl!: HTMLProgressElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this._seekEl = getNativeEl<HTMLInputElement>(this, 'input[type="range"]')!;
    this._bufferEl = getNativeEl<HTMLProgressElement>(this, 'progress')!;

    requestAnimationFrame(() => {
      this._player.on('timeupdate', this.onProgressUpdate);
      this._player.on('progress', this.onBufferedUpdate);
      this._seekEl.addEventListener('input', this.setNewProgress);
    });
  }

  disconnectedCallback() {
    this._player.off('timeupdate', this.onProgressUpdate);
    this._player.off('progress', this.onBufferedUpdate);
    this._seekEl.removeEventListener('input', this.setNewProgress);
  }

  private onBufferedUpdate = () => {
    const { buffered, currentTime, duration } = this._player.$mediaEl;

    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(buffered.length - 1 - i) < currentTime) {
        this._bufferEl.value = (buffered.end(buffered.length - 1 - i) / duration) * 100 || 0;
        break;
      }
    }
  };

  private onProgressUpdate = () => {
    const { currentTime, duration } = this._player.$mediaEl;
    const progress = (currentTime * 100) / duration || 0;

    this._seekEl.value = progress.toString();
    this.rePaintSeekEl(progress);
  };

  private setNewProgress = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value) ?? 0;
    this._player.$mediaEl.currentTime = (value * this._player.$mediaEl.duration) / 100;
    this.rePaintSeekEl(value);
  };

  private rePaintSeekEl = (progress: number) => {
    this._seekEl.style.setProperty('--value', `${progress}%`);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-timeline': TimelineComponent;
  }
}
