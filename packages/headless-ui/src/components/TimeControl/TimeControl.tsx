import { normalizeValue } from '@shared/utils/normalizeValue.ts';
import { toHMSStrings } from '@shared/utils/toHMS.ts';
import type { ComponentType } from 'solid-element';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';

const TimeControl: ComponentType<unknown> = (_, { element, player }) => {
  const [mouseIn, setMouseIn] = createSignal<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = createSignal<number>(0);
  const [pendingProgress, setPendingProgress] = createSignal<number>(0);

  const [playProgress, setPlayProgress] = createSignal<number>(0);
  const [bufferProgress, setBufferProgress] = createSignal<number>(0);

  onMount(() => {
    player.on('timeupdate', onProgressUpdate);
    player.on('progress', onBufferedUpdate);
    element.addEventListener('mousemove', onMouseIn);
    element.addEventListener('mouseout', onMouseOut);
    element.addEventListener('mousedown', onMouseOut);
  });

  onCleanup(() => {
    player.off('timeupdate', onProgressUpdate);
    player.off('progress', onBufferedUpdate);
    element.removeEventListener('mouseover', onMouseIn);
    element.removeEventListener('mouseout', onMouseOut);
    element.removeEventListener('mousedown', onMouseOut);
  });

  const onMouseIn = (e: MouseEvent) => {
    const { x, width } = (e.target as HTMLElement).getBoundingClientRect();
    const max = player.$mediaEl.duration;

    const tooltipPosition = e.x - x;
    setPendingProgress(normalizeValue(0, 1, tooltipPosition / width) * max);
    setTooltipPosition(tooltipPosition);
    setMouseIn(true);
  };

  const onMouseOut = () => setMouseIn(false);

  const onBufferedUpdate = () => {
    const { buffered, currentTime, duration } = player.$mediaEl;

    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(buffered.length - 1 - i) < currentTime) {
        setBufferProgress((buffered.end(buffered.length - 1 - i) / duration) * 100 || 0);
        break;
      }
    }
  };

  const onProgressUpdate = () => {
    const { currentTime, duration } = player.$mediaEl;
    setPlayProgress((currentTime * 100) / duration || 0);
  };

  const onChangeValue = (e: InputEvent) => {
    const value = Number((e.target as HTMLInputElement).value) || 0;
    const duration = player.$mediaEl.duration || 0;
    const currentTime = (value * duration) / 100;

    requestAnimationFrame(() => {
      player.$mediaEl.currentTime = currentTime;
      setPlayProgress(value);
    });
  };

  const formatTime = (time: number, max = 0) => {
    if (!max) return '00:00';
    const { h, m, s } = toHMSStrings(time);
    return max < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  return (
    <>
      <Show when={mouseIn()}>
        <span part="tooltip" style={{ left: `${tooltipPosition()}px` }}>
          {formatTime(pendingProgress(), player.$mediaEl.duration)}
        </span>
      </Show>

      <div
        part="timeline"
        style={{
          height: 'var(--time-control-range-height)',
          'max-height': 'var(--time-control-range-height)',
        }}
      >
        <input
          type="range"
          part="range"
          max="100"
          min="0"
          step="0.1"
          value={playProgress()}
          onInput={onChangeValue}
          style={{ '--value': `${playProgress()}%` }}
        />
        <progress aria-hidden="true" max="100" part="progress" value={bufferProgress()} />
      </div>
    </>
  );
};

export default TimeControl;
