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
  FrontendStretchElementUtility,
} from "./frontend-handler-interfaces";

import {
  ElementorEditorModules,
  ElementorEditorUtils,
  ElementorEditorElementModels,
  ElementorEditorElements,
  ElementorEditorViews,
} from "../editor/namespace";

// Re-export editor interfaces for external use
export {
  ElementorEditorModules,
  ElementorEditorUtils,
  ElementorEditorElementModels,
  ElementorEditorElements,
  ElementorEditorViews,
};

/**
 * Elementor frontend tools namespace
 */
export interface ElementorFrontendTools {
  /** Stretch element utility constructor */
  StretchElement: new (
    settings?: Partial<
      import("./frontend-handler-interfaces").StretchElementSettings
    >
  ) => FrontendStretchElementUtility;
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
 * Elementor frontend namespace
 */
export interface ElementorFrontend {
  /** Document class */
  Document: any;

  /** Tools namespace */
  tools: ElementorFrontendTools;

  /** Handlers namespace */
  handlers: ElementorFrontendHandlers;
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

  /** Editor namespace (only available in editor context) */
  editor?: ElementorEditorModules;
}

// Export the main interface without global declarations
// This allows projects to use ElementorModules type without conflicts
export default ElementorModules;
