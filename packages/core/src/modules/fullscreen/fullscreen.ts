import { useModule } from '../../api/module';
import { Events, FullscreenChangeEvents } from '../events-emmiter';
import { usePlayerExtend } from '../../utils/usePlayerExtend';

export const FullscreenMode = useModule(({ player, onDispose }) => {
  const onFullscreenChange = () => {
    player.isFullscreen = !player.isFullscreen;
  }

  FullscreenChangeEvents.forEach((event: Events) => {
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
    FullscreenChangeEvents.forEach((event: Events) => {
      player.$containerEl.removeEventListener(event, onFullscreenChange);
    });
  });
});

export interface FullscreenMode {
  isFullscreen: boolean;
  toFullScreen(): void;
  fromFullScreen(): void;
}
