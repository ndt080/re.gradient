import { onCreated, onBeforeDisposed } from './api/lifecycle';
import { Events, FullscreenChangeEvents } from './modules/events-emmiter/values';
import { useModule } from './api/module';

export * from './api/player';

export { useModule };
export { onCreated, onBeforeDisposed };
export {  Events, FullscreenChangeEvents };
