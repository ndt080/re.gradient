import type { ComponentOptions } from 'component-register';
import { createMixin } from 'component-register';

export function registerStyleSheet(style: string) {
  return createMixin((options: ComponentOptions) => {
    const { element } = options;

    const styleTemplate = document.createElement('style');
    styleTemplate.innerHTML = style;
    element.renderRoot.prepend(styleTemplate);

    return options;
  });
}
