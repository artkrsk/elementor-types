/**
 * Frontend Handler Classes Interfaces
 *
 * Proper TypeScript interfaces for Elementor frontend handler classes
 * that replace the 'any' types in ElementorFrontendHandlers
 */

import { ViewModule, ModuleElements } from "../core";
import { SwiperOptions } from "../third-party";

/**
 * Base settings for handlers
 */
export interface FrontendHandlerSettings {
  /** Main element jQuery object */
  $element: JQuery;
  /** Additional settings */
  [key: string]: any;
}

/**
 * Handler elements collection extends ModuleElements
 */
export interface FrontendHandlerElements extends ModuleElements {
  /** Main element */
  $element: JQuery<HTMLElement>;
  /** Container element */
  $container: JQuery<HTMLElement>;
  /** Slides for carousel/swiper handlers */
  $slides: JQuery<HTMLElement>;
  /** Swiper container */
  $swiperContainer: JQuery<HTMLElement>;
  /** Swiper wrapper */
  $swiperWrapper: JQuery<HTMLElement>;
  /** Navigation arrows */
  $swiperArrows: JQuery<HTMLElement>;
  /** Pagination wrapper */
  $paginationWrapper: JQuery<HTMLElement>;
  /** Pagination bullets */
  $paginationBullets: JQuery<HTMLElement>;
}

/**
 * Frontend editor listener configuration
 */
export interface FrontendEditorListener {
  /** Event name */
  event: string;
  /** Event channel */
  to: any;
  /** Callback function */
  callback: (...args: any[]) => void;
}

/**
 * Base frontend handler interface
 */
export interface FrontendHandlerBase extends ViewModule {
  /** Main element jQuery object */
  $element: JQuery;

  /** Editor event listeners */
  editorListeners: FrontendEditorListener[] | null;

  /** Whether handler is in edit mode */
  isEdit: boolean | null;

  /** Handler elements collection */
  elements: FrontendHandlerElements | null;

  /** Element change callback */
  onElementChange?: (
    propertyName: string,
    controlView: any,
    elementView: any
  ) => void;

  /** Edit settings change callback */
  onEditSettingsChange?: (propertyName: string) => void;

  /** Page settings change callback */
  onPageSettingsChange?: (propertyName: string) => void;

  /**
   * Check if handler should be active
   */
  isActive(settings?: FrontendHandlerSettings): boolean;

  /**
   * Check if element is in current document
   */
  isElementInTheCurrentDocument(): boolean;

  /**
   * Get unique handler ID
   */
  getUniqueHandlerID(cid?: string, $element?: JQuery): string;

  /**
   * Initialize editor listeners
   */
  initEditorListeners(): void;

  /**
   * Add editor listeners
   */
  addEditorListeners(): void;

  /**
   * Remove editor listeners
   */
  removeEditorListeners(): void;

  /**
   * Get model CID
   */
  getModelCID(): string;

  /**
   * Get widget type
   */
  getWidgetType(): string;

  /**
   * Get element type
   */
  getElementType(): string;

  /**
   * Get constructor ID
   */
  getConstructorID(): string;

  /**
   * Get element settings
   */
  getElementSettings(setting?: string): any;

  /**
   * Get current device setting
   */
  getCurrentDeviceSetting(setting: string): any;

  /**
   * Get edit settings
   */
  getEditSettings(setting?: string): any;

  /**
   * Handler destruction
   */
  onDestroy(): void;
}

/**
 * Stretched element handler interface
 */
export interface FrontendStretchedElementHandler extends FrontendHandlerBase {
  /**
   * Get the CSS class for stretched elements
   */
  getStretchedClass(): string;

  /**
   * Get the setting name for stretch
   */
  getStretchSettingName(): string;

  /**
   * Get the active value for stretch setting
   */
  getStretchActiveValue(): string;

  /**
   * Get the stretch element for configuration
   */
  getStretchElementForConfig(childSelector?: string): JQuery;

  /**
   * Stretch the element
   */
  stretch(): void;

  /**
   * Reset stretch
   */
  reset(): void;

  /**
   * Handler for kit change stretch container
   */
  onKitChangeStretchContainerChange(): void;
}

/**
 * Swiper handler base interface
 */
export interface FrontendSwiperHandlerBase extends FrontendHandlerBase {
  /** Swiper instance */
  swiper?: any; // Swiper instance

  /** Active image background element */
  $activeImageBg?: JQuery;

  /** Active item index */
  activeItemIndex?: number;

  /**
   * Get initial slide index
   */
  getInitialSlide(): number;

  /**
   * Get slides count
   */
  getSlidesCount(): number;

  /**
   * Toggle pause on hover functionality
   */
  togglePauseOnHover(toggleOn: boolean): void;

  /**
   * Handle Ken Burns effect
   */
  handleKenBurns(): void;

  /**
   * Get Swiper settings/options
   */
  getSwiperSettings?(): SwiperOptions;

  /**
   * Initialize Swiper
   */
  initSwiper?(): void;

  /**
   * Update Swiper
   */
  updateSwiper?(): void;
}

/**
 * Carousel handler base interface
 */
export interface FrontendCarouselHandlerBase extends FrontendSwiperHandlerBase {
  /**
   * Get space between slides
   */
  getSpaceBetween(device?: string): number;

  /**
   * Get slides to scroll
   */
  getSlidesToScroll(device?: string): number;

  /**
   * Handle pagination click
   */
  handlePaginationClick?(): void;

  /**
   * Update pagination
   */
  updatePagination?(): void;

  /**
   * Handle navigation
   */
  handleNavigation?(): void;
}

/**
 * Stretch Element Configuration Settings
 */
export interface StretchElementSettings {
  /** Element to stretch (jQuery object or element) */
  element: JQuery | HTMLElement | null;
  /** Direction for stretching */
  direction: "left" | "right";
  /** Selectors configuration */
  selectors: {
    /** Container selector (window or jQuery object) */
    container: Window | JQuery | string;
  };
  /** Whether to consider scrollbar in calculations */
  considerScrollbar: boolean;
  /** CSS output method */
  cssOutput: "inline" | "variables";
  /** Optional margin to apply */
  margin?: number;
}

/**
 * Stretch Element Elements
 */
export interface StretchElementElements extends ModuleElements {
  /** Main element to stretch */
  $element: JQuery<HTMLElement>;
}

/**
 * Stretch Element Utility Interface
 * Handles full-width element stretching functionality
 */
export interface FrontendStretchElementUtility extends Omit<ViewModule, 'getDefaultSettings' | 'setSettings'> {
  /** Element references */
  elements: StretchElementElements;

  /**
   * Get default settings for stretch element
   */
  getDefaultSettings(): StretchElementSettings;

  /**
   * Get default elements based on settings
   */
  getDefaultElements(): StretchElementElements;

  /**
   * Stretch the element to full container width
   * Calculates positioning and width based on container and element position
   */
  stretch(): void;

  /**
   * Reset element to original dimensions and position
   * Clears CSS properties applied by stretch()
   */
  reset(): void;

  /**
   * Apply CSS using CSS custom properties (variables)
   * Alternative to inline styles for better performance
   */
  applyCssVariables(
    $element: JQuery,
    css: { width: string; left?: string; right?: string }
  ): void;

  /**
   * Reset CSS custom properties
   * Clears CSS variables applied by applyCssVariables()
   */
  resetCssVariables($element: JQuery): void;

  /**
   * Update settings for the stretch element
   * Allows dynamic configuration changes
   */
  setSettings(key: string, value: any): this;
}
