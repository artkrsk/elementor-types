/**
 * Elementor Editor Hooks System
 * Comprehensive TypeScript interfaces for Elementor's WordPress-style hooks system
 * Based on analysis of actual usage patterns in the JavaScript codebase
 */

/**
 * Hook callback function with flexible return types
 */
export type HookCallback<T = any> = (...args: any[]) => T;

/**
 * Filter callback that must return a value
 */
export type FilterCallback<T = any> = (value: T, ...args: any[]) => T;

/**
 * Action callback that doesn't return a value
 */
export type ActionCallback = (...args: any[]) => void;

/**
 * Hook priority (lower numbers run first)
 */
export type HookPriority = number;

/**
 * Common Elementor filter hooks with their expected signatures
 */
export interface ElementorFilterHooks {
  // Widget and element filters
  "elements/widget/controls/common/default": (
    controls: any[],
    widgetType: string
  ) => any[];
  "elements/widget/controls/common-optimized/default": (
    controls: any[],
    widgetType: string
  ) => any[];
  "elements/widget/controls/common": (
    controls: any[],
    widgetType: string,
    widgetData: any
  ) => any[];
  "elements/base/behaviors": (behaviors: any, view: any) => any;
  "elements/widget/behaviors": (behaviors: any, view: any) => any;
  "elements/section/behaviors": (behaviors: any, view: any) => any;
  "elements/column/behaviors": (behaviors: any, view: any) => any;
  "elements/container/behaviors": (behaviors: any, view: any) => any;
  "elements/base-section-container/behaviors": (
    behaviors: any,
    view: any
  ) => any;

  // Context menu filters
  "elements/context-menu/groups": (groups: any[], elementType: string) => any[];
  "panel/element/contextMenuGroups": (groups: any[], view: any) => any[];

  // Edit buttons and UI
  "elements/edit-buttons": (buttons: any[]) => any[];

  // Index signature for dynamic element-specific hooks
  [K: `elements/${string}/contextMenuGroups`]: (
    groups: any[],
    view: any
  ) => any[];
  [K: `elements/edit-buttons/${string}`]: (buttons: any[]) => any[];

  // Panel and layout
  "panel/footer/behaviors": (behaviors: any, view: any) => any;
  "panel/header/behaviors": (behaviors: any, view: any) => any;
  "panel/category/behaviors": (behaviors: any, view: any) => any;
  "panel/element/behaviors": (behaviors: any, view: any) => any;
  "panel/elements/regionViews": (regionViews: any, context: any) => any;
  "navigator/layout/behaviors": (behaviors: any, view: any) => any;

  // View and model filters
  "element/view": (ViewClass: any, model: any, parent: any) => any;
  "element/model": (ModelClass: any, attributes: any) => any;
  "views/add-section/behaviors": (behaviors: any, view: any) => any;

  // Template library
  "templates/source/is-remote": (isRemote: boolean, source: string) => boolean;
  "elementor/editor/template-library/template/classes": (
    classes: string[],
    view: any
  ) => string[];
  "elementor/editor/template-library/template/behaviors": (
    behaviors: any,
    view: any
  ) => any;
  "elementor/editor/template-library/template/action-button": (
    viewId: string,
    templateData: any
  ) => string;

  // Controls and forms
  "controls/base/behaviors": (behaviors: any, view: any) => any;

  // Utility filters
  "elementor/social_icons/network_name": (
    social: any,
    iconsControl: any,
    fallbackControl: any,
    toUpperCase: boolean,
    withIcon: boolean
  ) => any;
  "editor/style/styleText": (cssText: string, context: any) => string;

  // Frontend filters
  "frontend/handlers/menu_anchor/scroll_top_distance": (
    scrollTop: number
  ) => number;

  // Generic string-based filters
  [key: string]: (...args: any[]) => any;
}

/**
 * Common Elementor action hooks with their expected signatures
 */
export interface ElementorActionHooks {
  // Panel actions
  "panel/open_editor/document": (manager: any, model?: any, view?: any) => void;

  // Widget actions
  "panel/widgets/base/controls/wp_widget/loaded": (view: any) => void;

  // Frontend element ready actions
  "frontend/element_ready/global": (element: JQuery, $: JQueryStatic) => void;

  // Frontend system actions
  "elementor/frontend/documents-manager/init-classes": (manager: any) => void;

  // Index signatures for dynamic hooks
  [K: `panel/open_editor/${string}`]: (
    manager: any,
    model?: any,
    view?: any
  ) => void;
  [K: `panel/open_editor/${string}/${string}`]: (
    manager: any,
    model: any,
    view: any
  ) => void;
  [K: `panel/widgets/${string}/controls/wp_widget/loaded`]: (view: any) => void;
  [K: `frontend/element_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;
  [K: `frontend/element_handler_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;

  // Generic string-based actions
  [key: string]: (...args: any[]) => void;
}

/**
 * Enhanced hooks system interface with comprehensive type safety
 */
export interface ElementorHooks {
  /**
   * Apply filters to modify a value through registered callbacks
   * @param filter - Filter name
   * @param value - Value to filter
   * @param args - Additional arguments passed to callbacks
   */
  applyFilters<K extends keyof ElementorFilterHooks>(
    filter: K,
    value: Parameters<ElementorFilterHooks[K]>[0],
    ...args: any[]
  ): ReturnType<ElementorFilterHooks[K]>;

  applyFilters<T = any>(filter: string, value: T, ...args: any[]): T;

  /**
   * Add a filter callback
   * @param filter - Filter name
   * @param callback - Callback function
   * @param priority - Priority (lower runs first, default: 10)
   * @param context - Context object for binding
   */
  addFilter<K extends keyof ElementorFilterHooks>(
    filter: K,
    callback: ElementorFilterHooks[K],
    priority?: HookPriority,
    context?: any
  ): void;

  addFilter<T = any>(
    filter: string,
    callback: FilterCallback<T>,
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Remove a filter callback
   * @param filter - Filter name
   * @param callback - Callback function to remove
   */
  removeFilter<K extends keyof ElementorFilterHooks>(
    filter: K,
    callback: ElementorFilterHooks[K]
  ): void;

  removeFilter(filter: string, callback: Function): void;

  /**
   * Execute action hooks with provided arguments
   * @param action - Action name
   * @param args - Arguments to pass to callbacks
   */
  doAction<K extends keyof ElementorActionHooks>(
    action: K,
    ...args: Parameters<ElementorActionHooks[K]>
  ): void;

  doAction(action: string, ...args: any[]): void;

  /**
   * Add an action callback
   * @param action - Action name
   * @param callback - Callback function
   * @param priority - Priority (lower runs first, default: 10)
   * @param context - Context object for binding
   */
  addAction<K extends keyof ElementorActionHooks>(
    action: K,
    callback: ElementorActionHooks[K],
    priority?: HookPriority,
    context?: any
  ): void;

  addAction(
    action: string,
    callback: ActionCallback,
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Remove an action callback
   * @param action - Action name
   * @param callback - Callback function to remove
   */
  removeAction<K extends keyof ElementorActionHooks>(
    action: K,
    callback: ElementorActionHooks[K]
  ): void;

  removeAction(action: string, callback?: Function): void;

  /**
   * Check if a filter has any callbacks
   * @param filter - Filter name
   */
  hasFilter(filter: string): boolean;

  /**
   * Check if an action has any callbacks
   * @param action - Action name
   */
  hasAction(action: string): boolean;

  /**
   * Get current priority for running hooks
   */
  getCurrentPriority(): HookPriority;

  /**
   * Check if hooks are currently being executed for a specific filter/action
   * @param hookName - Hook name to check
   */
  doingFilter(hookName?: string): boolean;

  /**
   * Check if hooks are currently being executed for a specific action
   * @param hookName - Hook name to check
   */
  doingAction(hookName?: string): boolean;

  /**
   * Remove all callbacks for a filter
   * @param filter - Filter name
   * @param priority - Optional priority to remove (removes all if not specified)
   */
  removeAllFilters(filter: string, priority?: HookPriority): void;

  /**
   * Remove all callbacks for an action
   * @param action - Action name
   * @param priority - Optional priority to remove (removes all if not specified)
   */
  removeAllActions(action: string, priority?: HookPriority): void;
}

/**
 * Hooks system with extension capabilities for custom hooks
 */
export interface ExtendableHooks extends ElementorHooks {
  /**
   * Register a new filter hook definition for type safety
   * @param filter - Filter name
   * @param signature - TypeScript signature for the filter
   */
  registerFilter<T extends (...args: any[]) => any>(
    filter: string,
    signature: T
  ): void;

  /**
   * Register a new action hook definition for type safety
   * @param action - Action name
   * @param signature - TypeScript signature for the action
   */
  registerAction<T extends (...args: any[]) => void>(
    action: string,
    signature: T
  ): void;
}

// Export default hooks interface
export default ElementorHooks;
