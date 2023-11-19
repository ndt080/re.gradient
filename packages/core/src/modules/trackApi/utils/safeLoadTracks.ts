import type { Player } from '@/player';

import { Track } from '../types';

/**
 * safeLoadTracks utility
 *
 * @description The function attempts to safely load the caption and subtitle tracks
 * @author Andrei Petrov
 *
 * @param {Player} player - player instance
 * @param {Track[]} tracks - the caption and subtitle tracks
 */
export function safeLoadTracks(player: Player, tracks: Track[]) {
  if (!player) {
    throw new Error('Tracks cannot be loaded. The player is not initialized');
  }

  try {
    player.loadTracks(tracks);
  } catch {
    throw new Error('Tracks cannot be loaded. Invalid tracks data');
  }
}
