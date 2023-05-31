import { Player, safeLoadSource } from '@darkvi/core';

import { Component } from '../../decorators';
import { getNativeEl, transferAttributes } from '../../utils';
import $styles from './player.styles.scss?inline';

const EXCLUDE_ATTRIBUTES = ['src', 'srcset', 'style'];

@Component({
  selector: 'drk-vi-player',
  template: `
    <div data-container class="drk-vi-player">
      <video data-media playsInline crossorigin class="drk-vi-player__media"></video>

      <div class="drk-vi-player__layout">
        <slot></slot>
      </div>
    </div>
  `,
  styles: $styles,
})
export class PlayerComponent extends HTMLElement {
  static observedAttributes = ['src', 'poster'];

  public _player!: Player;

  private _mediaEl!: HTMLMediaElement;
  private _containerEl!: HTMLDivElement;

  connectedCallback() {
    this._mediaEl = getNativeEl<HTMLMediaElement>(this, '[data-media]')!;
    this._containerEl = getNativeEl<HTMLDivElement>(this, '[data-container]')!;

    if (!this._mediaEl || !this._containerEl) {
      throw new Error('Error when creating the player view');
    }

    transferAttributes(this, this._mediaEl, EXCLUDE_ATTRIBUTES);
    this._mediaEl.muted = Boolean(this.hasAttribute('muted'));

    this._player = new Player(this._mediaEl, this._containerEl);
    this.id = this._player.id;

    this.dispatchCreatedEvent();
    this._mediaEl.addEventListener('click', this.onPlayerClick);
  }

  disconnectedCallback() {
    this._player.dispose();
    this._mediaEl.removeEventListener('click', this.onPlayerClick);
  }

  attributeChangedCallback(name: string, _, value: string | null) {
    if (name === 'src' && value) {
      requestAnimationFrame(() => {
        safeLoadSource(this._player, value);
      });
      return;
    }

    requestAnimationFrame(() => {
      transferAttributes(this, this._mediaEl, EXCLUDE_ATTRIBUTES);
    });
  }

  private onPlayerClick = () => this._player.togglePlay();

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

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-player': PlayerComponent;
  }
}
