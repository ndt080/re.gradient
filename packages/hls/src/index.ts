import type { Source } from '@re.gradient/core';
import { useEngineModule } from '@re.gradient/core';
import Hls, { ErrorData, Events, HlsConfig } from 'hls.js';

const HLSModule = function (config?: Partial<HlsConfig>) {
  return useEngineModule(({ player, setOptions, onSourceChanged, onDispose }) => {
    let hls: Hls | null = null;

    const onHlsError = function (_: Events, data: ErrorData) {
      if (!hls) return;

      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            hls.destroy();
            break;
        }
      }
    };

    setOptions({
      priority: 1,
      isSupported: () => Hls.isSupported(),
      isSourceSupported(source: Source): CanPlayTypeResult {
        const hlsTypeRE = /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i;
        const hlsExtRE = /\.m3u8/i;

        switch (true) {
          case hlsTypeRE.test(source.type):
            return 'probably';
          case hlsExtRE.test(source.src):
            return 'maybe';
          default:
            return '';
        }
      },
    });

    onSourceChanged((source: Source) => {
      if (hls) {
        hls.off(Events.ERROR, onHlsError);
        hls.destroy();
      }

      hls = new Hls(config);
      player.hls = hls;

      hls.on(Events.ERROR, onHlsError);
      hls.loadSource(source.src);
      hls.attachMedia(player.$mediaEl);
    });

    onDispose(() => {
      hls?.off(Events.ERROR, onHlsError);
      hls?.destroy();
    });
  });
};

export { HLSModule };
