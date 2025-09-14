/**
 * Editor Main Interface
 * Main ElementorEditor interface and core editor types
 */

import type { HistoryManager } from "./history";
import type { ElementorGlobals, ElementorIconsManager } from "./managers";
import type { WidgetCache } from "./elements";
import type { ElementorWindowModules } from "../globals/elementor-window";
import type { CommonElementSettings } from "./element-settings";
import type { BackboneRadioChannel } from "../third-party";

/**
 * Element data structure
 */
export interface ElementData {
  id: string;
  elType: string;
  settings: CommonElementSettings;
  elements?: ElementData[];
}

/**
 * Control view interface
 */
export interface ControlView {
  model: any;
  container: any;
  render(): this;
  destroy(): void;
}

/**
 * Panel view interface
 */
export interface PanelView {
  currentPageName: string;
  getCurrentPageName(): string;
  setPage(pageName: string): void;
  getPages(): Record<string, any>;
}

/**
 * Preview view interface
 */
export interface PreviewView {
  addChildModel(model: any, options?: any): any;
  addChildElement(data: ElementData, options?: any): any;
}

/**
 * Container interface
 */
export interface EditorContainer {
  id: string;
  isEditable(): boolean;
  getModel(): any;
  getSettings(): CommonElementSettings;
  renderUI(): void;
}

/**
 * Helpers manager interface
 */
export interface HelpersManager {
  urlActions: any;
  historyDebounce: any;
  heartbeat: any;

  // Utility methods
  scrollToElement(element: JQuery | HTMLElement): void;
  isElementInViewport(element: JQuery | HTMLElement): boolean;

  // String utilities
  stringReplaceAll(str: string, search: string, replace: string): string;

  // Device detection
  isTouchDevice(): boolean;
}

/**
 * Images manager interface
 */
export interface ImagesManager {
  getImageUrl(image: any): string;
  getLightboxImageUrl(image: any): string;
}

/**
 * Presets factory interface
 */
export interface PresetsFactory {
  getPresets(widgetType: string): any[];
  applyPreset(preset: any, container: EditorContainer): void;
}

/**
 * Templates manager interface
 */
export interface TemplatesManager {
  getTemplates(): any[];
  importTemplate(template: any): Promise<any>;
  saveTemplate(options: any): Promise<any>;
}

/**
 * Ajax manager interface
 */
export interface AjaxManager {
  request(type: string, options: any): Promise<any>;
  addRequest(type: string, callback: Function): void;
}

/**
 * Conditions manager interface
 */
export interface ConditionsManager {
  check(condition: any, values: any): boolean;
}

/**
 * Dynamic tags manager interface
 */
export interface DynamicTagsManager {
  parseTagsText(text: string, settings: any, parseCallback?: Function): string;
  getTagDataContent(tagName: string, tagKey: string, tagSettings?: any): any;
  createTag(tagType: string, tagName: string, settings: any): any;
}

/**
 * Notifications manager interface
 */
export interface NotificationsManager {
  showToast(options: {
    message: string;
    buttons?: any[];
  }): void;
}

/**
 * Introduction manager interface
 */
export interface IntroductionManager {
  show(options: any): void;
  isViewed(introductionKey: string): boolean;
  setViewed(introductionKey: string): void;
}

/**
 * Validator interface
 */
export interface ValidatorManager {
  validateForm(form: any): boolean;
  addCustomValidation(callback: Function): void;
}

/**
 * Panel interface
 */
export interface EditorPanel {
  currentPageName: string;
  getCurrentPageName(): string;
  setPage(pageName: string): void;
  openEditor(model: any, view?: any): void;
  closeEditor(): void;
}

/**
 * Navigator interface
 */
export interface NavigatorManager {
  elements: any;
  getItems(): any[];
  addItem(item: any): void;
}

/**
 * Responsive bar interface
 */
export interface ResponsiveBar {
  getCurrentDeviceMode(): string;
  setDeviceMode(deviceMode: string): void;
}

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
  editor: BackboneRadioChannel;
  data: BackboneRadioChannel;
  panelElements: BackboneRadioChannel;
  dataEditMode: BackboneRadioChannel;
  deviceMode: BackboneRadioChannel;
  templates: BackboneRadioChannel;
  responsivePreview: BackboneRadioChannel;
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
      [elementType: string]: ElementData;
    };
  };
  loaded: boolean;
  previewLoadedOnce: boolean;
  activeBreakpointsUpdated: boolean;

  // Editor modules
  modules: ElementorWindowModules;

  // Helper objects
  helpers: HelpersManager;
  imagesManager: ImagesManager;
  presetsFactory: PresetsFactory;
  templates: TemplatesManager;
  ajax: AjaxManager;
  conditions: ConditionsManager;

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
        attributes: CommonElementSettings;
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
    getCurrent(): {
      id: string;
      container: EditorContainer;
      getContainer(): EditorContainer;
    };
  };

  // UI Elements
  $previewContents: JQuery<HTMLElement>;
  $preview?: JQuery<HTMLElement>;
  elements?: {
    models: any[];
    add(model: any): void;
    remove(model: any): void;
    reset(models?: any[]): void;
  }; // Backbone collection

  // Panel and UI Components
  panel: EditorPanel;
  navigator: NavigatorManager;
  responsiveBar: ResponsiveBar;

  // Core managers
  history: HistoryManager;
  dynamicTags: DynamicTagsManager;
  notifications: NotificationsManager;
  introduction: IntroductionManager;
  validator: ValidatorManager;
  globals: ElementorGlobals;
  iconsManager: ElementorIconsManager;

  // Core Methods - User and Permissions
  userCan(capability: string): boolean;

  // Core Methods - Element and Control Management
  addControlView(controlID: string, ControlViewClass: new(...args: any[]) => ControlView): void;
  getElementData(model: any): ElementData;
  getElementControls(modelElement: any): Record<string, any>;
  mergeControlsSettings(controls: Record<string, any>): Record<string, any>;
  getControlView(controlID: string): ControlView | null;

  // Core Methods - Views and Containers
  getPanelView(): PanelView;
  getPreviewView(): PreviewView;
  getPreviewContainer(): EditorContainer;
  getContainer(id: string): EditorContainer | null;
  getCurrentElement(): any | null;

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
  createBackboneElementsCollection(json: ElementData[]): any;
  createBackboneElementsModel(elementsCollection: any): any;
  createPreviewView(targetElement: any, model: any, config?: any): PreviewView;
  renderPreview(preview: any): void;

  // Core Methods - Utilities
  checkEnvCompatibility(): boolean;
  toggleSortableState(state?: boolean): void;
  setAjax(): void;
  createAjaxErrorMessage(xmlHttpRequest: XMLHttpRequest): string;
  toggleDocumentCssFiles(document: any, state: boolean): void;

  // Lifecycle methods
  onStart(): void;

  // Existing methods
  getPreferences(key: string): any;
  setPreferences(key: string, value: any): void;
  isPreviewMode(): boolean;
  reloadPreview(): void;
  saveDocument(): Promise<{ success: boolean; data?: any; errors?: string[] }>;
  loadDocument(): Promise<{ success: boolean; data?: any; errors?: string[] }>;

  // Event methods
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}
