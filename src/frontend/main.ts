/**
 * Frontend Main Interface
 * Main ElementorFrontend interface and related types
 */

import type { ViewModule } from "../core";
import type { ElementorFrontendConfig } from "./config";
import type { ElementsHandler, LegacyDocumentsManager as DocumentsManager } from "./managers";
import type {
  ElementorBreakpoints,
  AssetsLoader,
  AnchorScrollMarginUtils,
  Controls,
  VideoLoader,
  Events,
  UrlActions,
} from "./utils";
import type { ElementorHooks } from "../utils/elementor-hooks";

/** Storage utility wrapping localStorage/sessionStorage with expiration */
export interface ElementorStorage {
  get(key: string, options?: { session?: boolean }): any;
  set(key: string, value: any, options?: { session?: boolean }): void;
  save(object: Record<string, any>, session?: boolean): void;
}

/** Browser/OS environment detection flags */
export interface EnvironmentFlags {
  firefox: boolean;
  webkit: boolean;
  chrome: boolean;
  safari: boolean;
  edge: boolean;
  ie: boolean;
  opera: boolean;
  mac: boolean;
  blink: boolean;
  appleWebkit: boolean;
  isTouchDevice: boolean;
}

/**
 * Main Elementor Frontend interface
 */
export interface ElementorFrontend {
  config: ElementorFrontendConfig;
  elements: {
    window: Window;
    $window: JQuery<Window>;
    $document: JQuery<Document>;
    $head: JQuery<HTMLHeadElement>;
    $body: JQuery<HTMLBodyElement>;
    $deviceMode: JQuery<HTMLElement>;
    $wpAdminBar?: JQuery<HTMLElement>;
  };
  breakpoints: ElementorBreakpoints;
  storage: ElementorStorage;
  modulesHandlers: Record<string, any>;

  /** @deprecated since 2.4.0, use `elementorModules.frontend.tools.StretchElement` and `elementorModules.utils.Masonry` */
  modules?: Record<string, any>;

  utils: {
    lightbox: Promise<any>;
    swiper: any;
    assetsLoader: AssetsLoader;
    controls: Controls;
    vimeo: VideoLoader;
    youtube: VideoLoader;
    baseVideoLoader: any;
    anchor_scroll_margin: AnchorScrollMarginUtils;
    events: Events;
    urlActions: UrlActions;
    environment: EnvironmentFlags;
    escapeHTML: (str: string) => string;
  };
  hooks: ElementorHooks;
  elementsHandler: ElementsHandler;
  documentsManager: DocumentsManager;

  // Methods
  init(): void;
  isEditMode(): boolean;
  isWPPreviewMode(): boolean;
  getCurrentDeviceMode(): string;
  getCurrentDeviceSetting(settings: object, settingKey: string): any;
  getDeviceSetting(
    deviceMode: string,
    settings: object,
    settingKey: string
  ): any;
  getKitSettings(settingName?: string): any;
  getPageSettings(settingName?: string): any;
  getGeneralSettings(settingName?: string): any;
  getDialogsManager(): any;

  // Additional methods from JS analysis
  getWidescreenSetting(settings: object, settingKey: string): any;
  /** @deprecated */
  getElements(elementName?: string): any;
  getDefaultSettings(): {
    selectors: {
      elementor: string;
      adminBar: string;
    };
  };
  getDefaultElements(): {
    window: Window;
    $window: JQuery<Window>;
    $document: JQuery<Document>;
    $head: JQuery<HTMLHeadElement>;
    $body: JQuery<HTMLBodyElement>;
    $deviceMode: JQuery<HTMLElement>;
  };
  bindEvents(): void;
  setDeviceModeData(): void;
  populateActiveBreakpointsConfig(): void;

  addListenerOnce(
    listenerID: string,
    event: string,
    callback: Function,
    to?: any
  ): void;
  removeListeners(
    listenerID: string,
    event: string,
    callback?: Function,
    from?: any
  ): void;
  debounce(func: Function, wait: number): Function;

  // Event methods (inherited from Module pattern)
  on(eventName: string, callback: Function): void;
  off(eventName: string, callback?: Function): void;
  trigger(eventName: string, ...args: any[]): void;

  // Initialization methods
  initDialogsManager(): void;
  initOnReadyComponents(): void;
  initOnReadyElements(): void;
  initModules(): void;

  /** Called when document is fully loaded */
  onDocumentLoaded(): void;

  addUserAgentClasses(): void;
  muteMigrationTraces(): void;

  /**
   * @deprecated since 2.5.0, use `elementorModules.frontend.handlers.Base` instead
   */
  readonly Module: any;
}
