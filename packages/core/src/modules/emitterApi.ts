import { useModule } from '@/utils';

const ContainerEvents = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];

const normalizeEvent = <TEvent>(event: TEvent) => {
  return !Array.isArray(event) ? [event] : event;
};

const EmitterApiModule = useModule(({ player }) => {
  player.on = function <TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ) {
    normalizeEvent(event).forEach((e) => {
      const target = ContainerEvents.includes(e) ? this.$containerEl : this.$mediaEl;
      target.addEventListener(e, listener);
    });
    return this;
  };

  player.once = function <TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ) {
    const onceListener = (ev: TEventMap[keyof TEventMap]) => {
      this.off(event, onceListener);
      return listener(ev);
    };
    return this.on(event, onceListener);
  };

  player.off = function <TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ) {
    normalizeEvent(event).forEach((e) => {
      const target = ContainerEvents.includes(e) ? this.$containerEl : this.$mediaEl;
      target.removeEventListener(e, listener);
    });
    return this;
  };
});

export declare class EmitterApi {
  on<TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ): this;

  once<TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ): this;

  off<TEventMap extends EventMap = EventMap>(
    event: Event<TEventMap>,
    listener: EventListener<TEventMap>,
  ): this;
}

export declare type EventMap = HTMLMediaElementEventMap;

export declare type Event<TEventMap extends EventMap = EventMap> =
  | keyof TEventMap
  | Array<keyof TEventMap>;

export declare type EventListener<TEventMap extends EventMap = EventMap> = (
  ev: TEventMap[keyof TEventMap],
) => void;

export default EmitterApiModule;
