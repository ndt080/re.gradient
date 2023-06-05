import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement, withTooltip } from '../../core';
import { PauseIcon, PlayIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './play-control.styles.scss?inline';

@CustomElement('drk-vi-play')
@withTooltip('[data-tooltip="tooltip"]')
export class PlayControlComponent extends BaseComponent {
  $$styles = $styles;

  private isPlaying = false;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onMount() {
    this._player.on('playing', this.onPlaying);
    this._player.on('pause', this.onPause);
  }

  onDestroy() {
    this._player.off('playing', this.onPlaying);
    this._player.off('pause', this.onPause);
  }

  render(): Node {
    const Icon = this.isPlaying ? PauseIcon : PlayIcon;

    return (
      <div class="drk-vi-play" onclick={this.onControlClick}>
        <Icon className="drk-vi-play__icon" width="22" height="22" />

        <span data-tooltip="tooltip" role="tooltip" class="drk-vi-tooltip">
          {this.isPlaying ? 'Pause' : 'Play'}
        </span>
      </div>
    );
  }

  private onControlClick = () => this._player.togglePlay();

  private onPlaying = () => {
    this.isPlaying = true;
    this.$$detectChanges();
  };

  private onPause = () => {
    this.isPlaying = false;
    this.$$detectChanges();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-play': PlayControlComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-play']: PlayControlComponent;
  }
}
