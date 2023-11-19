import { toHMSStrings } from '@shared/utils/toHMS.ts';
import type { ComponentType } from 'solid-element';
import { createSignal, Match, onCleanup, onMount, Switch } from 'solid-js';

export interface TimeViewProps {
  variant: 'both' | 'currentTime' | 'duration';
}

const TimeView: ComponentType<TimeViewProps> = (props, { player }) => {
  const [duration, setDuration] = createSignal<number>(0);
  const [currentTime, setCurrentTime] = createSignal<number>(0);

  onMount(() => {
    player.on('durationchange', onDurationChange);
    player.on('timeupdate', onTimeUpdate);
  });

  onCleanup(() => {
    player.off('durationchange', onDurationChange);
    player.off('timeupdate', onTimeUpdate);
  });

  const onDurationChange = () => setDuration(player.$mediaEl.duration);
  const onTimeUpdate = () => setCurrentTime(player.$mediaEl.currentTime);

  const formatTime = (time: number, max = 0) => {
    if (!max) return '00:00';
    const { h, m, s } = toHMSStrings(time);
    return max < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  return (
    <Switch>
      <Match when={props.variant === 'both'}>
        <span>{formatTime(currentTime(), duration())}</span>
        <span> / </span>
        <span>{formatTime(duration(), duration())}</span>
      </Match>
      <Match when={props.variant === 'currentTime'}>
        <span>{formatTime(currentTime(), duration())}</span>
      </Match>
      <Match when={props.variant === 'duration'}>
        <span>{formatTime(duration(), duration())}</span>
      </Match>
    </Switch>
  );
};

export default TimeView;
