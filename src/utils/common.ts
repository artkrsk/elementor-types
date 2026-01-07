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
  addRequest(action: string, options?: ElementorCommonAjaxOptions): void;

  /**
   * Send a request immediately
   * @param action - The action/endpoint name
   * @param options - Request configuration options
   */
  send?(action: string, options?: ElementorCommonAjaxOptions): JQuery.jqXHR;
}

/**
 * Dialog Types and Options
 */
export type DialogType =
  | 'alert'
  | 'confirm'
  | 'lightbox'
  | 'modal'
  | 'popup'
  | 'widget';

export interface DialogOptions {
  /** Dialog ID */
  id?: string;

  /** Dialog title */
  title?: string;

  /** Dialog content (HTML string or jQuery element) */
  content?: string | JQuery;

  /** Header message for alert/confirm dialogs */
  headerMessage?: string;

  /** Main message content (HTML string or jQuery element) */
  message?: string | JQuery;

  /** Dialog width */
  width?: number | string;

  /** Dialog height */
  height?: number | string;

  /** Whether dialog is modal */
  modal?: boolean;

  /** Whether dialog is resizable */
  resizable?: boolean;

  /** Whether dialog is draggable */
  draggable?: boolean;

  /** Auto-open dialog on creation */
  autoOpen?: boolean;

  /** Close dialog on escape key */
  closeOnEscape?: boolean;

  /** Close dialog on background click */
  closeOnBackgroundClick?: boolean;

  /** Hide behavior settings */
  hide?: {
    auto?: boolean;
    autoDelay?: number;
    onClick?: boolean;
    onOutsideClick?: boolean;
    onOutsideContextMenu?: boolean;
    onBackgroundClick?: boolean;
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
  /** Widget ID */
  id: string;

  /** Widget type */
  type: DialogType;

  /** Widget options */
  options: DialogOptions;

  /** Show the dialog */
  show(): DialogWidget;

  /** Hide the dialog */
  hide(): DialogWidget;

  /** Destroy the dialog */
  destroy(): DialogWidget;

  /** Check if dialog is visible */
  isVisible(): boolean;

  /** Get dialog content */
  getContent(): JQuery;

  /** Set dialog content */
  setContent(content: string | JQuery): DialogWidget;

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

  /** Refresh dialog layout */
  refresh(): void;

  /** Set dialog position */
  setPosition(position: DialogOptions['position']): void;

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
 * Dialog Manager Interface
 */
export interface ElementorCommonDialogsManager {
  /**
   * Create a new dialog widget
   * @param type - Dialog type (alert, confirm, modal, etc.)
   * @param options - Dialog configuration options
   * @returns Dialog widget instance
   */
  createWidget(type: DialogType, options: DialogOptions): DialogWidget;

  /**
   * Get existing dialog by ID
   * @param id - Dialog ID
   * @returns Dialog widget or null if not found
   */
  getDialog(id: string): DialogWidget | null;

  /**
   * Destroy dialog by ID
   * @param id - Dialog ID
   * @returns True if dialog was destroyed
   */
  destroyDialog(id: string): boolean;

  /**
   * Get all active dialogs
   * @returns Array of active dialog widgets
   */
  getActiveDialogs(): DialogWidget[];

  /**
   * Close all dialogs
   */
  closeAll(): void;

  /**
   * Create and show an alert dialog
   * @param message - Alert message
   * @param title - Optional title
   */
  alert(message: string, title?: string): DialogWidget;

  /**
   * Create and show a confirm dialog
   * @param message - Confirmation message
   * @param callback - Callback for user response
   * @param title - Optional title
   */
  confirm(
    message: string,
    callback: (confirmed: boolean) => void,
    title?: string
  ): DialogWidget;

  /**
   * Create and show a modal dialog
   * @param content - Modal content
   * @param options - Modal options
   */
  modal(content: string | JQuery, options?: DialogOptions): DialogWidget;
}

/**
 * Configuration Interface for ElementorCommon
 */
export interface ElementorCommonConfig {
  /** Experimental features configuration */
  experimentalFeatures: {
    container?: boolean;
    flexboxContainer?: boolean;
    landing_pages?: boolean;
    form_submissions?: boolean;
    [feature: string]: boolean | undefined;
  };

  /** Environment information */
  environment?: 'production' | 'development' | 'staging';

  /** Version information */
  version?: {
    elementor: string;
    php: string;
    wordpress: string;
  };

  /** URLs and endpoints */
  urls?: {
    base: string;
    assets: string;
    ajax: string;
    uploads: string;
  };

  /** Localization settings */
  locale?: {
    language: string;
    direction: 'ltr' | 'rtl';
    timezone: string;
  };

  /** User capabilities */
  user?: {
    can_edit: boolean;
    can_publish: boolean;
    can_edit_others: boolean;
    role: string;
  };

  /** Debug configuration */
  debug?: {
    enabled: boolean;
    level: 'error' | 'warn' | 'info' | 'debug';
    log_ajax: boolean;
    log_hooks: boolean;
  };
}

/**
 * Debug Interface for ElementorCommon
 */
export interface ElementorCommonDebug {
  /** Whether debugging is enabled */
  enabled: boolean;

  /** Log a debug message */
  log(...args: any[]): void;

  /** Log a warning message */
  warn(...args: any[]): void;

  /** Log an error message */
  error(...args: any[]): void;

  /** Log an info message */
  info(...args: any[]): void;

  /** Group console messages */
  group(label: string): void;

  /** End console group */
  groupEnd(): void;

  /** Log with stack trace */
  trace(...args: any[]): void;

  /** Time measurement utilities */
  time(label: string): void;
  timeEnd(label: string): void;

  /** Dump object/variable for inspection */
  dump(obj: any, label?: string): void;
}

/**
 * Storage Interface for ElementorCommon
 */
export interface ElementorCommonStorage {
  /**
   * Get item from storage
   * @param key - Storage key
   * @param fallback - Fallback value if key not found
   */
  get<T = any>(key: string, fallback?: T): T;

  /**
   * Set item in storage
   * @param key - Storage key
   * @param value - Value to store
   */
  set(key: string, value: any): void;

  /**
   * Remove item from storage
   * @param key - Storage key
   */
  remove(key: string): void;

  /**
   * Clear all storage
   */
  clear(): void;

  /**
   * Check if key exists
   * @param key - Storage key
   */
  has(key: string): boolean;
}

/**
 * Utils Interface for ElementorCommon
 */
export interface ElementorCommonUtils {
  /**
   * Generate unique ID
   * @param prefix - Optional prefix for ID
   */
  generateId(prefix?: string): string;

  /**
   * Debounce function execution
   * @param func - Function to debounce
   * @param wait - Wait time in milliseconds
   * @param immediate - Execute immediately
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
  ): T;

  /**
   * Throttle function execution
   * @param func - Function to throttle
   * @param wait - Wait time in milliseconds
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T;

  /**
   * Deep clone an object
   * @param obj - Object to clone
   */
  clone<T>(obj: T): T;

  /**
   * Deep merge objects
   * @param target - Target object
   * @param sources - Source objects
   */
  merge<T>(target: T, ...sources: any[]): T;

  /**
   * Escape HTML string
   * @param str - String to escape
   */
  escapeHtml(str: string): string;

  /**
   * Strip HTML tags
   * @param str - String to strip
   */
  stripHtml(str: string): string;
}

/**
 * Main ElementorCommon Interface
 * Complete interface for window.elementorCommon functionality
 */
export interface ElementorCommon {
  /** AJAX functionality */
  ajax: ElementorCommonAjax;

  /** Dialog management system */
  dialogsManager: ElementorCommonDialogsManager;

  /** Configuration settings */
  config: ElementorCommonConfig;

  /** Debug utilities */
  debug: ElementorCommonDebug;

  /** Storage utilities */
  storage?: ElementorCommonStorage;

  /** Common utilities */
  utils?: ElementorCommonUtils;

  /** Translation/localization function */
  translate?(key: string, domain?: string): string;

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