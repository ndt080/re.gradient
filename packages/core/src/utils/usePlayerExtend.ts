import { Player } from '@/player';

export function usePlayerExtend(prototypes: Record<string | symbol, unknown>) {
  Reflect.ownKeys(prototypes).forEach((property) => {
    const originalDescriptor = Reflect.getOwnPropertyDescriptor(prototypes, property);

    if (!originalDescriptor) {
      throw new Error('Error during updating of the Player prototype');
    }

    Reflect.defineProperty(Player.prototype, property, originalDescriptor);
  });
}
