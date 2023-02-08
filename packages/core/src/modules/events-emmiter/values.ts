export enum Events {
  Created = "created",
  TimeUpdate = "timeupdate",
  LoadStart = "loadstart",
  Play = "play",
  Ended = "ended",
  Pause = "pause",
  Playing = "playing",
  DurationChange = "durationchange",
  VolumeChange = "volumechange",
  FullscreenChange = "fullscreenchange",
  MozFullscreenChange = "mozfullscreenchange",
  WebKitFullscreenChange = "webkitfullscreenchange",
  MouseMove = "mousemove",
}

export const FullscreenChangeEvents = [
  Events.FullscreenChange,
  Events.MozFullscreenChange,
  Events.WebKitFullscreenChange,
];
