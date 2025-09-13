/**
 * Utility Classes for Elementor Modules
 * Additional utility classes used by the module system
 */

import type { ViewModule } from "./modules";

/**
 * Masonry layout utility class
 */
export declare class Masonry extends ViewModule {
  /**
   * Get default settings for masonry layout
   */
  getDefaultSettings(): {
    container: HTMLElement | null;
    items: HTMLElement[] | null;
    columnsCount: number;
    verticalSpaceBetween: number;
  };

  /**
   * Get default DOM elements
   */
  getDefaultElements(): {
    $container: JQuery<HTMLElement>;
    $items: JQuery<HTMLElement>;
  };

  /**
   * Run the masonry layout calculation
   */
  run(): void;
}

/**
 * Scroll observer configuration
 */
export interface ScrollObserverOptions {
  /** Value between 0-100 - determines intersection trigger points */
  sensitivity?: number;
  /** Callback triggered on each intersection point */
  callback: (data: {
    sensitivity?: number;
    isInViewport: boolean;
    scrollPercentage: number;
    intersectionScrollDirection: "up" | "down";
  }) => void;
  /** Offset between element intersection points and viewport */
  offset?: string;
  /** The element that events will be relative to */
  root?: HTMLElement | null;
}

/**
 * Scroll observer utility class
 */
export declare class Scroll {
  /**
   * Create a scroll observer for an element
   */
  static scrollObserver(options: ScrollObserverOptions): IntersectionObserver;

  /**
   * Get element's position in viewport as percentage
   * @param $element - jQuery element to calculate percentage for
   * @param offsetObj - Offset configuration
   * @param offsetObj.start - Offset start value in percentages
   * @param offsetObj.end - Offset end value in percentages
   * @returns Percentage of element in viewport (0-100)
   */
  static getElementViewportPercentage(
    $element: JQuery<HTMLElement>,
    offsetObj?: { start?: number; end?: number }
  ): number;

  /**
   * Get page scroll position as percentage
   * @param offsetObj - Offset configuration
   * @param offsetObj.start - Offset start value in percentages  
   * @param offsetObj.end - Offset end value in percentages
   * @param limitPageHeight - Will limit the page height calculation
   * @returns Percentage of page scrolled (0-100)
   */
  static getPageScrollPercentage(
    offsetObj?: { start?: number; end?: number },
    limitPageHeight?: number
  ): number;
}
