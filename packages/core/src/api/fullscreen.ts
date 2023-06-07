import type { Player } from '@/player';
import type { SpreadableConstructor } from '@/types';

const FullscreenChangeEvents = [
  'fullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
];

export function withFullscreenApi<T extends SpreadableConstructor<Player>>(constructor: T) {
  return class extends constructor {
    isFullscreen = false;

    constructor(...args) {
      super(...args);

      for (const event of FullscreenChangeEvents) {
        this.$containerEl.addEventListener(event, this._onFullscreenChange.bind(this));
      }
    }

    toFullScreen() {
      const requestFullscreen =
        this.$containerEl.requestFullscreen ||
        this.$containerEl.mozRequestFullScreen ||
        this.$containerEl.webkitRequestFullscreen ||
        this.$containerEl.msRequestFullscreen;

      requestFullscreen.call(this.$containerEl);
    }

    fromFullScreen() {
      const exitFullscreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.msExitFullscreen;

      exitFullscreen.call(document);
    }

    _onFullscreenChange() {
      this.isFullscreen = !this.isFullscreen;
    }

    dispose() {
      super.dispose();

      for (const event of FullscreenChangeEvents) {
        this.$containerEl.removeEventListener(event, this._onFullscreenChange.bind(this));
      }
    }
  };
}

export declare class FullscreenApi {
  isFullscreen: boolean;

  toFullScreen(): void;

  fromFullScreen(): void;
}
