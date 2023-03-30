import { EventEmitterModule, FullscreenModule, Html5EngineModule } from '@/modules';
import { Player } from '@/player';

Player.use([Html5EngineModule, EventEmitterModule, FullscreenModule]);

export { onBeforeDisposed, onCreated } from './modules';
export { useEngineModule, useModule } from './utils';
export { Player };
