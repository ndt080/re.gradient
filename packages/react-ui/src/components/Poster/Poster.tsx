import './Poster.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';
import { PlayIcon } from '@/icons';

interface Props {
  src?: string;
}

function Poster({ src }: Props) {
  const player = useContext<Player | null>(PlayerContext);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(true);

    player?.once('playing', () => {
      setIsVisible(false);
    });
  }, [src]);

  const onPosterClick = async () => {
    await player?.$mediaEl.play();
  };

  return (
    <>
      {isVisible ? (
        <div className="drk-vi-poster" onClick={onPosterClick}>
          <img src={src} alt="drk-vi-poster" className="drk-vi-poster__image" />
          <PlayIcon className="drk-vi-poster__icon" />
        </div>
      ) : null}
    </>
  );
}

export default Poster;
