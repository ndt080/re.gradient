import './Player.scss';

import { Player as DarkviPlayer } from '@darkvi/core';
import { Source } from '@darkvi/core/types/types/source';
import {
  MediaHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import { PlayerContext } from '@/components';
import { DEFAULT_LAYOUT, Layout, mapLayoutToStyle } from '@/utils/mapLayoutToStyle';

type Props = {
  src?: string | Source;
  layout?: Layout;
  onClick?: MouseEventHandler<Element>;
  onCreated?: (player: DarkviPlayer) => void;
} & MediaHTMLAttributes<HTMLVideoElement>;

function Player({
  src,
  children,
  layout = DEFAULT_LAYOUT,
  onClick = () => null,
  onCreated = () => null,
  ...attrs
}: PropsWithChildren<Props>) {
  const [player, setPlayer] = useState<DarkviPlayer>();

  const mediaEl = useRef<HTMLVideoElement | null>(null);
  const containerEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mediaEl.current && containerEl.current) {
      const player = new DarkviPlayer(mediaEl.current, containerEl.current);
      setPlayer(player);
      onCreated(player);
      player.triggerHook('created');

      if (src) player?.load(src);
    }

    return () => player?.dispose();
  }, []);

  player?.load(src);

  const onPlayerClick = (e: MouseEvent<HTMLVideoElement>) => {
    onClick(e);
    player?.togglePlay();
  };

  return (
    <PlayerContext.Provider value={player}>
      <div ref={containerEl} className="drk-vi-player">
        <video
          ref={mediaEl}
          id={player?.id}
          className="drk-vi-player__media"
          onClick={onPlayerClick}
          playsInline
          {...attrs}
        />
        <div className="drk-vi-player__layout" style={mapLayoutToStyle(layout)}>
          {player ? children : null}
        </div>
      </div>
    </PlayerContext.Provider>
  );
}

export default Player;
