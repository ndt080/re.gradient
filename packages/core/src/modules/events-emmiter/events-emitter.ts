import { useModule } from '../../api/module';
import { usePlayerExtend } from '../../utils/usePlayerExtend';

export type EventMap = HTMLMediaElementEventMap;
export type Event = keyof EventMap | Array<keyof EventMap>;
export type EventListener = (ev: EventMap[keyof EventMap]) => void;

const normalizeEvent = (event: Event) => {
  return !Array.isArray(event) ? [event] :  event;
}

export const EventEmitter = useModule(({ player }) => {
  usePlayerExtend({
    on(event: Event, listener: EventListener) {
      normalizeEvent(event).forEach((e) => {
        player.$mediaEl.addEventListener(e, listener);
      });
      return player;
    },

    once(event: Event, listener: EventListener) {
      const onceListener = (ev: EventMap[keyof EventMap]) => {
        player.off(event, onceListener);
        return listener(ev);
      };
      return player.on(event, onceListener);
    },

    off(event: Event, listener: EventListener) {
      normalizeEvent(event).forEach((e) => {
        player.$mediaEl.removeEventListener(e, listener);
      });
      return player;
    },
  });
});

export interface EventEmitter {
  on(event: Event, listener: EventListener): this;
  once(event: Event, listener: EventListener): this;
  off(event: Event, listener: EventListener): this;
}
