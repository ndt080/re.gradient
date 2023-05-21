export interface ComponentDecoratorOptions {
  /** The tag name of the web component being created */
  selector: string;
  /** HTML component markup in string format */
  template: string;
  /** CSS component styles in string format for initializing CSSStyleSheet */
  styles?: string;
}
