/**
 * Specific Widget Handler Interfaces
 * Comprehensive interfaces for all Elementor frontend widget handlers
 */

import type {
  EnhancedBase,
  TabsModule,
  SwiperBase,
  CarouselBase,
  HandlerSettings,
  HandlerElements,
  VideoProvider,
  IntersectionObserverConfig,
  AnimationConfig,
  LightboxConfig,
} from "./enhanced-base";

/**
 * Accordion Widget Handler
 * Extends TabsModule with accordion-specific slide animations
 */
export declare class AccordionHandler extends TabsModule {
  getDefaultSettings(): ReturnType<TabsModule["getDefaultSettings"]> & {
    showTabFn: "slideDown";
    hideTabFn: "slideUp";
  };
}

/**
 * Tabs Widget Handler
 * Standard tab functionality with horizontal tab navigation
 */
export declare class TabsHandler extends TabsModule {
  // Uses default TabsModule settings
}

/**
 * Toggle Widget Handler
 * Single collapsible content section
 */
export declare class ToggleHandler extends TabsModule {
  getDefaultSettings(): ReturnType<TabsModule["getDefaultSettings"]> & {
    toggleSelf: true;
    hidePrevious: false;
  };
}

/**
 * Video Widget Handler
 * Comprehensive video functionality with multiple providers and lightbox
 */
export declare class VideoHandler extends EnhancedBase {
  youtubePlayer: any;
  vimeoPlayer: any;
  apiProvider: VideoProvider;
  videoID: string;

  getDefaultSettings(): HandlerSettings & {
    selectors: {
      imageOverlay: string;
      video: string;
      videoIframe: string;
      playIcon: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $imageOverlay: JQuery<HTMLElement>;
    $video: JQuery<HTMLElement>;
    $videoIframe: JQuery<HTMLElement>;
    $playIcon: JQuery<HTMLElement>;
  };

  // Video functionality
  handleVideo(): void;
  playVideo(): void;
  animateVideo(): Promise<void>;
  hideLightbox(): Promise<void>;

  // Provider-specific methods
  prepareYTVideo(YT: any, onOverlayClick?: boolean): void;
  prepareVimeoVideo(vimeo: any, onOverlayClick?: boolean): void;

  // Event handlers
  handleVideoLoad(): void;
  handleImageOverlayClick(): void;

  // Settings
  getVideoType(): string;
  isLightbox(): boolean;
  shouldAutoplay(): boolean;
  shouldLoop(): boolean;
  shouldMute(): boolean;
  showControls(): boolean;
}

/**
 * Counter Widget Handler
 * Animated number counter with intersection observer
 */
export declare class CounterHandler extends EnhancedBase {
  intersectionObserver: IntersectionObserver;

  getDefaultSettings(): HandlerSettings & {
    selectors: {
      counterNumber: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $counterNumber: JQuery<HTMLElement>;
  };

  // Counter functionality
  onInit(): void;
  startCounter(): void;
  updateCounter(current: number, target: number): void;

  // Animation
  animateNumber(startValue: number, endValue: number, duration: number): void;

  // Settings
  getCounterData(): {
    toValue: number;
    fromValue: number;
    duration: number;
    delimiter: string;
    rounding: number;
  };
}

/**
 * Progress Widget Handler
 * Animated progress bar with percentage display
 */
export declare class ProgressHandler extends EnhancedBase {
  intersectionObserver: IntersectionObserver;

  getDefaultSettings(): HandlerSettings & {
    selectors: {
      progressNumber: string;
      progressBar: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $progressNumber: JQuery<HTMLElement>;
    $progressBar: JQuery<HTMLElement>;
  };

  // Progress functionality
  onInit(): void;
  startProgress(): void;
  updateProgress(percentage: number): void;

  // Animation
  animateProgressBar(targetPercentage: number): void;

  // Settings
  getProgressData(): {
    max: number;
    value: number;
    unit: string;
  };
}

/**
 * Alert Widget Handler
 * Dismissible alert/notification component
 */
export declare class AlertHandler extends EnhancedBase {
  getDefaultSettings(): HandlerSettings & {
    selectors: {
      dismissButton: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $dismissButton: JQuery<HTMLElement>;
  };

  // Alert functionality
  bindEvents(): void;
  onDismissButtonClick(): void;
  dismiss(): void;

  // Animation
  fadeOut(): void;
  slideUp(): void;
}

/**
 * Background Video Widget Handler
 * Background video functionality for sections/columns
 */
export declare class BackgroundVideoHandler extends EnhancedBase {
  player: any;
  aspectRatio: number;

  getDefaultSettings(): HandlerSettings & {
    selectors: {
      backgroundVideoContainer: string;
      backgroundVideoEmbed: string;
      backgroundVideoHosted: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $backgroundVideoContainer: JQuery<HTMLElement>;
    $backgroundVideoEmbed: JQuery<HTMLElement>;
    $backgroundVideoHosted: JQuery<HTMLElement>;
  };

  // Background video functionality
  onInit(): void;
  prepareVideo(): void;
  changeVideoSize(): void;
  startVideoLoop(): void;

  // Video management
  playVideo(): void;
  pauseVideo(): void;
  muteVideo(): void;

  // Responsive
  handleResize(): void;
  calculateAspectRatio(): void;
}

/**
 * Background Slideshow Widget Handler
 * Background slideshow functionality for sections
 */
export declare class BackgroundSlideshowHandler extends SwiperBase {
  getDefaultSettings(): HandlerSettings & {
    classes: {
      slideBackground: string;
    };
    selectors: {
      slides: string;
    };
  };

  // Slideshow functionality
  getSlidesCount(): number;
  buildSlideshow(): void;
  initSlideshow(): void;

  // Ken Burns effect
  setKenBurnsSettings(): void;
  handleKenBurns(): void;
}

/**
 * Image Carousel Widget Handler
 * Advanced image carousel with lightbox integration
 */
export declare class ImageCarouselHandler extends CarouselBase {
  lightbox: any;

  getDefaultSettings(): ReturnType<CarouselBase["getDefaultSettings"]> & {
    selectors: ReturnType<CarouselBase["getDefaultSettings"]>["selectors"] & {
      carouselImage: string;
    };
  };

  getDefaultElements(): ReturnType<CarouselBase["getDefaultElements"]> & {
    $carouselImages: JQuery<HTMLElement>;
  };

  // Carousel functionality
  getSwiperSettings(): any;
  updateSwiperOption(propertyName: string): void;

  // Lightbox integration
  openLightbox(slideIndex: number): void;
  createLightboxSlides(): any[];

  // Event handling
  onSlideClick(event: Event): void;
  bindEvents(): void;
}

/**
 * Text Editor Widget Handler
 * Rich text content with animations and effects
 */
export declare class TextEditorHandler extends EnhancedBase {
  getDefaultSettings(): HandlerSettings & {
    selectors: {
      paragraph: string;
      dropCap: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $dropCap: JQuery<HTMLElement>;
    $paragraph: JQuery<HTMLElement>;
  };

  // Text functionality
  onInit(): void;
  bindEvents(): void;

  // Drop cap functionality
  initDropCap(): void;
  adjustDropCap(): void;

  // Animations
  initTextAnimations(): void;
}

/**
 * Handles Position Widget Handler
 * Dynamic positioning for floating elements
 */
export declare class HandlesPositionHandler extends EnhancedBase {
  isDesktop: boolean;

  getDefaultSettings(): HandlerSettings & {
    selectors: {
      container: string;
    };
  };

  // Position functionality
  onInit(): void;
  bindEvents(): void;

  // Position management
  updatePosition(): void;
  calculatePosition(): { top: number; left: number };

  // Responsive
  isDesktopMode(): boolean;
  onDeviceModeChange(): void;
}

/**
 * WP Audio Widget Handler
 * WordPress native audio player integration
 */
export declare class WpAudioHandler extends EnhancedBase {
  getDefaultSettings(): HandlerSettings & {
    selectors: {
      audioPlayer: string;
    };
  };

  getDefaultElements(): HandlerElements & {
    $audioPlayer: JQuery<HTMLElement>;
  };

  // Audio functionality
  onInit(): void;
  bindEvents(): void;

  // Player management
  initPlayer(): void;
  handlePlayerReady(): void;

  // Controls
  play(): void;
  pause(): void;
  setVolume(volume: number): void;
}

/**
 * Column Widget Handler
 * Column layout and responsive functionality
 */
export declare class ColumnHandler extends EnhancedBase {
  getDefaultSettings(): HandlerSettings & {
    selectors: {
      widget: string;
    };
  };

  // Column functionality
  onInit(): void;
  bindEvents(): void;

  // Layout management
  updateLayout(): void;
  handleResize(): void;

  // Background
  initBackground(): void;
}

/**
 * Global Handler
 * Global functionality for all elements
 */
export declare class GlobalHandler extends EnhancedBase {
  // Global functionality
  onInit(): void;
  bindEvents(): void;

  // Element management
  initElement(): void;
  handleElementReady(): void;

  // Animations
  initAnimations(): void;
  playAnimations(): void;
}

// StretchedElementHandler moved to dedicated stretched-element.ts file

/**
 * Widget handler factory for creating instances
 */
export interface WidgetHandlerFactory {
  createHandler(widgetType: string, settings: any): EnhancedBase;
  registerHandler(widgetType: string, handlerClass: typeof EnhancedBase): void;
  getRegisteredHandlers(): Record<string, typeof EnhancedBase>;
}

/**
 * Widget handler registration interface
 */
export interface WidgetHandlerRegistration {
  widgetType: string;
  handlerClass: typeof EnhancedBase;
  priority?: number;
  conditions?: (settings: any) => boolean;
}

/**
 * Complete widget handlers map
 */
export interface ElementorWidgetHandlers {
  // Tab-based widgets
  accordion: AccordionHandler;
  tabs: TabsHandler;
  toggle: ToggleHandler;

  // Media widgets
  video: VideoHandler;
  "background-video": BackgroundVideoHandler;
  "background-slideshow": BackgroundSlideshowHandler;
  "image-carousel": ImageCarouselHandler;
  "wp-audio": WpAudioHandler;

  // Content widgets
  "text-editor": TextEditorHandler;
  counter: CounterHandler;
  progress: ProgressHandler;
  alert: AlertHandler;

  // Layout widgets
  column: ColumnHandler;
  "handles-position": HandlesPositionHandler;
  "stretched-element": any; // See stretched-element.ts

  // Global
  global: GlobalHandler;
}

/**
 * Widget handler lifecycle events
 */
export interface WidgetHandlerEvents {
  beforeInit: (handler: EnhancedBase) => void;
  afterInit: (handler: EnhancedBase) => void;
  beforeDestroy: (handler: EnhancedBase) => void;
  afterDestroy: (handler: EnhancedBase) => void;
  settingsChange: (handler: EnhancedBase, settings: any) => void;
  elementChange: (handler: EnhancedBase, elementSettings: any) => void;
}
