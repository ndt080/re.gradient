import type { ComputePositionReturn, Placement } from '@floating-ui/dom';
import { computePosition, offset } from '@floating-ui/dom';

import { getNativeEl } from '@/utils';

type EventType = keyof HTMLElementEventMap;
type EventListener = (this: HTMLElement, e: Event) => void;

export function withTooltip(selector: string, placement: Placement = 'top') {
  return function <T extends CustomElementConstructor>(constructor: T) {
    return class extends constructor {
      get _tooltipEvents() {
        return [
          ['mouseenter', this.showTooltip],
          ['mouseleave', this.hideTooltip],
          ['focus', this.showTooltip],
          ['blur', this.hideTooltip],
        ];
      }

      showTooltip = async () => {
        const tooltipEl = getNativeEl(this, selector);
        if (!tooltipEl) return;

        const updateTooltipPosition = ({ x, y }: ComputePositionReturn) => {
          Object.assign(tooltipEl.style, { left: `${x}px`, top: `${y}px` });
        };

        await computePosition(this, tooltipEl, {
          placement,
          middleware: [offset(6)],
        }).then(updateTooltipPosition);
        
        tooltipEl.classList.add('drk-vi-tooltip--open');
      };

      hideTooltip = () => {
        const tooltipEl = getNativeEl(this, selector);
        tooltipEl?.classList.remove('drk-vi-tooltip--open');
      };

      onCreated() {
        this._tooltipEvents.forEach(([event, listener]) => {
          this.addEventListener(event as EventType, listener as EventListener);
        });

        super['onCreated']?.();
      }

      onDestroy() {
        this._tooltipEvents.forEach(([event, listener]) => {
          this.removeEventListener(event as EventType, listener as EventListener);
        });

        super['onDestroy']?.();
      }
    };
  };
}
