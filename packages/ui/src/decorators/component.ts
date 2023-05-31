import { ComponentDecoratorOptions } from '@/types';

/**
 * Web-component decorator.
 * @author Andrei Petrov
 *
 * @param {ComponentDecoratorOptions} options - parameters for initializing the web component
 * @constructor {CustomElementConstructor}
 */
export function Component({
  selector,
  styles,
  template,
  attributes = {},
}: ComponentDecoratorOptions) {
  const createTemplate = (text: string) => {
    const el = document.createElement('template');
    el.innerHTML = text;
    return el;
  };

  return function (constructor: CustomElementConstructor) {
    const self = constructor.prototype;
    const originalConnectedCallback = self.connectedCallback;

    self.render = function () {
      const templateEl = createTemplate(template || '');
      this.shadowRoot?.appendChild(templateEl.content.cloneNode(true));
    };

    self.connectedCallback = function () {
      this.attachShadow({ mode: 'open' });
      this.render();

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles || '');
      this.shadowRoot!.adoptedStyleSheets = [sheet];

      Object.keys(attributes).forEach((key) => {
        if (this.hasAttribute(key)) return;
        this.setAttribute(key, attributes[key]);
      });

      // Calling a callback that it has been overridden in HTMLElement
      originalConnectedCallback?.call(this);
    };

    customElements.define(selector, constructor);
  };
}

declare global {
  interface HTMLElement {
    /**
     * Special callback function defined inside the custom element's class definition.
     * Invoked when the custom element is first connected to the document's DOM.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
     */
    connectedCallback();

    /**
     * Special callback function defined inside the custom element's class definition.
     * Invoked when the custom element is disconnected from the document's DOM.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
     */
    disconnectedCallback();

    /**
     * Special callback function defined inside the custom element's class definition.
     * Invoked when the custom element is moved to a new document.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
     *
     * @param name - attribute name
     * @param oldValue - old attribute value
     * @param value - new attribute value
     */
    attributeChangedCallback(name: string, oldValue: string | null, value: string | null): void;

    /**
     * Function provided by @Component decorator for (re)render the HTMLElement template
     */
    render(): void;
  }
}
