/**
 * Custom element decorator.
 * @author Andrei Petrov
 *
 * @param {string} tagName - name of the custom element tag
 * @constructor {CustomElementConstructor}
 */
export function CustomElement(tagName: string) {
  return function <T extends CustomElementConstructor>(constructor: T) {
    customElements.define(tagName, constructor);
  };
}
