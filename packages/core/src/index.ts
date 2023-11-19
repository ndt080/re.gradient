import { Html5EngineModule } from '@/modules';
import { Player } from '@/player';

Player.use([Html5EngineModule]);

export { onBeforeDisposed, onCreated } from './modules';
export * from './types';
export * from './utils';
export { Player };
