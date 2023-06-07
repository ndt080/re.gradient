import { Player } from '@darkvi/core';

import { BaseComponent, CustomElement, withTooltip } from '../../core';
import { ExitFullscreenIcon, FullscreenIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './fullscreen-control.styles.scss?inline';

const FULLSCREEN_EVENTS = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];

@CustomElement('drk-vi-fullscreen')
@withTooltip('[data-tooltip="tooltip"]')
export class FullscreenControlComponent extends BaseComponent {
  $$styles = $styles;

  get isFullscreen(): boolean {
    return Boolean(this.player?.isFullscreen);
  }

  private get player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  onMount() {
    FULLSCREEN_EVENTS.forEach((event: string) => {
      this.player.$containerEl.addEventListener(event, this.onFullscreenChanged);
    });
  }

  onDestroy() {
    FULLSCREEN_EVENTS.forEach((event: string) => {
      this.player.$containerEl.removeEventListener(event, this.onFullscreenChanged);
    });
  }

  render(): Node {
    const Icon = this.isFullscreen ? ExitFullscreenIcon : FullscreenIcon;

    return (
      <div class="drk-vi-fullscreen" onclick={this.onControlClick}>
        <Icon className="drk-vi-fullscreen__icon" width="22" height="22" />

        <span data-tooltip="tooltip" role="tooltip" class="drk-vi-tooltip">
          {this.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        </span>
      </div>
    );
  }

  private onControlClick = () => {
    this.isFullscreen ? this.player.fromFullScreen() : this.player.toFullScreen();
  };

  private onFullscreenChanged = () => {
    this.$$detectChanges();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-fullscreen': FullscreenControlComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-fullscreen']: FullscreenControlComponent;
  }
}

