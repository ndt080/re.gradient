/**
 * throttle utility
 * @description Allows you to call the function no more than once in a specified period of time
 * @author Andrei Petrov
 *
 * @param {Function} callback - function performed
 * @param {number} delay - execution delay
 */
export function throttle(callback: (...args: unknown[]) => unknown, delay: number) {
  let prev = 0;

  return (...args: unknown[]) => {
    const now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;
      return callback(...args);
    }
  };
}
