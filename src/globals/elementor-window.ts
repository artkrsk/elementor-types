/**
 * Elementor Window Interface
 *
 * Complete TypeScript definitions for the global `window.elementor` object
 * available in the Elementor editor context.
 */

import type { ElementorWindowControls } from '../editor/controls/window-controls';
import type { ElementorWindowComponents } from '../editor/components/window-components';
import type { ElementorWindowLayouts } from '../editor/layouts/window-layouts';
import type { ElementorWindowViews } from '../editor/views/window-views';
import type { ElementorHooks } from '../utils/elementor-hooks';
import type { ElementorEditorChannel } from '../editor/channels/editor-channel';
import type { AddControlViewFunction, ControlViewConstructor } from '../utils/control-registration';
import type { Breakpoints } from '../utils/breakpoints';

/**
 * Elementor Editor Modules Interface
 *
 * This interface mirrors the modules object defined in editor-base.js and provides
 * comprehensive type definitions for all Elementor editor modules available on
 * `window.elementor.modules`.
 *
 * @example Access control modules
 * ```typescript
 * const colorControl = new window.elementor.modules.controls.Color();
 * const mediaControl = new window.elementor.modules.controls.Media();
 * ```
 *
 * @example Access element modules
 * ```typescript
 * const baseElement = new window.elementor.modules.elements.types.Base();
 * const widgetElement = new window.elementor.modules.elements.types.Widget();
 * ```
 *
 * @example Access component modules
 * ```typescript
 * const footerSaver = new window.elementor.modules.components.saver.behaviors.FooterSaver();
 * ```
 */
export interface ElementorWindowModules {
  /**
   * Base Module class for all Elementor modules
   * @deprecated since 2.3.0, use `elementorModules.Module` instead.
   */
  Module: typeof import('../core/modules').Module;

  /**
   * Component modules including template library, saver behaviors, and other UI components
   * Provides access to modal layouts, document savers, and various editor components
   */
  components: ElementorWindowComponents;

  /**
   * Saver functionality for backwards compatibility
   * @deprecated since 2.9.0, use `elementor.modules.components.saver.behaviors.FooterSaver` instead.
   */
  saver: {
    /** Footer saver behavior for backwards compatibility */
    footerBehavior: any;
  };

  /**
   * Control modules providing all editor control types
   * Includes Color, Media, Dimensions, Number, Select, and all other control constructors
   */
  controls: ElementorWindowControls;

  /**
   * Element modules including types, models, views, and components
   * Provides access to Widget, Section, Column, Container and other element types
   */
  elements: any;

  /**
   * Layout modules for panel, pages, and UI structure
   * Includes panel layouts, menu systems, and element organization
   */
  layouts: ElementorWindowLayouts;

  /**
   * View modules for rendering and UI management
   * Includes ControlsStack, element views, and other visual components
   */
  views: ElementorWindowViews;

  // Dynamic module additions (added at runtime during editor initialization)

  /** Landing page library module (conditionally loaded) */
  landingLibraryPageModule?: any;

  /** Floating buttons library module (conditionally loaded) */
  floatingButtonsLibraryModule?: any;

  /** Link in bio library module (conditionally loaded) */
  linkInBioLibraryModule?: any;

  /** Floating bars library module (conditionally loaded) */
  floatingBarsLibraryModule?: any;

  /** Elements color picker module (conditionally loaded) */
  elementsColorPicker?: any;

  /** Promotion module (conditionally loaded) */
  promotionModule?: any;

  /** Cloud library module (conditionally loaded) */
  cloudLibraryModule?: any;
}

/**
 * Main Elementor Editor Interface
 *
 * This represents the complete `window.elementor` object available in the
 * Elementor editor context. It provides access to all editor functionality
 * including modules, configuration, utilities, and event systems.
 *
 * @example Basic usage
 * ```typescript
 * // Access editor configuration
 * const version = window.elementor.config.version;
 *
 * // Use control modules
 * const colorControl = new window.elementor.modules.controls.Color();
 *
 * // Listen to editor events
 * window.elementor.on('document:loaded', () => {
 *   console.log('Document loaded');
 * });
 *
 * // Use hooks system
 * window.elementor.hooks.addFilter('elements/widget/controls/common/default',
 *   (controls, widgetType) => {
 *     // Modify widget controls
 *     return controls;
 *   }
 * );
 * ```
 *
 * @example Working with elements
 * ```typescript
 * // Get element data
 * const elementData = window.elementor.getElementData(model);
 *
 * // Check user capabilities
 * const canEdit = window.elementor.userCan('design');
 * ```
 */
export interface ElementorEditor {
  /**
   * Modules namespace providing access to all editor modules
   * This is the main entry point for accessing controls, elements, components, layouts, and views
   */
  modules: ElementorWindowModules;

  /** Configuration object */
  config: {
    version: string;
    urls: Record<string, string>;
    settings: Record<string, any>;
    user: {
      restrictions: string[];
      [key: string]: any;
    };
    [key: string]: any;
  };

  /** Widget cache */
  widgetsCache: Record<string, any>;

  /** Whether editor is loaded */
  loaded: boolean;

  /** Whether preview has been loaded at least once */
  previewLoadedOnce: boolean;

  /** Whether active breakpoints have been updated */
  activeBreakpointsUpdated: boolean;

  /**
   * Hooks system for actions and filters
   * WordPress-style hooks system for extending Elementor functionality
   */
  hooks: ElementorHooks;

  /** Helper utilities */
  helpers: any;

  /** Images manager */
  imagesManager: any;

  /** Presets factory */
  presetsFactory: any;

  /**
   * Breakpoints system - Enhanced based on real usage patterns
   * Used for responsive design and device management
   */
  breakpoints: Breakpoints;

  /** Template manager */
  templates: any;

  /** Ajax utilities - Enhanced based on real usage patterns */
  ajax: {
    /**
     * Add AJAX request - Used extensively in real projects
     * Pattern: window.elementor.ajax.addRequest(action, options)
     */
    addRequest(action: string, options: {
      /** Request data payload */
      data?: Record<string, any>;
      /** Success callback */
      success?: (response: any) => void;
      /** Error callback */
      error?: (error: any) => void;
      /** Complete callback */
      complete?: () => void;
      /** Custom AJAX options */
      [key: string]: any;
    }): Promise<any>;

    /** Other AJAX methods */
    [key: string]: any;
  };

  /** Control conditions */
  conditions: any;

  /** History manager */
  history: any;

  /** Communication channels with enhanced editor channel typing */
  channels: {
    editor: ElementorEditorChannel;
    data: any;
    panelElements: any;
    dataEditMode: any;
    deviceMode: any;
    templates: any;
    responsivePreview: any;
  };

  /** Background click listeners configuration */
  backgroundClickListeners: Record<string, {
    element: string;
    ignore: string;
  }>;

  /** Check if user has capability */
  userCan(capability: string): boolean;

  /**
   * Add control view - Enhanced typing based on real usage patterns
   * Used extensively in custom control development
   */
  addControlView: AddControlViewFunction;

  /** Check environment compatibility */
  checkEnvCompatibility(): boolean;

  /** Get element data from model */
  getElementData(model: any): any;

  /** Event methods */
  once(event: string, callback: Function): void;
  on(event: string, callback: Function): void;
  off(event: string, callback?: Function): void;
  trigger(event: string, ...args: any[]): void;

  /** Application lifecycle methods */
  start(options?: any): void;
  onStart(options?: any): void;
  onPreviewLoaded(): void;

}

// Export interfaces for external use - no global declarations