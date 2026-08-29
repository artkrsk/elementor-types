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
 * Base handler class that all frontend handlers extend.
 * Alias of the single source of truth in ./handlers/base.
 */
export type HandlerBase = import("./handlers/base").Base;
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
  export type Base = import("./handlers/base").Base;
  export type SwiperBase = SwiperHandlerBase;
  export type EditorCreator = EditorHandlerCreator;
  export type Settings = HandlerSettings;
  export type Elements = HandlerElements;
  export type Listener = EditorListener;
}

// Default export for convenience
export default Handlers;
