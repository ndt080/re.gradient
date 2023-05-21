import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { getNativeEl, safeLoadSource, transferAttributes } from '../../utils';
import $styles from './player.styles.scss?inline';

@Component({
  selector: 'drk-vi-player',
  template: `
    <div data-container class="drk-vi-player">
      <video data-media playsInline class="drk-vi-player__media"></video>

      <div class="drk-vi-player__layout">
        <slot></slot>
      </div>
    </div>
  `,
  styles: $styles,
})
export class PlayerComponent extends HTMLElement {
  static observedAttributes = ['src'];

  public _player!: Player;
  private _mediaEl!: HTMLMediaElement;
  private _containerEl!: HTMLDivElement;

  connectedCallback() {
    this._mediaEl = getNativeEl<HTMLMediaElement>(this, '[data-media]')!;
    this._containerEl = getNativeEl<HTMLDivElement>(this, '[data-container]')!;

    if (!this._mediaEl || !this._containerEl) {
      throw new Error('Error when creating the player view');
    }

    transferAttributes(this, this._mediaEl, ['src', 'srcset']);

    this._player = new Player(this._mediaEl, this._containerEl);
    this.id = this._player.id;

    this.dispatchCreatedEvent();
  }

  disconnectedCallback() {
    this._player.dispose();
  }

  attributeChangedCallback(name: string, _, value: string | null) {
    this.render();

    if (name === 'src' && value) {
      // load source after mount component
      setTimeout(() => safeLoadSource(this._player, value));
    }
  }

  private dispatchCreatedEvent() {
    const player = this._player;

    const event = new CustomEvent('created', {
      composed: true,
      bubbles: true,
      detail: player,
    });

    this.dispatchEvent(event);
    this._player.triggerHook('created');
  }
}

