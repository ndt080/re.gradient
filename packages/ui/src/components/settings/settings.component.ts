import { Component } from '../../decorators';
import { SettingsIcon } from '../../icons';
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
export class SettingsComponent extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-settings': SettingsComponent;
  }
}
