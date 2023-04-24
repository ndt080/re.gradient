import './Loader.scss';

import { Player } from '@darkvi/core';
import { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';

function Loader(props: HTMLAttributes<HTMLDivElement>) {
  const player = useContext<Player | null>(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onWaitingSource = () => setIsLoading(true);
  const onCanPlaySource = () => setIsLoading(false);

  useEffect(() => {
    if (player) {
      player.on('waiting', onWaitingSource);
      player.on('seeking', onWaitingSource);
      player.on('canplay', onCanPlaySource);
      player.on('canplaythrough', onCanPlaySource);
    }

    return () => {
      player?.off('waiting', onWaitingSource);
      player?.off('seeking', onWaitingSource);
      player?.off('canplay', onCanPlaySource);
      player?.off('canplaythrough', onCanPlaySource);
    };
  });

  return isLoading ? <div className="drk-vi-loader" {...props}></div> : null;
}

export default Loader;
