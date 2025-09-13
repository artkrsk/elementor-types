/**
 * URL Actions Utility
 * Handles special Elementor action URLs for lightbox, popups, and other frontend actions
 */

import type { ViewModule } from "../../core";

/**
 * URL Actions settings
 */
export interface UrlActionsSettings {
  /** CSS selectors for URL actions */
  selectors: {
    /** Selector for action links */
    links: string;
  };
}

/**
 * Action callback function signature
 */
export type ActionCallback = (settings: any, ...args: any[]) => void | Promise<void>;

/**
 * Actions registry
 */
export interface ActionsRegistry {
  /** Lightbox action */
  lightbox: ActionCallback;
  /** Additional custom actions */
  [actionName: string]: ActionCallback;
}

/**
 * Lightbox action settings
 */
export interface LightboxActionSettings {
  /** Content URL */
  url?: string;
  /** Attachment ID for images */
  id?: string;
  /** Content type */
  type?: 'image' | 'video' | 'iframe';
  /** Slideshow configuration */
  slideshow?: any;
  /** Previous triggering event */
  previousEvent?: Event;
}

/**
 * URL Actions Handler
 * Processes special Elementor action URLs and executes corresponding actions
 */
export declare class UrlActions extends ViewModule {
  /** Available actions registry */
  actions: ActionsRegistry;

  /**
   * Get default settings
   */
  getDefaultSettings(): UrlActionsSettings;

  /**
   * Bind click events to action links
   */
  bindEvents(): void;

  /**
   * Initialize built-in actions (lightbox, etc.)
   */
  initActions(): void;

  /**
   * Add custom action to registry
   * @param name - Action name
   * @param callback - Action callback function
   */
  addAction(name: string, callback: ActionCallback): void;

  /**
   * Execute action from URL
   * @param url - Action URL containing action and settings
   * @param restArgs - Additional arguments
   */
  runAction(url: string, ...restArgs: any[]): void;

  /**
   * Handle link click events
   * @param event - Click event
   */
  runLinkAction(event: Event): void;

  /**
   * Execute action from current page hash
   * Only runs if element with matching hash exists on page
   */
  runHashAction(): void;

  /**
   * Create action hash URL
   * @param action - Action name
   * @param settings - Action settings to encode
   * @returns Encoded action hash URL
   */
  createActionHash(action: string, settings: any): string;
}