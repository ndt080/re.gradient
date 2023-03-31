import './PlayControl.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';
import { PauseIcon, PlayIcon } from '@/icons';

function PlayControl() {
  const player = useContext<Player | null>(PlayerContext);
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    player?.on('pause', onPaused);
    player?.on('playing', onPlaying);

    return () => {
      player?.off('pause', onPaused);
      player?.off('playing', onPlaying);
    };
  });

  const onPaused = () => setPaused(true);
  const onPlaying = () => setPaused(false);

  const togglePlay = () => {
    player?.togglePlay();
  };

  return (
    <div className="drk-vi-play" onClick={togglePlay}>
      {paused ? (
        <PlayIcon className="drk-vi-play__icon" width="22" height="22" />
      ) : (
        <PauseIcon className="drk-vi-play__icon" width="22" height="22" />
      )}
    </div>
  );
}

export default PlayControl;
