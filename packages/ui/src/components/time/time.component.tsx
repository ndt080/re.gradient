import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement } from '../../core';
import { getPlayerInstanceFromControl, toHMSStrings } from '../../utils';
import $styles from './time.styles.scss?inline';

@CustomElement('drk-vi-time')
export class TimeComponent extends BaseComponent {
  $$styles = $styles;

  private get player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onMount() {
    this.player.on('durationchange', this.onTimeChanged);
    this.player.on('timeupdate', this.onTimeChanged);
  }

  onDestroy() {
    this.player.off('durationchange', this.onTimeChanged);
    this.player.off('timeupdate', this.onTimeChanged);
  }

  render(): Node {
    const { currentTime, duration } = this.player.$mediaEl;

    return (
      <div class="drk-vi-time">
        <span>{this.getFormattedTime(currentTime, duration)}</span>
        <span> / </span>
        <span>{this.getFormattedTime(duration, duration)}</span>
      </div>
    );
  }

  private getFormattedTime = (time: number, max = 0) => {
    if (!max) return '00:00';
    const { h, m, s } = toHMSStrings(time);
    return max < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  private onTimeChanged = () => {
    this.$$detectChanges();
  };
}
