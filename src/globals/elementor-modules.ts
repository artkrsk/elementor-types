/**
 * ElementorModules Global Interface
 *
 * Complete TypeScript definition for the global `elementorModules` object
 * that mirrors the JavaScript structure exactly. This is the main interface
 * other projects will use to interact with Elementor's module system.
 */

import {
  FrontendHandlerBase,
  FrontendStretchedElementHandler,
  FrontendSwiperHandlerBase,
  FrontendCarouselHandlerBase,
} from "./frontend-handler-interfaces";

/**
 * Elementor frontend tools namespace
 */
export interface ElementorFrontendTools {
  /** Stretch element utility */
  StretchElement: any;
}

/**
 * Elementor frontend handlers namespace
 */
export interface ElementorFrontendHandlers {
  /** Base handler class constructor */
  Base: new (settings?: any) => FrontendHandlerBase;

  /** Stretched element handler constructor */
  StretchedElement: new (settings?: any) => FrontendStretchedElementHandler;

  /** Swiper base handler constructor */
  SwiperBase: new (settings?: any) => FrontendSwiperHandlerBase;

  /** Carousel base handler constructor */
  CarouselBase: new (settings?: any) => FrontendCarouselHandlerBase;
}

/**
 * Elementor frontend namespace
 */
export interface ElementorFrontend {
  /** Document class */
  Document: any;

  /** Frontend tools */
  tools: ElementorFrontendTools;

  /** Frontend handlers */
  handlers: ElementorFrontendHandlers;
}

/**
 * Elementor editor utils namespace
 */
export interface ElementorEditorUtils {
  /** Editor module base class */
  Module: any;

  /** Introduction utility */
  Introduction: any;
}

/**
 * Elementor editor element models namespace
 */
export interface ElementorEditorElementModels {
  /** Base settings model */
  BaseSettings: any;
}

/**
 * Elementor editor elements namespace
 */
export interface ElementorEditorElements {
  /** Element models */
  models: ElementorEditorElementModels;
}

/**
 * Elementor editor views namespace
 */
export interface ElementorEditorViews {
  /** Controls stack view */
  ControlsStack: any;
}

/**
 * Elementor editor namespace
 */
export interface ElementorEditor {
  /** Editor elements */
  elements: ElementorEditorElements;

  /** Editor utilities */
  utils: ElementorEditorUtils;

  /** Editor views */
  views: ElementorEditorViews;

  /** Container class */
  Container: any;
}

/**
 * Elementor modules utils namespace
 */
export interface ElementorModulesUtils {
  /** Masonry utility class */
  Masonry: any;

  /** Scroll utility class */
  Scroll: any;
}

/**
 * Main ElementorModules global interface
 * This is what gets assigned to `window.elementorModules`
 */
export interface ElementorModules {
  /** Base module class */
  Module: any;

  /** View module class */
  ViewModule: any;

  /** Args object class */
  ArgsObject: any;

  /** Force method implementation error class */
  ForceMethodImplementation: any;

  /** Utility classes */
  utils: ElementorModulesUtils;

  /** Frontend namespace (added by frontend/modules.js) */
  frontend?: ElementorFrontend;

  /** Editor namespace (added by editor/modules.js) */
  editor?: ElementorEditor;
}

// Export the main interface without global declarations
// This allows projects to use ElementorModules type without conflicts
export default ElementorModules;
