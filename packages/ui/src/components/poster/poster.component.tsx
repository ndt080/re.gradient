import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement } from '../../core';
import { PlayIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './poster.styles.scss?inline';

@CustomElement('drk-vi-poster')
export class PosterComponent extends BaseComponent {
  $$styles = $styles;

  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onMount() {
    this._player.on('playing', this.hidePoster);
  }

  onDestroy() {
    this._player.off('playing', this.hidePoster);
  }

  render(): Node {
    return (
      <div class="drk-vi-poster" onclick={this.onPosterClick}>
        <slot></slot>

        <div class="drk-vi-poster__icon">
          <slot name="icon">
            <PlayIcon />
          </slot>
        </div>
      </div>
    );
  }

  private onPosterClick = async () => {
    this.hidePoster();
    await getPlayerInstanceFromControl(this)?.togglePlay();
  };

  private hidePoster = () => {
    this.style.setProperty('visibility', 'hidden');
    this.style.setProperty('opacity', '0');
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-poster': PosterComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-poster']: PosterComponent;
  }
}
