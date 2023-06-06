import type { Player } from '@/player';
import type { SpreadableConstructor } from '@/types';

type EventMap = HTMLMediaElementEventMap;
type Event = keyof EventMap | Array<keyof EventMap>;
type EventListener = (ev: EventMap[keyof EventMap]) => void;

export function withEmitterApi<T extends SpreadableConstructor<Player>>(constructor: T) {
  const normalizeEvent = (event: Event) => {
    return !Array.isArray(event) ? [event] : event;
  };

  return class extends constructor {
    on(event: Event, listener: EventListener) {
      normalizeEvent(event).forEach((e) => {
        this.$mediaEl.addEventListener(e, listener);
      });
      return this;
    }

    once(event: Event, listener: EventListener) {
      const onceListener = (ev: EventMap[keyof EventMap]) => {
        this.off(event, onceListener);
        return listener(ev);
      };
      return this.on(event, onceListener);
    }

    off(event: Event, listener: EventListener) {
      normalizeEvent(event).forEach((e) => {
        this.$mediaEl.removeEventListener(e, listener);
      });
      return this;
    }
  };
}

export declare class EmitterApi {
  on(event: Event, listener: EventListener): this;

  once(event: Event, listener: EventListener): this;

  off(event: Event, listener: EventListener): this;
}
