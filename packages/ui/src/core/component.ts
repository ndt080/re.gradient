export interface ComponentOptions {
  selector: string;
  template: string;
  styles?: string;
}

export function Component({ selector, styles, template }: ComponentOptions) {
  const createTemplate = (text: string) => {
    const el = document.createElement('template');
    el.innerHTML = text;
    return el;
  };

  return function (constructor: CustomElementConstructor) {
    const self = constructor.prototype;
    const originalConnectedCallback = self.connectedCallback;

    self.connectedCallback = function() {
      this.attachShadow({ mode: 'open' });

      const templateEl = createTemplate(template || '');
      this.shadowRoot?.appendChild(templateEl.content.cloneNode(true));

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles || '');
      this.shadowRoot!.adoptedStyleSheets = [sheet];
      originalConnectedCallback.call(this);
    }

    customElements.define(selector, constructor);
  };
}
