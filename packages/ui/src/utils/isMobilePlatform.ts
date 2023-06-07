const MOBILE_PLATFORMS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
  /Opera Mini/i,
  /IEMobile/i,
  /WPDesktop/i,
];

export function isMobilePlatform() {
  return MOBILE_PLATFORMS.some((p) => navigator.userAgent.match(p));
}
