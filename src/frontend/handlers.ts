/**
 * Elementor Frontend Handlers Types
 *
 * Complete type definitions for the Elementor frontend handler system including:
 * - Base handler classes and their hierarchy
 * - Handler registration and lifecycle management
 * - Animation and interaction systems
 * - Swiper-based carousel handlers
 */

import { SwiperOptions } from "../third-party";
import type { CommonElementSettings } from "../editor/element-settings";

/** Handler settings configuration */
export interface HandlerSettings {
  selectors?: Record<string, string>;
  classes?: Record<string, string>;
  [key: string]: any;
}

/** Handler elements interface */
export interface HandlerElements {
  [key: string]: JQuery<HTMLElement>;
}

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
  onEditSettingsChange?: (propertyName: string, value?: any) => void;

  /** Page settings change callback */
  onPageSettingsChange?: (changed: Record<string, any>) => void;

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
   * Get editor listeners array
   */
  getEditorListeners(): EditorListener[];

  /**
   * Get model CID
   */
  getModelCID(): string;

  /**
   * Get handler ID
   */
  getID(): string;

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
  getElementSettings(): CommonElementSettings;
  getElementSettings<K extends keyof CommonElementSettings>(setting: K): CommonElementSettings[K];
  getElementSettings(setting: string): any;

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
  export type SwiperBase = SwiperHandlerBase;
  export type Container = ContainerHandler;
  export type GridContainer = GridContainerHandler;
  export type Accessibility = AccessibilityHandler;
  export type NestedTitleKeyboard = NestedTitleKeyboardHandler;
  export type Audio = AudioHandler;
  export type Shape = ShapeHandler;
  export type EditorCreator = EditorHandlerCreator;
  export type Settings = HandlerSettings;
  export type Elements = HandlerElements;
  export type Listener = EditorListener;
}

// Default export for convenience
export default Handlers;
