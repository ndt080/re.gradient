/// <reference types="vite/client" />


export declare global {
  type ExitFullscreen = typeof document.exitFullscreen;
  type RequestFullscreen = typeof document.documentElement.requestFullscreen;

  interface Document {
    webkitCancelFullScreen: ExitFullscreen;
    mozCancelFullScreen: ExitFullscreen;
    msExitFullscreen: ExitFullscreen;
  }

  interface HTMLElement {
    webkitRequestFullscreen: RequestFullscreen;
    mozRequestFullScreen: RequestFullscreen;
    msRequestFullscreen: RequestFullscreen;
  }
}

