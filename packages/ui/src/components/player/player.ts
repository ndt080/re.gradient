import DrkViPlayerStyles from './player.css?raw';
import { Component } from '../../core/component';
import { Player } from '@darkvi/core';

@Component({
  selector: 'drk-vi-player',
  template: `
  <div data-container class='drk-vi'>
    <video data-media class="drk-vi__video"></video>

    <div class="drk-vi__container">
      <slot></slot>
    </div>
  </div>
  `,
  styles: DrkViPlayerStyles,
})
export class PlayerComponent extends HTMLElement {
  private _player!: Player;

  private getPlayerElements(shadowRoot: ShadowRoot) {
    const mediaEl = shadowRoot.querySelector<HTMLMediaElement>('[data-media]');
    const containerEl = shadowRoot.querySelector<HTMLDivElement>('[data-container]');

    if(!mediaEl || !containerEl) {
      throw new Error('Error when creating the player view');
    }
    return { mediaEl, containerEl};
  }

  connectedCallback() {
    const { mediaEl, containerEl } = this.getPlayerElements(this.shadowRoot!);

    const player = new Player(mediaEl, containerEl);
    this._player = player;
    this.id = player.id;
  }

  disconnectedCallback() {
    this._player.dispose();
  }
}

