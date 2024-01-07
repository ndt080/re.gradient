import { debounce } from '@shared/utils/debounce.ts';
import type { ComponentType } from 'solid-element';
import { createSignal, onCleanup, onMount } from 'solid-js';

const StatusAttribute = 'data-status';
const HoverAttribute = 'data-hover';
const WaitedAttribute = 'data-move-waited';

interface Props {
  moveWaitingTime: number;
}

const ControlGroup: ComponentType<Props> = (props, { element, player }) => {
  const [timer, setTimer] = createSignal<ReturnType<typeof setTimeout>>();

  onMount(() => {
    player.on('pause', onPause);
    player.on('play', onPlay);
    player.on('playing', onPlaying);

    player.$containerEl.addEventListener('mouseover', onMouseOver);
    player.$containerEl.addEventListener('mouseout', onMouseOut);
    player.$containerEl.addEventListener('mousemove', onMouseMove);
  });

  onCleanup(() => {
    player.off('pause', onPause);
    player.off('play', onPlay);
    player.off('playing', onPlaying);

    player.$containerEl.removeEventListener('mouseover', onMouseOver);
    player.$containerEl.removeEventListener('mouseout', onMouseOut);
    player.$containerEl.removeEventListener('mouseout', onMouseMove);
  });

  const changeStatus = (status: string) => {
    element.setAttribute(StatusAttribute, status);
  };

  const clearTimer = () => {
    const currentTimerId = timer();
    currentTimerId && clearTimeout(currentTimerId);
    currentTimerId && element.removeAttribute(WaitedAttribute);
  };

  const onPause = () => changeStatus('pause');
  const onPlay = () => changeStatus('play');
  const onPlaying = () => changeStatus('playing');

  const onMouseOver = () => {
    element.setAttribute(HoverAttribute, 'over');
    element.removeAttribute(WaitedAttribute);
  };

  const onMouseOut = () => {
    element.setAttribute(HoverAttribute, 'out');
    element.removeAttribute(WaitedAttribute);
    clearTimer();
  };

  const onMouseMove = debounce((e: unknown) => {
    clearTimer();
    onMouseOver();

    if (element.contains((e as MouseEvent).target as HTMLElement)) {
      return;
    }

    setTimer(setTimeout(() => element.setAttribute(WaitedAttribute, ''), props.moveWaitingTime));
  }, 150);

  changeStatus('none');

  return <slot />;
};

export default ControlGroup;
