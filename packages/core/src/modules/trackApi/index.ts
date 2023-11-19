import TracksApiModule from './module';
import type { Track } from './types';

export * from './module';
export * from './types';
export * from './utils/safeLoadTracks';

export default TracksApiModule;

export declare class TracksApi {
  __tracks__: Track[];
  __trackElements__: HTMLTrackElement[];

  loadTracks(tracks: Track[], append?: boolean): void;

  clearTracks(): void;
}

