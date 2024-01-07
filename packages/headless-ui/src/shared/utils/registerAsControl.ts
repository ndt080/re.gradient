import type { ComponentOptions } from 'component-register';
import { createMixin } from 'component-register';

export function registerAsControl(name: string) {
  return createMixin((options: ComponentOptions) => {
    const { element } = options;
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('data-control', name);
    element.setAttribute('aria-controls', name);
    element.style.setProperty('grid-area', name);
    return options;
  });
}
