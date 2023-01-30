import type Player from './player';

export abstract class PlayerEngine {
  protected readonly _player: Player;
  private _sourceUrl: string = '';
  private _sourceType: string = '';

  public priority = -1;

  abstract isSupported(): boolean;
  abstract isSourceSupported(type: string): CanPlayTypeResult;

  getSource() {
    return this._sourceUrl;
  }

  setSource(src: string, type: string) {
    this._sourceUrl = src;
    this._sourceType = type;

    if(this.isSourceSupported(this._sourceType)) {
      this._player.$mediaEl.src = this._sourceUrl;
    } else {
      throw new Error('This source is not supported by the current playback engine');
    }
  }

  constructor(player: Player) {
    this._player = player;
  }

  dispose(){};
}
