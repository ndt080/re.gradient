import { Player } from '@darkvi/core';

/**
 * getPlayerInstanceFromControl utility
 *
 * @description The function allows you to get an instance of the player from its control
 * @author Andrei Petrov
 *
 * @param {HTMLElement} el - player control element
 * @param {string} propertyKey - player instance property key
 * @return {Player | null}
 */
export function getPlayerInstanceFromControl(
  el: HTMLElement,
  propertyKey = '_player',
): Player | null {
  const playerElement = el.parentElement;

  if (!playerElement) {
    return null;
  }

  return (Reflect.get(playerElement, propertyKey) as Player) ?? null;
}
