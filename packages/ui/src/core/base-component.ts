/**
 * Class of the base component
 * @abstract
 * @class
 * @extends HTMLElement
 * @author Andrei Petrov
 */
export abstract class BaseComponent extends HTMLElement {
  /**
   * A string of CSS styles to be applied when creating the component
   * @type {string}
   * @protected
   */
  protected $$styles = '';
  /**
   * An object of attributes to be applied when creating the component
   * @type {Record<string, string>}
   * @protected
   */
  protected $$attributes: Record<string, string> = {};

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    this.__renderTemplate();
    this.__applyStyles();
    this.__applyAttributes();

    this.onCreated();
    requestAnimationFrame(() => this.onMount());
  }

  disconnectedCallback() {
    this.onDestroy();
  }

  /**
   * A method for describing the HTML template of a component. Returns the DOM Node that will be attached to the Shadow DOM of the component.
   * @abstract
   * @return {Node}
   */
  abstract render(): Node;

  /**
   * A component lifecycle method called immediately after the component is created
   * @return {void | Promise<void>}
   * @protected
   */
  protected onCreated(): void | Promise<void> {
    return;
  }

  /**
   * The component lifecycle method called after the first rendering of the component.
   * @return {void | Promise<void>}
   * @protected
   */
  protected onMount(): void | Promise<void> {
    return;
  }

  /**
   * Component lifecycle method called when the component template is recreated
   * @return {void | Promise<void>}
   * @protected
   */
  protected onUpdated(): void | Promise<void> {
    return;
  }

  /**
   * Component lifecycle method called when the component is destroyed
   * @return {void | Promise<void>}
   * @protected
   */
  protected onDestroy(): void | Promise<void> {
    return;
  }

  /**
   * A method that allows you to indicate to the component that the data has changed, and the component needs to recreate the template
   * @return {void}
   * @protected
   */
  protected $$detectChanges() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = '';
    this.__renderTemplate();
    this.onUpdated();
  }

  private __renderTemplate() {
    const template = this.render();

    if (template) {
      this.shadowRoot?.appendChild(template);
    }
  }

  private __applyStyles() {
    if (!this.shadowRoot) return;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(this.$$styles || '');
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  private __applyAttributes() {
    Object.keys(this.$$attributes).forEach((key) => {
      if (this.hasAttribute(key)) return;
      this.setAttribute(key, this.$$attributes[key]);
    });
  }
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
  }
}
