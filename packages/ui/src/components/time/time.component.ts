import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { getNativeEl, getPlayerInstanceFromControl, toHMSStrings } from '../../utils';
import $styles from './time.styles.scss?inline';

@Component({
  selector: 'drk-vi-time',
  template: `
    <div class="drk-vi-time">
      <span data-time>00:00</span>
      <span> / </span>
      <span data-duration>00:00</span>
    </div>
  `,
  styles: $styles,
})
export class TimeComponent extends HTMLElement {
  public time = 0;
  public duration = 0;

  private _timeEl!: HTMLSpanElement;
  private _durationEl!: HTMLSpanElement;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this._timeEl = getNativeEl<HTMLSpanElement>(this, '[data-time]')!;
    this._durationEl = getNativeEl<HTMLSpanElement>(this, '[data-duration]')!;

    requestAnimationFrame(() => {
      this._player.on('durationchange', this.onDurationUpdate);
      this._player.on('timeupdate', this.onCurrentTimeUpdate);
    });
  }

  disconnectedCallback() {
    this._player.off('durationchange', this.onDurationUpdate);
    this._player.off('timeupdate', this.onCurrentTimeUpdate);
  }

  private onDurationUpdate = () => {
    const duration = this._player.$mediaEl.duration;
    let formattedDuration = '00:00';

    if (duration) {
      const { h, m, s } = toHMSStrings(duration);
      formattedDuration = this.duration < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
    }

    this._durationEl.innerHTML = formattedDuration;
    this.duration = duration;
  };

  private onCurrentTimeUpdate = () => {
    const time = this._player.$mediaEl.currentTime;
    let formattedTime = '00:00';

    if (time) {
      const { h, m, s } = toHMSStrings(time);
      formattedTime = this.duration < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
    }

    this._timeEl.innerHTML = formattedTime;
    this.time = time;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-time': TimeComponent;
  }
}
