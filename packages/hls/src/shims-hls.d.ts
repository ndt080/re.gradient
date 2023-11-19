import HLS from 'hls.js';

export {};

declare module '@re.gradient/core' {
  export interface Player {
    hls?: HLS;
  }
}
