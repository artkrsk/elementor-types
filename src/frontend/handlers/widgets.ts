/**
 * Widget Handler Classes
 * Specific widget handlers for various Elementor widgets
 */

import type { Base } from "./base";
import type { SwiperBase } from "./swiper";

/**
 * Base class for tab-like widgets (tabs, accordion, toggle) with comprehensive functionality
 */
export declare class TabsModule extends Base {
  // Default settings with comprehensive tab configuration
  getDefaultSettings(): {
    selectors: {
      tablist: string;
      tabTitle: string;
      tabContent: string;
    };
    classes: {
      active: string;
    };
    showTabFn: string;
    hideTabFn: string;
    toggleSelf: boolean;
    hidePrevious: boolean;
    autoExpand: boolean | string;
    keyDirection: {
      ArrowLeft: number;
      ArrowUp: number;
      ArrowRight: number;
      ArrowDown: number;
    };
  };

  // Default elements based on selectors
  getDefaultElements(): {
    $tabTitles: JQuery;
    $tabContents: JQuery;
  };

  // Core tab functionality
  activateDefaultTab(): void;
  handleKeyboardNavigation(event: KeyboardEvent): void;
  changeActiveTab(tabIndex: string | number): void;
  isActiveTab(tabIndex: string | number): boolean;
  activateTab(tabIndex: string | number): void;
  deactivateActiveTab(tabIndex?: string | number): void;

  // Search and accessibility features

  // Event binding
  bindEvents(): void;

  // Lifecycle methods
  onInit(): void;
  onEditSettingsChange(propertyName: string): void;
}

/**
 * Accordion widget handler
 */
export declare class Accordion extends TabsModule {}

/**
 * Tabs widget handler with specific tab behavior
 */
export declare class Tabs extends TabsModule {
  // Override default settings for tabs-specific behavior
  getDefaultSettings(): {
    toggleSelf: false;
  } & ReturnType<TabsModule["getDefaultSettings"]>;

  // Tab-specific keyboard navigation
  onTabKeyDown(event: KeyboardEvent): void;
}

/**
 * Toggle widget handler with accordion-like behavior
 */
export declare class Toggle extends TabsModule {
  // Override default settings for toggle-specific behavior
  getDefaultSettings(): {
    showTabFn: "slideDown";
    hideTabFn: "slideUp";
    hidePrevious: false;
    autoExpand: "editor";
  } & ReturnType<TabsModule["getDefaultSettings"]>;
}

/**
 * Counter widget handler with intersection observer and numerator animation
 */
export declare class Counter extends Base {
  intersectionObserver?: IntersectionObserver;

  // Default settings for selectors and behavior
  getDefaultSettings(): {
    selectors: {
      counterNumber: string;
    };
  };

  // Default elements based on selectors
  getDefaultElements(): {
    $counterNumber: JQuery;
  };

  // Initialize intersection observer for scroll-triggered animation
  onInit(): void;
}

