/**
 * transferAttributes utility
 * @description Copy HTML attributes from one element to another
 * @author Andrei Petrov
 *
 * @param {HTMLElement} fromEl - attribute source element
 * @param {HTMLElement} toEl - target element
 * @param {string[]} excludeAttributes -list of attributes to ignore
 */
export function transferAttributes(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  excludeAttributes: string[] = [],
) {

  for (const name of fromEl.getAttributeNames()) {
    if (excludeAttributes.includes(name)) continue;

    const value = fromEl.getAttribute(name);
    toEl.setAttribute(name, value ?? 'true');
  }
}
