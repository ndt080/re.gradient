import './Timeline.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slider';

import { PlayerContext } from '@/components';

function Timeline() {
  const player = useContext<Player | null>(PlayerContext);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const onDurationUpdate = () => {
    setDuration(player.$mediaEl.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(player.$mediaEl.currentTime);
  };

  const onChangeTime = (time: number) => {
    if (!player) return;
    setCurrentTime(time);
    player.$mediaEl.currentTime = time;
  };

  useEffect(() => {
    if (player) {
      setDuration(player.$mediaEl.duration);
      setCurrentTime(player.$mediaEl.currentTime);

      player.on('durationchange', onDurationUpdate);
      player.on('timeupdate', onTimeUpdate);
    }

    return () => {
      player?.off('durationchange', onDurationUpdate);
      player?.off('timeupdate', onTimeUpdate);
    };
  });

  return (
    <Slider
      className="drk-vi-timeline"
      trackClassName="drk-vi-timeline__track"
      thumbClassName="drk-vi-timeline__thumb"
      thumbActiveClassName="drk-vi-timeline__thumb--active"
      min={0}
      max={duration || 0}
      value={currentTime || 0}
      onChange={onChangeTime}
    />
  );
}

export default Timeline;
