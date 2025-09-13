/**
 * Anchor Utilities
 * Handles anchor link scrolling with scroll-snap awareness and sticky element offset calculations
 */

import type { ViewModule } from "../../core";

/**
 * Anchor handler settings
 */
export interface AnchorSettings {
  /** Duration of scroll animation in milliseconds */
  scrollDuration: number;
  /** CSS selectors for anchor functionality */
  selectors: {
    /** Selector for anchor links */
    links: string;
    /** Selector for valid anchor targets */
    targets: string;
    /** Selector for scrollable container */
    scrollable: string;
  };
}

/**
 * Anchor handler elements
 */
export interface AnchorElements {
  /** jQuery scrollable element */
  $scrollable: JQuery<HTMLElement>;
  /** Index signature for compatibility with ModuleElements */
  [key: string]: JQuery<HTMLElement> | HTMLElement;
}

/**
 * Anchor Links Handler
 * Provides smooth scrolling to anchor targets with sticky element offset calculations
 * and scroll-snap awareness
 */
export declare class AnchorsHandler extends ViewModule {
  /**
   * Get default settings for anchor handler
   */
  getDefaultSettings(): AnchorSettings;

  /**
   * Get default DOM elements
   */
  getDefaultElements(): AnchorElements;

  /**
   * Bind click events to anchor links
   */
  bindEvents(): void;

  /**
   * Handle anchor link clicks with smooth scrolling
   * @param event - Click event from anchor link
   */
  handleAnchorLinks(event: Event): void;

  /**
   * Initialize the anchor handler
   */
  onInit(): void;
}