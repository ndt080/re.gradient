import { computePosition, offset, shift } from '@floating-ui/dom';
import type { ComponentType } from 'solid-element';
import { createMemo, createRenderEffect, onCleanup, onMount } from 'solid-js';

export type TargetElement = HTMLElement | [host: HTMLElement, target: HTMLElement];

export interface TooltipProps {
  target?: TargetElement;
  text: string;
}

const Tooltip: ComponentType<TooltipProps> = (props, { element }) => {
  element.setAttribute('part', 'tooltip');
  element.setAttribute('role', 'tooltip');

  const host = createMemo(() => (Array.isArray(props.target) ? props.target[0] : props.target));
  const target = createMemo(() => (Array.isArray(props.target) ? props.target[1] : props.target));

  onMount(() => {
    target()?.addEventListener('mouseenter', onShow);
    target()?.addEventListener('focus', onShow);
    target()?.addEventListener('mouseleave', onHide);
    target()?.addEventListener('blur', onHide);
    target()?.addEventListener('click', onHide);
  });

  onCleanup(() => {
    target()?.removeEventListener('mouseenter', onShow);
    target()?.removeEventListener('focus', onShow);
    target()?.removeEventListener('mouseleave', onHide);
    target()?.removeEventListener('blur', onHide);
    target()?.removeEventListener('click', onHide);
  });

  createRenderEffect(() => {
    const targetRef = target();

    if (targetRef) {
      host()?.setAttribute('data-tooltip', 'hidden');

      computePosition(targetRef, element as unknown as HTMLElement, {
        placement: 'top',
        middleware: [shift(), offset(2)],
      }).then(({ x, y }) => {
        Object.assign(element.style, { left: `${x}px`, top: `${y}px` });
      });
    }
  });

  const onShow = () => {
    host()?.setAttribute('data-tooltip', 'visible');
  };

  const onHide = () => {
    host()?.setAttribute('data-tooltip', 'hidden');
  };

  return <>{props.text}</>;
};

export default Tooltip;
