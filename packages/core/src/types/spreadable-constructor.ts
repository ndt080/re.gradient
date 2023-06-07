/**
 * Interface for correcting typing when using decorators
 * Error: TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'.
 *
 * @author: Andrei Petrov
 */
export interface SpreadableConstructor<T> {
  new(...args: any[]): T;
}
