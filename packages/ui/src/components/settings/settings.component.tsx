import { BaseComponent, CustomElement, withTooltip } from '../../core';
import { SettingsIcon } from '../../icons';
import $styles from './settings.styles.scss?inline';

@CustomElement('drk-vi-settings')
@withTooltip('[data-tooltip="tooltip"]')
class SettingsComponent extends BaseComponent {
  $$styles = $styles;

  render() {
    return (
      <div class="drk-vi-settings">
        <SettingsIcon className="drk-vi-settings__icon" width="24" height="24" />

        <span data-tooltip="tooltip" role="tooltip" className="drk-vi-tooltip">
          Settings
        </span>
      </div>
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drk-vi-settings': SettingsComponent;
  }

  interface IntrinsicElements {
    ['drk-vi-settings']: SettingsComponent;
  }
}
