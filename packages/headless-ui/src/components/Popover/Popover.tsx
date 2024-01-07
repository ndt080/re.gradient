import { autoUpdate, computePosition, offset, Placement, shift } from '@floating-ui/dom';
import type { ComponentType } from 'solid-element';
import { createMemo, createRenderEffect, onCleanup, onMount } from 'solid-js';

export interface PopoverProps {
  for: string;
  placement: Placement;
}

const Popover: ComponentType<PopoverProps> = (props, { element, player }) => {
  element.setAttribute('role', 'popover');

  const target = createMemo(() => {
    const id = props.for;
    if (!id) return;
    return player.$containerEl.querySelector(`#${id}`);
  });

  const show = () => {
    element.setAttribute('data-popover', 'visible');
    target()?.setAttribute('data-popover', 'visible');
  };

  const hide = () => {
    element.setAttribute('data-popover', 'hidden');
    target()?.setAttribute('data-popover', 'hidden');
  };

  onMount(() => {
    target()?.addEventListener('click', onToggle);
    document.addEventListener('click', onOutsideClick);
  });

  onCleanup(() => {
    target()?.removeEventListener('click', onToggle);
    document.removeEventListener('click', onOutsideClick);
  });

  createRenderEffect(() => {
    const targetRef = target();
    if (targetRef) {
      hide();
      autoUpdate(targetRef, element, () => {
        computePosition(targetRef, element as unknown as HTMLElement, {
          placement: props.placement,
          middleware: [shift({ boundary: player.$containerEl, padding: 4 }), offset(4)],
        }).then(({ x, y }) => {
          Object.assign(element.style, { left: `${x}px`, top: `${y}px` });
        });
      });
    }
  });

  const onOutsideClick = (e: Event) => {
    const eTarget = e.target as HTMLElement;
    !eTarget.contains(element) && hide();
  };

  const onToggle = async (e: Event) => {
    e.stopPropagation();
    element.getAttribute('data-popover') === 'hidden' ? show() : hide();
  };

  return (
    <>
      <slot />
    </>
  );
};

export default Popover;
