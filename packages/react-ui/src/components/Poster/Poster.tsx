import './Poster.scss';

import { Player } from '@darkvi/core';
import { useContext, useEffect, useState } from 'react';

import { PlayerContext } from '@/components';
import { PlayIcon } from '@/icons';

interface Props {
  src?: string;
  waitPlaying?: boolean;
}

function Poster({ src, waitPlaying = false }: Props) {
  const { $mediaEl, once } = useContext<Player | null>(PlayerContext);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(true);
  }, [src]);

  const onPosterClick = async () => {
    await $mediaEl.play();
    waitPlaying ? once('playing', () => setIsVisible(false)) : setIsVisible(false);
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
