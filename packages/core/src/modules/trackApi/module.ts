import { useModule } from '@/utils';

import { Track } from './types';

const createTrackElement = (track: Track): HTMLTrackElement => {
  const el = document.createElement('track');
  for (const property in track) {
    el.setAttribute(property, track[property]);
  }
  return el;
};

const TracksApiModule = useModule(({ player }) => {
  Reflect.set(player, '__tracks__', []);
  Reflect.set(player, '__trackElements__', []);

  player.loadTracks = function (tracks: Track[], append = false) {
    if (!this.$mediaEl) {
      throw new Error('Error during track loading. The media element is not defined');
    }

    if (append) {
      this.__tracks__ = [...this.__tracks__, ...tracks];
    } else {
      this.clearTracks();
      this.__tracks__ = [...tracks];
    }

    this.__trackElements__ = tracks.map(createTrackElement);
    this.$mediaEl.append(...this.__trackElements__);
  };

  player.clearTracks = function () {
    if (!this.$mediaEl) {
      throw new Error('Error during track clearing. The media element is not defined');
    }

    this.__tracks__ = [];
    this.__trackElements__.forEach((el: HTMLTrackElement) => el.remove());
  };
});

export default TracksApiModule;

