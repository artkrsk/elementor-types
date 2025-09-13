/**
 * WordPress Integration Types
 * Types for WordPress-specific functionality
 */

/**
 * WordPress media element integration
 */
export interface WordPressmedia {
  mediaelement: {
    initialize(): void;
  };
}

/**
 * WordPress translation function
 */
export interface WordPressI18n {
  __(text: string, domain?: string): string;
}

/**
 * Screenfull library types for fullscreen functionality
 */
export interface Screenfull {
  isEnabled: boolean;
  isFullscreen: boolean;
  element?: HTMLElement;
  request(element?: HTMLElement): Promise<void>;
  exit(): Promise<void>;
  toggle(element?: HTMLElement): Promise<void>;
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}
