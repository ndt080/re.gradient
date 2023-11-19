import { Player, type Source, useEngineModule } from '@re.gradient/core';
import {
  ErrorEvent,
  MediaPlayer,
  MediaPlayerClass,
  PlaybackErrorEvent,
  supportsMediaSource,
} from 'dashjs';

const DashModule = function () {
  return useEngineModule(({ player, setOptions, onSourceChanged, onDispose }) => {
    let dash: MediaPlayerClass | null = null;

    const onError = function (data: ErrorEvent) {
      if (data.error === 'manifestError' && dash) {
        dash.reset();
      }
    };

    const onPlaybackError = function (data: PlaybackErrorEvent) {
      if (data.error === 'recoverable' && dash) {
        const source = dash.getSource();
        dash.reset();
        dash.initialize();
        dash.attachView(player.$mediaEl);
        dash.attachSource(source);
      }
    };

    setOptions({
      priority: 1,
      isSupported: () => supportsMediaSource(),
      isSourceSupported(source: Source): CanPlayTypeResult {
        const typeRE = /^(application\/dash\+xml|application\/mpegurl)$/i;
        const extRE = /\.mpd/i;

        switch (true) {
          case typeRE.test(source.type):
            return 'probably';
          case extRE.test(source.src):
            return 'maybe';
          default:
            return '';
        }
      },
    });

    onSourceChanged((source: Source) => {
      if (dash) {
        dash.off(MediaPlayer.events.ERROR, onError);
        dash.off(MediaPlayer.events.PLAYBACK_ERROR, onPlaybackError);
        dash.reset();
      }

      dash = MediaPlayer().create();
      (player as Player).dash = dash;

      dash.on(MediaPlayer.events.ERROR, onError);
      dash.on(MediaPlayer.events.PLAYBACK_ERROR, onPlaybackError);

      dash.initialize();
      dash.attachView(player.$mediaEl);
      dash.attachSource(source.src);
    });

    onDispose(() => {
      dash?.off(MediaPlayer.events.ERROR, onError);
      dash?.off(MediaPlayer.events.PLAYBACK_ERROR, onPlaybackError);
      dash?.destroy();
    });
  });
};

export { DashModule };
