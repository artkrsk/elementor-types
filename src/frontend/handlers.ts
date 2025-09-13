/**
 * Elementor Frontend Handlers Types
 *
 * Complete type definitions for the Elementor frontend handler system including:
 * - Base handler classes and their hierarchy
 * - Widget-specific handlers and their configurations
 * - Handler registration and lifecycle management
 * - Animation and interaction systems
 * - Swiper-based carousel handlers
 */

import { ViewModule } from "../core";
import { SwiperOptions } from "../third-party";

// Import the comprehensive handler interfaces from enhanced-base
import type { HandlerSettings, HandlerElements } from "./handlers/enhanced-base";

/**
 * Editor listener configuration
 */
export interface EditorListener {
  /** Event name to listen for */
  event: string;

  /** Channel to listen on */
  to: any;

  /** Callback function */
  callback: (...args: any[]) => void;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Animation name/type */
  animation?: string;

  /** Animation delay in milliseconds */
  _animation_delay?: number;
  animation_delay?: number;

  /** Custom animation settings */
  [key: string]: any;
}

/**
 * Base handler class that all frontend handlers extend
 */
export interface HandlerBase {
  /** Main element jQuery object */
  $element: JQuery;

  /** Editor event listeners collection */
  editorListeners: EditorListener[] | null;

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

  /** Whether handler is in edit mode */
  isEdit: boolean | null;

  /** Handler elements collection */
  elements?: HandlerElements;

  // ViewModule-like functionality
  /**
   * Initialize handler
   */
  onInit?(...args: any[]): void;

  /**
   * Get default settings
   */
  getDefaultSettings?(): any;

  /**
   * Get default elements
   */
  getDefaultElements?(): HandlerElements;

  /**
   * Get settings
   */
  getSettings?(key?: string): any;

  /**
   * Bind events
   */
  bindEvents?(): void;

  /**
   * Check if handler should be active for given settings
   */
  isActive(settings?: HandlerSettings): boolean;

  /**
   * Check if element is in the current document
   */
  isElementInTheCurrentDocument(): boolean;

  /**
   * Find element within handler scope
   */
  findElement(selector: string): JQuery;

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
 * Handler base constructor
 */
export interface HandlerBaseConstructor {
  new (settings: HandlerSettings): HandlerBase;
}

/**
 * Global handler for animations and global effects
 */
export interface GlobalHandler extends HandlerBase {
  /** Current animation class */
  currentAnimation?: string;

  /**
   * Get widget type (returns 'global')
   */
  getWidgetType(): "global";

  /**
   * Trigger element animation
   */
  animate(): void;

  /**
   * Get animation settings
   */
  getAnimation(): string;
}

/**
 * Swiper-based handler base class
 */
export interface SwiperHandlerBase extends HandlerBase {
  /** Swiper instance */
  swiper?: any;

  /** Active item index */
  activeItemIndex?: number;

  /** Active image background element */
  $activeImageBg?: JQuery;

  /**
   * Get initial slide index
   */
  getInitialSlide(): number;

  /**
   * Get total slides count
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
   * Get Swiper configuration
   */
  getSwiperSettings(): SwiperOptions;

  /**
   * Initialize Swiper instance
   */
  initSwiper(): void;

  /**
   * Update Swiper settings
   */
  updateSwiperOption(propertyName: string): void;
}

/**
 * Video handler interface
 */
export interface VideoHandler extends HandlerBase {
  /** YouTube player instance */
  youtubePlayer?: any;

  /** API provider for video services */
  apiProvider?: any;

  /**
   * Handle video element interactions
   */
  handleVideo(): void;

  /**
   * Play video
   */
  playVideo(): void;

  /**
   * Prepare YouTube video
   */
  prepareYTVideo(apiObject: any, isInsideEditor: boolean): void;

  /**
   * Handle video end event
   */
  handleVideoEnd(): void;
}

/**
 * Counter handler interface
 */
export interface CounterHandler extends HandlerBase {
  /** Intersection observer for counter animation */
  intersectionObserver?: IntersectionObserver;
}

/**
 * Accordion handler interface
 */
export interface AccordionHandler extends HandlerBase {
  /**
   * Toggle accordion item
   */
  toggleItem(item: JQuery): void;

  /**
   * Activate accordion item
   */
  activateItem(item: JQuery): void;

  /**
   * Deactivate accordion item
   */
  deactivateItem(item: JQuery): void;
}

/**
 * Tabs handler interface
 */
export interface TabsHandler extends HandlerBase {
  /**
   * Activate tab
   */
  activateTab(tabIndex: number): void;

  /**
   * Change active tab
   */
  changeActiveTab(tabIndex: number): void;

  /**
   * Get active tab index
   */
  getActiveTabIndex(): number;
}

/**
 * Toggle handler interface
 */
export interface ToggleHandler extends HandlerBase {
  /**
   * Toggle content visibility
   */
  toggle(): void;
}

/**
 * Progress handler interface
 */
export interface ProgressHandler extends HandlerBase {
  /** Intersection observer for progress animation */
  intersectionObserver?: IntersectionObserver;
}

/**
 * Alert handler interface
 */
export interface AlertHandler extends HandlerBase {
  /**
   * Dismiss alert
   */
  onDismissButtonClick(event: Event): void;
}

/**
 * Container handler interface
 */
export interface ContainerHandler extends HandlerBase {
  /**
   * Handle container-specific functionality
   */
  handleContainer(): void;
}

/**
 * Grid container handler interface
 */
export interface GridContainerHandler extends ContainerHandler {
  /**
   * Initialize grid layout
   */
  initGrid(): void;

  /**
   * Update grid settings
   */
  updateGrid(): void;
}

/**
 * Background slideshow handler interface
 */
export interface BackgroundSlideshowHandler extends SwiperHandlerBase {
  /**
   * Initialize background slideshow
   */
  initSlideshow(): void;
}

/**
 * Background video handler interface
 */
export interface BackgroundVideoHandler extends HandlerBase {
  /**
   * Play background video
   */
  playVideo(): void;

  /**
   * Pause background video
   */
  pauseVideo(): void;
}

/**
 * Image carousel handler interface
 */
export interface ImageCarouselHandler extends SwiperHandlerBase {
  /**
   * Initialize image carousel
   */
  initCarousel(): void;

  /**
   * Handle lightbox integration
   */
  handleLightbox(): void;
}

/**
 * Accessibility handler interface
 */
export interface AccessibilityHandler extends HandlerBase {
  /**
   * Handle keyboard navigation
   */
  handleKeyboard(event: KeyboardEvent): void;

  /**
   * Update ARIA attributes
   */
  updateARIA(): void;
}

/**
 * Nested title keyboard handler interface
 */
export interface NestedTitleKeyboardHandler extends AccessibilityHandler {
  /**
   * Handle nested title keyboard navigation
   */
  handleNestedTitleKeyboard(event: KeyboardEvent): void;
}

/**
 * Stretched element handler interface
 */
export interface StretchedElementHandler extends HandlerBase {
  /**
   * Stretch element to full width
   */
  stretch(): void;

  /**
   * Reset element stretching
   */
  reset(): void;
}

/**
 * Audio handler interface (WordPress audio)
 */
export interface AudioHandler extends HandlerBase {
  /**
   * Initialize audio player
   */
  initAudio(): void;

  /**
   * Handle audio events
   */
  handleAudioEvents(): void;
}

/**
 * Handles position handler interface
 */
export interface HandlesPositionHandler extends HandlerBase {
  /**
   * Update handles position
   */
  updateHandlesPosition(): void;

  /**
   * Get handles position
   */
  getHandlesPosition(): any;
}

/**
 * Text editor handler interface
 */
export interface TextEditorHandler extends HandlerBase {
  /**
   * Initialize text editor functionality
   */
  initTextEditor(): void;
}

/**
 * Shape divider handler interface
 */
export interface ShapeHandler extends HandlerBase {
  /**
   * Initialize shape dividers
   */
  initShapes(): void;

  /**
   * Update shape settings
   */
  updateShapes(): void;
}

/**
 * Handler registry interface
 */
export interface HandlerRegistry {
  /** Registered handlers by name */
  handlers: Map<string, HandlerBaseConstructor>;

  /**
   * Register a new handler
   */
  register(name: string, handler: HandlerBaseConstructor): void;

  /**
   * Get handler by name
   */
  get(name: string): HandlerBaseConstructor | undefined;

  /**
   * Check if handler exists
   */
  has(name: string): boolean;

  /**
   * Initialize handlers for element
   */
  initHandlers($element: JQuery): void;
}

/**
 * Editor handler creation utility
 */
export interface EditorHandlerCreator {
  /**
   * Create editor-specific handler
   */
  createEditorHandler(handlerName: string, config: any): HandlerBaseConstructor;
}

/**
 * Frontend handlers namespace
 */
export namespace Handlers {
  export type Base = HandlerBase;
  export type Global = GlobalHandler;
  export type SwiperBase = SwiperHandlerBase;
  export type Video = VideoHandler;
  export type Counter = CounterHandler;
  export type Accordion = AccordionHandler;
  export type Tabs = TabsHandler;
  export type Toggle = ToggleHandler;
  export type Progress = ProgressHandler;
  export type Alert = AlertHandler;
  export type Container = ContainerHandler;
  export type GridContainer = GridContainerHandler;
  export type BackgroundSlideshow = BackgroundSlideshowHandler;
  export type BackgroundVideo = BackgroundVideoHandler;
  export type ImageCarousel = ImageCarouselHandler;
  export type Accessibility = AccessibilityHandler;
  export type NestedTitleKeyboard = NestedTitleKeyboardHandler;
  export type StretchedElement = StretchedElementHandler;
  export type Audio = AudioHandler;
  export type HandlesPosition = HandlesPositionHandler;
  export type TextEditor = TextEditorHandler;
  export type Shape = ShapeHandler;
  export type Registry = HandlerRegistry;
  export type EditorCreator = EditorHandlerCreator;
  export type Settings = HandlerSettings;
  export type Elements = HandlerElements;
  export type Listener = EditorListener;
  export type Animation = AnimationConfig;
}

// Default export for convenience
export default Handlers;
