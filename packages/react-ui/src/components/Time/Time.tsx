import './Time.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';
import { useTime } from '@/hooks';

function Time() {
  const player = useContext<Player | null>(PlayerContext);
  const { toHMSStrings } = useTime();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const onDurationUpdate = () => {
    setDuration(player.$mediaEl.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(player.$mediaEl.currentTime);
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

  const formattedTime = () => {
    if (!currentTime) return '00:00';

    const { h, m, s } = toHMSStrings(currentTime);
    return duration < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  const formattedDuration = () => {
    if (!duration) return '00:00';

    const { h, m, s } = toHMSStrings(duration);
    return duration < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  return (
    <div className="drk-vi-time">
      {formattedTime()} / {formattedDuration()}
    </div>
  );
}

export default Time;
