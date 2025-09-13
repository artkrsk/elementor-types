/**
 * Elementor Window Interface
 *
 * Complete TypeScript definitions for the global `window.elementor` object
 * available in the Elementor editor context.
 */

import type { ElementorWindowControls } from '../editor/controls/window-controls';

/**
 * Elementor Editor Modules Interface
 * This mirrors the modules object defined in editor-base.js
 */
export interface ElementorWindowModules {
  /**
   * @deprecated since 2.3.0, use `elementorModules.Module` instead.
   */
  Module: typeof import('../core/modules').Module;

  /** Component modules */
  components: {
    templateLibrary: {
      views: {
        /**
         * @deprecated since 2.4.0, use `elementorModules.common.views.modal.Layout` instead.
         */
        BaseModalLayout: any;
      };
    };
    saver: {
      behaviors: {
        FooterSaver: any;
      };
    };
  };

  /**
   * @deprecated since 2.9.0, use `elementor.modules.components.saver.behaviors.FooterSaver` instead.
   */
  saver: {
    footerBehavior: any;
  };

  /** Control modules */
  controls: ElementorWindowControls;

  /** Element modules */
  elements: {
    types: {
      Base: any;
      [elementType: string]: any;
    };
    models: {
      /**
       * @deprecated since 2.4.0, use `elementorModules.editor.elements.models.BaseSettings` instead.
       */
      BaseSettings: any;
      Element: any;
    };
    views: {
      BaseElement: any;
      BaseWidget: any;
      Widget: any;
    };
    components: {
      AddSectionView: any;
    };
  };

  /** Layout modules */
  layouts: {
    panel: {
      pages: {
        elements: {
          views: {
            Global: any;
            Elements: any;
          };
        };
        menu: {
          Menu: any;
        };
      };
    };
  };

  /** View modules */
  views: {
    /**
     * @deprecated since 2.4.0, use `elementorModules.editor.views.ControlsStack` instead.
     */
    ControlsStack: any;
  };

  // Dynamic module additions (added at runtime)
  landingLibraryPageModule?: any;
  floatingButtonsLibraryModule?: any;
  linkInBioLibraryModule?: any;
  floatingBarsLibraryModule?: any;
  elementsColorPicker?: any;
  promotionModule?: any;
  cloudLibraryModule?: any;
}

/**
 * Main Elementor Editor Interface
 * This represents the window.elementor object in editor context
 */
export interface ElementorEditor {
  /** Modules namespace */
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

  /** Helper utilities */
  helpers: any;

  /** Images manager */
  imagesManager: any;

  /** Presets factory */
  presetsFactory: any;

  /** Template manager */
  templates: any;

  /** Ajax utilities */
  ajax: any;

  /** Control conditions */
  conditions: any;

  /** History manager */
  history: any;

  /** Communication channels */
  channels: {
    editor: any;
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

  /** Add control view */
  addControlView(controlID: string, ControlView: any): void;

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

  /** Hooks system */
  hooks: {
    applyFilters(hook: string, value: any, ...args: any[]): any;
    addFilter(hook: string, callback: Function, priority?: number): void;
    removeFilter(hook: string, callback: Function): void;
    doAction(hook: string, ...args: any[]): void;
    addAction(hook: string, callback: Function, priority?: number): void;
    removeAction(hook: string, callback: Function): void;
  };
}

// Global window interface extension
declare global {
  interface Window {
    /** Elementor editor instance (available in editor context) */
    elementor: ElementorEditor;
  }
}