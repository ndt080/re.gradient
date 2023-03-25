import { useModule, usePlayerExtend } from '@/utils';

const FullscreenChangeEvents = [
  'fullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
];

const FullscreenMode = useModule(({ player, onDispose }) => {
  const onFullscreenChange = () => {
    player.isFullscreen = !player.isFullscreen;
  };

  FullscreenChangeEvents.forEach((event: string) => {
    player.$containerEl.addEventListener(event, onFullscreenChange);
  });

  usePlayerExtend({
    isFullscreen: false,

    toFullScreen() {
      const requestFullscreen =
        player.$containerEl.requestFullscreen ||
        player.$containerEl.mozRequestFullScreen ||
        player.$containerEl.webkitRequestFullscreen ||
        player.$containerEl.msRequestFullscreen;

      requestFullscreen.call(player.$containerEl);
    },

    fromFullScreen() {
      const exitFullscreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.msExitFullscreen;

      exitFullscreen.call(document);
    },
  });

  onDispose(() => {
    FullscreenChangeEvents.forEach((event: string) => {
      player.$containerEl.removeEventListener(event, onFullscreenChange);
    });
  });
});

declare interface FullscreenMode {
  isFullscreen: boolean;

  toFullScreen(): void;

  fromFullScreen(): void;
}

export default FullscreenMode;
