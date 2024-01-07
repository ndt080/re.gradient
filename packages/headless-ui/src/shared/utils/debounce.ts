/**
 * debounce utility
 * @description Allows you to call the function no more than once in a specified period of time
 * @author Andrei Petrov
 *
 * @param {Function} callback - function performed
 * @param {number} delay - execution delay
 */
export function debounce(callback: (...args: unknown[]) => unknown, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
}
