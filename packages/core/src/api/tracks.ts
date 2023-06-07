import type { Player } from '@/player';
import type { SpreadableConstructor, Track } from '@/types';

export function withTracksApi<T extends SpreadableConstructor<Player>>(constructor: T) {
  return class extends constructor {
    _tracks: Track[] = [];
    _trackElements: HTMLTrackElement[] = [];

    loadTracks(tracks: Track[], append = false): void {
      if (!this.$mediaEl) {
        throw new Error('Error during track loading. The media element is not defined');
      }

      if (append) {
        this._tracks = [...this._tracks, ...tracks];
      } else {
        this.clearTracks();
        this._tracks = [...tracks];
      }

      this._trackElements = tracks.map(this._createTrackElement);
      this.$mediaEl.append(...this._trackElements);
    }

    clearTracks(): void {
      if (!this.$mediaEl) {
        throw new Error('Error during track clearing. The media element is not defined');
      }

      this._tracks = [];
      this._trackElements.forEach((el: HTMLTrackElement) => el.remove());
    }

    _createTrackElement(track: Track): HTMLTrackElement {
      const el = document.createElement('track');

      for (const property in track) {
        el.setAttribute(property, track[property]);
      }

      return el;
    }
  };
}

export declare class TracksApi {
  _tracks: Track[];
  _trackElements: HTMLTrackElement[];

  loadTracks(tracks: Track[], append?: boolean): void;

  clearTracks(): void;

  _createTrackElement(track: Track): HTMLTrackElement;
}
