/**
 * ElementorCommon Types
 * Type definitions for window.elementorCommon utilities namespace
 */

/**
 * ElementorCommon AJAX Configuration
 * Simpler AJAX interface used by elementorCommon (different from main elementor.ajax)
 */
export interface ElementorCommonAjaxOptions {
  /** Request data payload */
  data?: Record<string, any>;

  /** Success callback function */
  success?: (response: any, textStatus: string, jqXHR: JQuery.jqXHR) => void;

  /** Error callback function */
  error?: (jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) => void;

  /** Complete callback (runs after success or error) */
  complete?: (jqXHR: JQuery.jqXHR, textStatus: string) => void;

  /** Before send callback */
  beforeSend?: (jqXHR: JQuery.jqXHR, settings: JQuery.AjaxSettings) => void;

  /** Request timeout in milliseconds */
  timeout?: number;

  /** Content type */
  contentType?: string | false;

  /** Data type expected from server */
  dataType?: 'xml' | 'html' | 'text' | 'json' | 'jsonp' | 'script';

  /** Request method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';

  /** Custom headers */
  headers?: Record<string, string>;
}

/**
 * ElementorCommon AJAX Interface
 * Simplified AJAX functionality for common operations
 */
export interface ElementorCommonAjax {
  /**
   * Add a new AJAX request
   * @param action - The action/endpoint name
   * @param options - Request configuration options
   */
  addRequest(action: string, options?: ElementorCommonAjaxOptions, immediately?: boolean): JQuery.Deferred<any, any, any>;

  /**
   * Send a request immediately
   * @param action - The action/endpoint name
   * @param options - Request configuration options
   */
  send?(action: string, options?: ElementorCommonAjaxOptions): JQuery.jqXHR;

  /**
   * Batch-load objects by id through the editor's AJAX layer.
   * Elementor never consumes an `error` callback for this call.
   */
  loadObjects(options: {
    action: string;
    ids: Array<string | number>;
    data?: Record<string, any> | undefined;
    before?: (() => void) | undefined;
    success: (data: Record<string, any>) => void;
  }): void;
}

/**
 * Dialog Types and Options
 */
export type DialogType =
  | 'simple'
  | 'buttons'
  | 'lightbox'
  | 'confirm'
  | 'alert';

export interface DialogOptions {
  /** Dialog content (HTML string or jQuery element) */
  content?: string | JQuery;

  /** Header message for alert/confirm dialogs */
  headerMessage?: string;

  /** Main message content (HTML string or jQuery element) */
  message?: string | JQuery;

  /** Whether dialog is modal */
  modal?: boolean;

  /** Hide behavior settings */
  hide?: {
    auto?: boolean;
    autoDelay?: number;
    onClick?: boolean;
    onOutsideClick?: boolean;
    onOutsideContextMenu?: boolean;
    onBackgroundClick?: boolean;
    /** 'buttons' widget type only: hide when any button is clicked */
    onButtonClick?: boolean;
    onEscKeyPress?: boolean;
    ignore?: string;
  };

  /** Dialog position */
  position?: {
    element?: string;
    my?: string;
    at?: string;
    of?: string | Element | JQuery | Window;
    enable?: boolean;
    autoRefresh?: boolean;
  };

  /** Dialog buttons */
  buttons?: Array<{
    text: string;
    classes?: string;
    click: () => void;
    close?: boolean;
  }>;

  /** Button text labels for confirm/alert dialogs */
  strings?: {
    confirm?: string;
    cancel?: string;
  };

  /** Event callbacks */
  onOpen?: () => void;
  onClose?: () => void;
  onResize?: () => void;
  onDrag?: () => void;
  onShow?: (params?: any) => void;
  onHide?: (params?: any) => void;
  onInit?: (params?: any) => void;
  onReady?: (params?: any) => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  /** Custom CSS classes */
  className?: string;

  /** Container selector or element */
  container?: string | JQuery;

  /** Prevent body scroll when dialog is open */
  preventScroll?: boolean;

  /** iframe reference */
  iframe?: JQuery | null;

  /** Show close button */
  closeButton?: boolean;

  /** Show/hide effects */
  effects?: {
    show?: string | Function;
    hide?: string | Function;
  };

  /** Additional widget-specific options */
  widget?: Record<string, any>;
}

/**
 * Dialog Widget Elements
 */
export interface DialogElements {
  widget: JQuery;
  content: JQuery;
  header?: JQuery;
  message?: JQuery;
  footer?: JQuery;
  closeButton?: JQuery;
  window?: JQuery;
  body?: JQuery;
  container?: JQuery;
  buttonsWrapper?: JQuery;
}

/**
 * Dialog Widget Interface
 */
export interface DialogWidget {
  /** Add a named element to the widget */
  addElement(name: string, element?: string | JQuery, classes?: string): JQuery;

  /** Show the dialog */
  show(): DialogWidget;

  /** Hide the dialog */
  hide(): DialogWidget;

  /** Destroy the dialog */
  destroy(): DialogWidget;

  /** Check if dialog is visible */
  isVisible(): boolean;

  /** Get all dialog elements or a specific element by key */
  getElements(): DialogElements;
  getElements(item: string): JQuery;

  /** Get all settings or a specific setting */
  getSettings(): any;
  getSettings(setting: string): any;

  /** Set header message */
  setHeaderMessage(message: string): DialogWidget;

  /** Set main message */
  setMessage(message: string | JQuery): DialogWidget;

  /** Update dialog settings */
  setSettings(key: string, value: any): DialogWidget;

  /** Set dialog ID */
  setID(id: string): DialogWidget;

  /** Refresh position */
  refreshPosition(): void;

  /** Event system */
  on(eventName: string, callback: Function): DialogWidget;
  off(eventName: string, callback?: Function): DialogWidget;
  trigger(eventName: string, params?: any): DialogWidget;

  /** Dynamic callback properties (can be set after creation) */
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * Dialog Manager Interface — the real dialogs-manager `Instance`
 * (assets/lib/dialog/dialog.js). It only creates widgets; there are no
 * lookup/close-all/alert/confirm helpers on the manager itself.
 */
export interface ElementorCommonDialogsManager {
  /**
   * Create a new dialog widget
   */
  createWidget(widgetType: DialogType, properties?: DialogOptions): DialogWidget;

  /**
   * Get manager settings (all, or one by key)
   */
  getSettings(property?: string): any;

  init?(settings?: Record<string, any>): void;

  /** Ids of currently open dialogs */
  openDialogs: string[];
}/**
 * Configuration Interface for ElementorCommon
 * Mirrors the elementor-common config localized by core/common/app.php
 */
export interface ElementorCommonConfig {
  version: string;
  isRTL: boolean;
  isDebug: boolean;
  isElementorDebug: boolean;
  activeModules: string[];
  experimentalFeatures: Record<string, true>;
  allExperimentalFeatures?: Record<string, boolean>;
  urls: {
    assets: string;
    rest: string;
  };
  filesUpload?: {
    unfilteredFiles: boolean;
  };
  [key: string]: any;
}/**
 * Debug Interface for ElementorCommon — an error-reporting queue,
 * not a console logger (core/common/assets/js/utils/debug.js)
 */
export interface ElementorCommonDebug {
  addURLToWatch(url: string): void;
  addCustomError(error: Error, category?: string, tag?: string): void;
  addError(errorParams: Record<string, any>): void;
  sendErrors(): void;
}/**
 * Storage Interface for ElementorCommon
 * (core/common/assets/js/utils/storage.js)
 */
export interface ElementorCommonStorage {
  get<T = any>(key?: string | null, options?: { session?: boolean }): T;
  set(key: string, value: any, options?: { session?: boolean; lifetimeInSeconds?: number }): void;
  save(object: Record<string, any>, session?: boolean): void;
}/**
 * Main ElementorCommon Interface
 * Complete interface for window.elementorCommon functionality
 */
export interface ElementorCommon {
  /** AJAX functionality */
  ajax: ElementorCommonAjax;

  /** Cached jQuery references built by getDefaultElements() */
  elements: {
    $window: JQuery<Window>;
    $document: JQuery<Document>;
    $body: JQuery;
  };

  /** Dialog management system */
  dialogsManager: ElementorCommonDialogsManager;

  /** Configuration settings */
  config: ElementorCommonConfig;

  /** Debug utilities */
  debug: ElementorCommonDebug;

  /** Storage utilities */
  storage?: ElementorCommonStorage;

  /** Common helpers (core/common/assets/js/common.js) */
  helpers: {
    consoleWarn(...args: any[]): void;
    consoleError(message: string): void;
    cloneObject<T>(object: T): T;
    upperCaseWords(str: string): string;
    getUniqueId(): string;
  };

  /** Translation/localization function */
  translate?(stringKey: string, context?: string | null, templateArgs?: any[] | Record<string, any>, i18nStack?: Record<string, string>): string;

  /** Event system integration */
  events?: {
    trigger(event: string, ...args: any[]): void;
    on(event: string, callback: Function): void;
    off(event: string, callback?: Function): void;
    once(event: string, callback: Function): void;
  };

  /** Environment information */
  environment?: {
    editor: boolean;
    frontend: boolean;
    preview: boolean;
    admin: boolean;
  };
}

/**
 * Type guard to check if object is ElementorCommon
 */
export function isElementorCommon(obj: any): obj is ElementorCommon {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'ajax' in obj &&
    'dialogsManager' in obj &&
    'config' in obj &&
    'debug' in obj
  );
}