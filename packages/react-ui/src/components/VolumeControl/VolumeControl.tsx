import './VolumeControl.scss';

import { Player } from '@darkvi/core';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slider';

import { PlayerContext } from '@/components';
import { MutedIcon, SoundIcon } from '@/icons';

function VolumeControl() {
  const player = useContext<Player | null>(PlayerContext);
  const [muted, setMuted] = useState<boolean>(Boolean(player?.$mediaEl.muted));
  const [volume, setVolume] = useState<number>(player?.$mediaEl.volume ?? 0);

  useEffect(() => {
    if (player) {
      player.on('volumechange', onVolumeChange);
      player.on('playing', onVolumeChange);
    }

    return () => {
      player.off('volumechange', onVolumeChange);
      player.off('playing', onVolumeChange);
    };
  });

  const onVolumeChange = () => {
    if (!player) return;
    setVolume(player.$mediaEl.volume);
    setMuted(player.$mediaEl.muted);
  };

  const toggleMute = () => {
    if (!player) return;
    player.$mediaEl.muted = !player.$mediaEl.muted;
  };

  const changeVolume = (value: number) => {
    if (!player) return;

    player.$mediaEl.volume = value;
    if (muted) toggleMute();
  };

  return (
    <div className={clsx('drk-vi-volume', muted && 'drk-vi-volume--muted')}>
      <div className="drk-vi-volume__button" onClick={toggleMute}>
        {muted ? (
          <MutedIcon className="drk-vi-volume__icon" height="22" width="22" />
        ) : (
          <SoundIcon className="drk-vi-volume__icon" height="22" width="22" />
        )}
      </div>

      <Slider
        className="drk-vi-volume__level"
        trackClassName="drk-vi-volume__level_track"
        thumbClassName="drk-vi-volume__level_thumb"
        thumbActiveClassName="drk-vi-volume__level_thumb--active"
        min={0}
        max={1}
        step={0.1}
        value={volume || 0}
        onChange={changeVolume}
      />
    </div>
  );
}

export default VolumeControl;
