import { Player } from '../api/player';

export function usePlayerExtend(prototypes: { [key: string | symbol]: any }) {
  Reflect.ownKeys(prototypes).forEach((property) => {
    const originalDescriptor = Reflect.getOwnPropertyDescriptor(
      prototypes,
      property,
    );

    Reflect.defineProperty(Player.prototype, property, originalDescriptor!);
  });
}
