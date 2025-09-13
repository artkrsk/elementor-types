/**
 * Editor Main Interface
 * Main ElementorEditor interface and core editor types
 */

import type { HistoryManager } from "./history";
import type { ElementorGlobals, ElementorIconsManager } from "./managers";
import type { WidgetCache } from "./elements";
import type { ElementorWindowModules } from "../globals/elementor-window";

/**
 * Background click listener configuration
 */
export interface BackgroundClickListener {
  element: string;
  ignore: string;
}

/**
 * Editor channels for communication
 */
export interface EditorChannels {
  editor: any; // Backbone.Radio.Channel
  data: any; // Backbone.Radio.Channel
  panelElements: any; // Backbone.Radio.Channel
  dataEditMode: any; // Backbone.Radio.Channel
  deviceMode: any; // Backbone.Radio.Channel
  templates: any; // Backbone.Radio.Channel
  responsivePreview: any; // Backbone.Radio.Channel
}

/**
 * Main Elementor Editor interface
 */
export interface ElementorEditor {
  // Core properties
  widgetsCache: WidgetCache;
  config: {
    document: {
      container: string;
      id: string;
      type: string;
    };
    initial_document: {
      id: string;
    };
    user: {
      introduction: {
        [key: string]: boolean;
      };
    };
    additional_shapes?: {
      [shapeType: string]: string;
    };
    elements: {
      [elementType: string]: any;
    };
  };
  loaded: boolean;
  previewLoadedOnce: boolean;
  activeBreakpointsUpdated: boolean;

  // Editor modules
  modules: ElementorWindowModules;

  // Helper objects
  helpers: any;
  imagesManager: any;
  presetsFactory: any;
  templates: any;
  ajax: any;
  conditions: any;

  // Background click listeners
  backgroundClickListeners: {
    tooltip: BackgroundClickListener;
    popover: BackgroundClickListener;
    globalControlsSelect: BackgroundClickListener;
  };

  // Settings and channels
  settings: {
    page: {
      model: {
        attributes: {
          [key: string]: any;
        };
        on(event: string, callback: Function): void;
      };
    };
  };

  channels: EditorChannels;

  // Documents system
  documents: {
    currentDocument: {
      id: string;
      container: {
        isEditable(): boolean;
      };
    };
    getCurrent(): any;
  };

  // UI Elements
  $previewContents: JQuery<HTMLElement>;
  $preview?: JQuery<HTMLElement>;
  elements?: any; // Backbone collection

  // Panel and UI Components
  panel: any;
  navigator: any;
  responsiveBar: any;

  // Core managers
  history: HistoryManager;
  dynamicTags: any;
  notifications: any;
  introduction: any;
  validator: any;
  globals: ElementorGlobals;
  iconsManager: ElementorIconsManager;

  // Core Methods - User and Permissions
  userCan(capability: string): boolean;

  // Core Methods - Element and Control Management
  addControlView(controlID: string, ControlView: any): void;
  getElementData(model: any): any;
  getElementControls(modelElement: any): any;
  mergeControlsSettings(controls: any): any;
  getControlView(controlID: string): any;

  // Core Methods - Views and Containers
  getPanelView(): any;
  getPreviewView(): any;
  getPreviewContainer(): any;
  getContainer(id: string): any;
  getCurrentElement(): any;

  // Core Methods - Initialization
  initComponents(): void;
  initDialogsManager(): void;
  initElements(): void;
  initPreview(): void;
  initPreviewView(document: any): void;
  initFrontend(): void;
  initPanel(): void;
  initNavigator(): void;
  initClearPageDialog(): void;

  // Core Methods - Preview and Backend creation
  createBackboneElementsCollection(json: any): any;
  createBackboneElementsModel(elementsCollection: any): any;
  createPreviewView(targetElement: any, model: any, config?: any): any;
  renderPreview(preview: any): void;

  // Core Methods - Utilities
  checkEnvCompatibility(): boolean;
  toggleSortableState(state?: boolean): void;
  setAjax(): void;
  createAjaxErrorMessage(xmlHttpRequest: any): string;
  toggleDocumentCssFiles(document: any, state: boolean): void;

  // Lifecycle methods
  onStart(): void;

  // Existing methods
  getPreferences(key: string): any;
  setPreferences(key: string, value: any): void;
  isPreviewMode(): boolean;
  reloadPreview(): void;
  saveDocument(): Promise<any>;
  loadDocument(): Promise<any>;

  // Event methods
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}
