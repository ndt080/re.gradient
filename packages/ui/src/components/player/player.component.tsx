import { Player, safeLoadSource, safeLoadTracks } from '@darkvi/core';

import { BaseComponent, CustomElement } from '../../core';
import { getNativeEl, transferAttributes } from '../../utils';
import $styles from './player.styles.scss?inline';

const EXCLUDE_ATTRIBUTES = ['src', 'srcset', 'style'];

@CustomElement('drk-vi-player')
export class PlayerComponent extends BaseComponent {
  static observedAttributes = ['src', 'poster', 'tracks'];

  $$styles = $styles;

  _player!: Player;
  mediaEl!: HTMLMediaElement;

  onCreated() {
    const containerEl = getNativeEl<HTMLDivElement>(this, '[data-ref="container"]');
    const mediaEl = getNativeEl<HTMLMediaElement>(this, '[data-ref="media"]');

    if (!mediaEl || !containerEl) {
      throw new Error('Error when creating the player view');
    }

    transferAttributes(this, mediaEl, EXCLUDE_ATTRIBUTES);
    mediaEl.muted = Boolean(this.hasAttribute('muted'));

    this._player = new Player(mediaEl, containerEl);
    this.id = this._player.id;
    this.mediaEl = mediaEl;

    this.dispatchCreatedEvent();
  }

  onDestroy() {
    this._player.dispose();
  }

  attributeChangedCallback(name: string, _, value: string | null) {
    switch (name) {
      case 'src':
        if (value) {
          requestAnimationFrame(() => safeLoadSource(this._player, value));
        }
        break;
      case 'tracks':
        try {
          const tracks = JSON.parse(value || '[]');

          if (Array.isArray(tracks) && tracks.length) {
            requestAnimationFrame(() => safeLoadTracks(this._player, tracks));
          }
        } catch {
          throw new Error('Invalid tracks attribute. The attribute takes an array as a value');
        }
        break;
      default:
        requestAnimationFrame(() => {
          transferAttributes(this, this.mediaEl, EXCLUDE_ATTRIBUTES);
        });
    }
  }

  render(): Node {
    return (
      <div data-ref="container" class="drk-vi-player drk-vi-unselectable">
        <video
          data-ref="media"
          playsInline
          crossorigin
          class="drk-vi-player__media"
          onclick={() => this._player.togglePlay()}
        />

        <div class="drk-vi-player__layout">
          <slot></slot>
        </div>
      </div>
    );
  }

  private dispatchCreatedEvent() {
    const player = this._player;

    const event = new CustomEvent('created', {
      composed: true,
      bubbles: true,
      detail: player,
    });

    this.dispatchEvent(event);
    player.triggerHook('created');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-player': PlayerComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-player']: PlayerComponent;
  }
}

