import type { Player } from '@/player';
import type { Source } from '@/types/source';

/**
 * safeLoadSource utility
 *
 * @description The function attempts to safely load the source of media data
 * @author Andrei Petrov
 *
 * @param {Player} player - player instance
 * @param {Source | string} source - source of the media data
 */
export function safeLoadSource(player: Player, source: string | Source) {
  if (!player) {
    throw new Error(`The source "${source}" cannot be loaded. The player is not initialized`);
  }

  try {
    player.loadSource(source);
  } catch {
    throw new Error(`The source "${source}" cannot be loaded. Invalid source`);
  }
}
