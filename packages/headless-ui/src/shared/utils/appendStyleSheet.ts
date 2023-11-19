import type { ComponentOptions } from 'component-register';
import { createMixin } from 'component-register';

export function appendStyleSheet(style: string) {
  return createMixin((options: ComponentOptions) => {
    const { element } = options;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(style);
    (element.renderRoot as ShadowRoot).adoptedStyleSheets?.push(sheet);
    return options;
  });
}
