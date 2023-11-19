import { useModule } from '@/utils';

const FullscreenEvents = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];

const FullscreenApiModule = useModule(({ player, onDispose }) => {
  const onFullscreenChange = () => {
    player.isFullscreen = !player.isFullscreen;
  };

  player.on<never>(FullscreenEvents, onFullscreenChange);

  player.toFullScreen = () => {
    const requestFullscreen =
      player.$containerEl.requestFullscreen ||
      player.$containerEl.mozRequestFullScreen ||
      player.$containerEl.webkitRequestFullscreen ||
      player.$containerEl.msRequestFullscreen;

    requestFullscreen.call(player.$containerEl);
  };

  player.fromFullScreen = () => {
    const exitFullscreen =
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.msExitFullscreen;

    exitFullscreen.call(document);
  };

  onDispose(() => {
    player.off<never>(FullscreenEvents, onFullscreenChange);
  });
});

export declare class FullscreenApi {
  isFullscreen: boolean;

  toFullScreen(): void;

  fromFullScreen(): void;
}

export default FullscreenApiModule;
