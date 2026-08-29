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



// Export interfaces for external use - no global declarations