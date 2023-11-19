import type { MediaPlayerClass } from 'dashjs';

export {};

declare module '@re.gradient/core' {
  export interface Player {
    dash?: MediaPlayerClass;
  }
}
