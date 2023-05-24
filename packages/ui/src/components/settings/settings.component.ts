import { Player } from '@darkvi/core';

import { Component } from '../../decorators';
import { SettingsIcon } from '../../icons';
import { getPlayerInstanceFromControl } from '../../utils';
import $styles from './settings.styles.scss?inline';

@Component({
  selector: 'drk-vi-settings',
  template: `
    <div class="drk-vi-settings" title="Settings">
      ${SettingsIcon({
        className: 'drk-vi-settings__icon',
        width: '24',
        height: '24',
      })}
    </div>
  `,
  styles: $styles,
})
export class SettingsComponent extends HTMLElement {
  private get _player(): Player {
    return getPlayerInstanceFromControl(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onControlClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onControlClick);
  }

  private onControlClick = async () => {};
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-settings': SettingsComponent;
  }
}
