/**
 * Frontend Main Interface
 * Main ElementorFrontend interface and related types
 */

import type { ViewModule } from "../core";
import type { ElementorFrontendConfig } from "./config";
import type { ElementsHandler, DocumentsManager } from "./managers";
import type {
  ElementorBreakpoints,
  AssetsLoader,
  Controls,
  VideoLoader,
  Events,
  UrlActions,
} from "./utils";
import type { ElementorHooks } from "../utils/elementor-hooks";

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
  utils: {
    lightbox: Promise<any>;
    swiper: any; // Swiper constructor
    assetsLoader: AssetsLoader;
    controls: Controls;
    vimeo: VideoLoader;
    youtube: VideoLoader;
    anchors: any;
    events: Events;
    urlActions: UrlActions;
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

  // Additional methods from JS analysis
  getWidescreenSetting(settings: object, settingKey: string): any;
  getElements(elementName?: string): any; // deprecated
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

  // Event methods
  on(eventName: string, callback: Function): void;
  off(eventName: string, callback?: Function): void;
  trigger(eventName: string, ...args: any[]): void;
}
