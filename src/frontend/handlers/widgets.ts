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
  findAndExposeTabIndexFromSearch(elementsToSearch: any): void;

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
 * Alert widget handler
 */
export declare class Alert extends Base {
  dismiss(): void;
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

/**
 * Progress widget handler
 */
export declare class Progress extends Base {
  intersectionObserver?: IntersectionObserver;
  onElementChange(propertyName: string): void;
}

/**
 * Video widget handler with full video API integration
 */
export declare class Video extends Base {
  player?: any;
  apiProvider?: any;
  youtubePlayer?: any;

  // Default settings for video elements
  getDefaultSettings(): {
    selectors: {
      imageOverlay: string;
      video: string;
      videoIframe: string;
      playIcon: string;
    };
  };

  // Default elements based on selectors
  getDefaultElements(): {
    $imageOverlay: JQuery;
    $video: JQuery;
    $videoIframe: JQuery;
    $playIcon: JQuery;
  };

  // Core video functionality
  handleVideo(): void;
  playVideo(): void;
  animateVideo(): Promise<void>;
  hideLightbox(): Promise<void>;

  // Provider-specific video handling
  prepareYTVideo(YT: any, onOverlayClick?: boolean): void;
  prepareVimeoVideo(Vimeo: any, onOverlayClick?: boolean): void;

  // Video management
  changeVideoSize(): void;
  handleAspectRatio(): void;
  startVideoLoop(player: any): void;
  pauseVideoLoop(): void;

  // Event handling
  bindEvents(): void;
  onElementChange(propertyName: string): void;

  // Lifecycle methods
  onInit(): void;
}

/**
 * Background video handler
 */
export declare class BackgroundVideo extends Base {
  player?: any;
  isFramework?: boolean;

  onElementChange(propertyName: string): void;
  playVideo(): void;
  pauseVideo(): void;
  showVideoFrame(): void;
  hideVideoFrame(): void;
  prepareYTVideo(YT: any): void;
  prepareVimeoVideo(Vimeo: any): void;
  changeVideoSize(): void;
  startVideoLoop(player: any): void;
  pauseVideoLoop(): void;
  setEntranceAnimation(animation: string): void;
}

/**
 * Text editor widget handler
 */
export declare class TextEditor extends Base {
  onElementChange(propertyName: string): void;
  dropCapLetterHeightFix(): void;
}

/**
 * WP Audio widget handler
 */
export declare class WpAudio extends Base {
  onElementChange(propertyName: string): void;
  initAudio(): void;
}

/**
 * Handles position utility handler
 */
export declare class HandlesPosition extends Base {
  isFirstSection(): boolean;
  isOverflowHidden(): boolean;
  getOffset(): number;
  setHandlesPosition(): void;
}

/**
 * Background slideshow handler with Swiper integration and Ken Burns effect
 */
export declare class BackgroundSlideshow extends SwiperBase {
  // Default settings for slideshow classes and selectors
  getDefaultSettings(): {
    classes: {
      swiperContainer: string;
      swiperWrapper: string;
      swiperSlide: string;
      swiperPreloader: string;
      slideBackground: string;
      kenBurns: string;
      kenBurnsActive: string;
      kenBurnsIn: string;
      kenBurnsOut: string;
    };
  };

  // Swiper configuration for background slideshow
  getSwiperOptions(): {
    grabCursor: boolean;
    slidesPerView: number;
    slidesPerGroup: number;
    loop: boolean;
    speed: number;
    autoplay: {
      delay: number;
      stopOnLastSlide: boolean;
    };
    handleElementorBreakpoints: boolean;
    on: {
      slideChange: () => void;
    };
    loopedSlides?: number;
    effect?: string;
    fadeEffect?: {
      crossFade: boolean;
    };
  };

  // Ken Burns effect management
  handleKenBurns(): void;

  // Slide management
  getSlidesCount(): number;

  // Lifecycle methods
  onInit(): void;
  run(): void;
}
