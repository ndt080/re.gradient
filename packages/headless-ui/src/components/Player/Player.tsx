import type { Track } from '@re.gradient/core';
import { Player as PlayerClass, safeLoadSource, safeLoadTracks } from '@re.gradient/core';
import type { ComponentType } from 'solid-element';
import { createEffect, createSignal, JSX, on, onCleanup, onMount, splitProps } from 'solid-js';

export type PlayerProps = {
  src: string;
  tracks: Track[];
} & JSX.VideoHTMLAttributes<HTMLVideoElement>;

const Player: ComponentType<PlayerProps> = (props, { element }) => {
  const [$props, $restProps] = splitProps(props, ['src', 'tracks']);

  const [mediaRef, setMediaRef] = createSignal<HTMLVideoElement>();
  const [player, setPlayer] = createSignal<PlayerClass>();

  onMount(() => {
    const media = mediaRef();

    if (!media || !element) {
      throw 'Media or container elements not found';
    }

    const player = new PlayerClass(media, element);
    element.player = player;
    player.triggerHook('created');
    setPlayer(player);
  });

  onCleanup(() => {
    player()?.dispose();
  });

  createEffect(
    on(
      () => $props.src,
      () => $props.src && safeLoadSource(player(), $props.src),
    ),
  );

  createEffect(
    on(
      () => $props.tracks,
      () => $props.tracks?.length && safeLoadTracks(player(), $props.tracks),
    ),
  );

  const onTogglePlay = () => player()?.togglePlay();

  return (
    <>
      <video {...$restProps} ref={setMediaRef} onClick={onTogglePlay} part="media" />
      <slot />
    </>
  );
};

export default Player;
