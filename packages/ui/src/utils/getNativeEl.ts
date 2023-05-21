/**
 * getNativeEl utility
 *
 * @description Returns the first element that is a descendant of ShadowDOM node that matches selectors
 * @author Andrei Petrov
 *
 * @param {HTMLElement} host - an HTMLElement having a shadow house
 * @param {string} selector - selector of the desired node
 * @return {HTMLElement | null}
 */
export function getNativeEl<T extends HTMLElement>(host: HTMLElement, selector: string): T | null {
  return host.shadowRoot?.querySelector<T>(selector) ?? null;
}
