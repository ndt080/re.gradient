import type { ComponentOptions } from 'component-register';
import { createMixin } from 'component-register';

export function registerAsContainer(name: string, asControlled = false) {
  return createMixin((options: ComponentOptions) => {
    const { element } = options;
    element.setAttribute('role', 'region');
    element.setAttribute('data-container', name);
    asControlled && element.style.setProperty('grid-area', name);
    return options;
  });
}
