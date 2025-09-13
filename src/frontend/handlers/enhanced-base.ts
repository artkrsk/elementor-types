/**
 * Comprehensive Base Handler Interfaces
 * Enhanced base classes for Elementor frontend handlers with complete functionality
 */

import type { ViewModule } from "../../core";

/**
 * Handler settings configuration interface with comprehensive options
 */
export interface HandlerSettings {
  selectors?: Record<string, string>;
  classes?: Record<string, string>;
  showTabFn?: string;
  hideTabFn?: string;
  toggleSelf?: boolean;
  hidePrevious?: boolean;
  autoExpand?: boolean | string;
  keyDirection?: Record<string, number>;
  [key: string]: any;
}

/**
 * Handler elements interface for DOM element access
 */
export interface HandlerElements {
  [key: string]: JQuery<HTMLElement>;
}

/**
 * Enhanced Base handler with comprehensive functionality
 * Extends the original Base with additional methods discovered in research
 */
export declare class EnhancedBase extends ViewModule {
  $element: JQuery<HTMLElement>;
  editorListeners: any;
  onElementChange: ((propertyName: string) => void) | null;
  onEditSettingsChange: ((propertyName: string) => void) | null;
  onPageSettingsChange: ((propertyName: string) => void) | null;
  isEdit: boolean;
  elements: HandlerElements;

  constructor(settings: { $element: JQuery<HTMLElement> });
  
  // Core lifecycle
  isActive(settings?: any): boolean;
  isElementInTheCurrentDocument(): boolean;
  onInit(...args: any[]): void;
  onDestroy(): void;
  run(): void;
  
  // Element management
  findElement(selector: string): JQuery<HTMLElement>;
  getUniqueHandlerID(cid?: string, $element?: JQuery<HTMLElement>): string;
  
  // Settings management
  getDefaultSettings(): HandlerSettings;
  getSettings(key?: string): any;
  setHandlerSettings(settings: Partial<HandlerSettings>): void;
  
  // Element configuration
  getDefaultElements(): HandlerElements;
  getElements(key?: string): any;
  
  // Element settings and configuration
  getElementSettings(setting?: string): any;
  getEditSettings(setting?: string): any;
  getID(): string;
  getElementType(): string;
  getWidgetType(): string | undefined;
  getModelCID(): string;
  getCurrentDeviceSetting(settingKey: string): any;
  
  // Event handling
  bindEvents(): void;
  unbindEvents(): void;
  
  // Editor integration
  initEditorListeners(): void;
  getEditorListeners(): any[];
  addEditorListeners(): void;
  removeEditorListeners(): void;
  
  // Animation and effects
  animate(element: JQuery<HTMLElement>, animation: string, options?: any): void;
  
  // Responsive handling
  getCurrentDeviceMode(): string;
  onDeviceModeChange(): void;
}

/**
 * TabsModule - Base class for tab-like widgets (tabs, accordion, toggle)
 * Provides comprehensive tab functionality with keyboard navigation and animations
 */
export declare class TabsModule extends EnhancedBase {
  // Tab-specific settings
  getDefaultSettings(): HandlerSettings & {
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
    keyDirection: Record<string, number>;
  };

  // Tab-specific elements
  getDefaultElements(): HandlerElements & {
    $tabTitles: JQuery<HTMLElement>;
    $tabContents: JQuery<HTMLElement>;
  };

  // Tab functionality
  activateDefaultTab(): void;
  activateTab(tabIndex: number): void;
  deactivateActiveTab(): void;
  isActiveTab(tabIndex: number): boolean;
  bindEvents(): void;
  
  // Event handlers
  onTabTitleClick(event: Event): void;
  onTabTitleKeydown(event: KeyboardEvent): void;
  
  // Tab management
  changeActiveTab(tabIndex: number, fromUser?: boolean): void;
  getTabTitleFilterSelector(tabIndex: number): string;
  getTabContentFilterSelector(tabIndex: number): string;
  getTabIndex($tab: JQuery<HTMLElement>): number;
  getActiveTab(): JQuery<HTMLElement>;
  
  // Animation
  showTab($content: JQuery<HTMLElement>): void;
  hideTab($content: JQuery<HTMLElement>): void;
  
  // Accessibility
  makeTabsAccessible(): void;
  activateFirstTab(): void;
  
  // Keyboard navigation
  onKeyDown(event: KeyboardEvent): void;
  isTabTitleEvent(event: Event): boolean;
  getActiveTabIndex(): number;
  focusOnTab(direction: number): void;
}

/**
 * SwiperBase - Base class for Swiper-based widgets
 * Provides Swiper integration with comprehensive configuration options
 */
export declare class SwiperBase extends EnhancedBase {
  swiper: any; // Swiper instance
  swiperOptions: any;

  // Swiper configuration
  getDefaultSettings(): HandlerSettings & {
    autoplay?: boolean | object;
    navigation?: object;
    pagination?: object;
    effect?: string;
    loop?: boolean;
    speed?: number;
  };

  // Swiper initialization
  initSwiper(): Promise<void>;
  getSwiperOptions(): any;
  getSwiperSettings(): any;
  
  // Swiper management
  updateSwiperOption(propertyName: string): void;
  getChangeableProperties(): string[];
  
  // Event handling
  onSlideChange(): void;
  onSwiperInit(): void;
  
  // Responsive
  handleElementHandlers(): void;
  
  // Accessibility
  makeButtonsAccessible(): void;
  
  // Pause/resume functionality
  togglePauseOnHover(enable: boolean): void;
  onFocusDisableAutoplay(): void;
}

/**
 * CarouselBase - Advanced carousel handler with comprehensive features
 * Extends SwiperBase with carousel-specific functionality
 */
export declare class CarouselBase extends SwiperBase {
  // Carousel-specific settings
  getDefaultSettings(): HandlerSettings & {
    selectors: {
      carousel: string;
      swiperWrapper: string;
      slideContent: string;
      swiperArrow: string;
      paginationWrapper: string;
      paginationBullet: string;
      paginationBulletWrapper: string;
    };
  };

  // Carousel-specific elements
  getDefaultElements(): HandlerElements & {
    $swiperContainer: JQuery<HTMLElement>;
    $swiperWrapper: JQuery<HTMLElement>;
    $slides: JQuery<HTMLElement>;
    $swiperArrows: JQuery<HTMLElement>;
    $paginationWrapper: JQuery<HTMLElement>;
    $paginationBullets: JQuery<HTMLElement>;
    $paginationBulletWrapper: JQuery<HTMLElement>;
  };

  // Carousel functionality
  getSwiperSettings(): any;
  getOffsetWidth(): number;
  applyOffsetSettings(elementSettings: any, swiperOptions: any, slidesToShow: number): void;
  forceSliderToShowNextSlideWhenOnLast(swiperOptions: any, slidesToShow: number): void;
  addClassToSwiperContainer(className: string): void;
  
  // Event handling
  bindEvents(): void;
  unbindEvents(): void;
  onDirectionArrowKeydown(event: KeyboardEvent): void;
  
  // Pagination
  getPaginationBullets(type?: string): any[];
  a11ySetPaginationTabindex(): void;
  
  // Accessibility
  a11ySetSlideAriaHidden(status?: string): void;
  getSwiperWrapperTranformXValue(): number;
  
  // Responsive
  getSpaceBetween(device?: string | null): number;
  updateSpaceBetween(propertyName: string): void;
}

/**
 * Video API providers for video widgets
 */
export interface VideoProvider {
  onApiReady(callback: (api: any) => void): void;
  loadApi(): Promise<any>;
  getVideoIDFromURL(url: string): string;
}

/**
 * Intersection Observer configuration for widgets like Counter
 */
export interface IntersectionObserverConfig {
  callback: (event: { isInViewport: boolean }) => void;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Animation configuration for progress and counter widgets
 */
export interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

/**
 * Lightbox configuration for image and video widgets
 */
export interface LightboxConfig {
  type: 'image' | 'video' | 'slideshow';
  url?: string;
  slides?: any[];
  navigation?: boolean;
  pagination?: boolean;
  animation?: string;
}
