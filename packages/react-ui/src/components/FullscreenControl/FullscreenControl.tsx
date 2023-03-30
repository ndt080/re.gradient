import './FullscreenControl.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';
import { ExitFullscreenIcon, FullscreenIcon } from '@/icons';

const FullscreenChangeEvents = [
  'fullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
];

function FullscreenControl() {
  const player = useContext<Player | null>(PlayerContext);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    FullscreenChangeEvents.forEach((event: string) => {
      player?.$containerEl.addEventListener(event, onToggleFullscreen);
    });

    return () => {
      FullscreenChangeEvents.forEach((event: string) => {
        player?.$containerEl.removeEventListener(event, onToggleFullscreen);
      });
    };
  });

  const onToggleFullscreen = () => {
    console.log('onToggleFullscreen');
    setIsFullscreen(!isFullscreen);
  };

  const toggleFullscreen = () => {
    if (!player) return;
    isFullscreen ? player.fromFullScreen() : player.toFullScreen();
  };

  return (
    <div className="drk-vi-fullscreen" onClick={toggleFullscreen}>
      {isFullscreen ? (
        <ExitFullscreenIcon className="drk-vi-fullscreen__icon" width="22" height="22" />
      ) : (
        <FullscreenIcon className="drk-vi-fullscreen__icon" width="22" height="22" />
      )}
    </div>
  );
}

export default FullscreenControl;
