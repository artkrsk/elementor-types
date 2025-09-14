/**
 * Global Elementor Hooks System
 * Comprehensive TypeScript interfaces for window.elementor.hooks
 */

/**
 * Hook priority type (lower numbers run first)
 */
export type HookPriority = number;

/**
 * Hook callback function with context support
 */
export type HookCallback<TArgs extends readonly unknown[] = readonly unknown[], TReturn = void> =
  (this: any, ...args: TArgs) => TReturn;

/**
 * Filter callback that must return a value
 */
export type FilterCallback<TValue = unknown, TArgs extends readonly unknown[] = readonly unknown[]> =
  (this: any, value: TValue, ...args: TArgs) => TValue;

/**
 * Action callback that doesn't return a meaningful value
 */
export type ActionCallback<TArgs extends readonly unknown[] = readonly unknown[]> =
  (this: any, ...args: TArgs) => void;

/**
 * Common Elementor action hooks with their expected signatures
 */
export interface ElementorActionHooks {
  // Frontend element ready actions
  'frontend/element_ready/global': (element: JQuery, $: JQueryStatic) => void;
  'frontend/element_ready/widget': (element: JQuery, $: JQueryStatic) => void;
  'frontend/element_ready/section': (element: JQuery, $: JQueryStatic) => void;
  'frontend/element_ready/column': (element: JQuery, $: JQueryStatic) => void;
  'frontend/element_ready/container': (element: JQuery, $: JQueryStatic) => void;

  // Widget-specific ready actions
  [K: `frontend/element_ready/${string}`]: (element: JQuery, $: JQueryStatic) => void;
  [K: `frontend/element_handler_ready/${string}`]: (element: JQuery, $: JQueryStatic) => void;

  // Editor actions
  'elementor/editor/init': () => void;
  'elementor/editor/documents-manager/init-classes': (manager: any) => void;

  // Panel actions
  'panel/open_editor/widget': (panel: any, model: any, view: any) => void;
  'panel/open_editor/section': (panel: any, model: any, view: any) => void;
  'panel/open_editor/column': (panel: any, model: any, view: any) => void;
  'panel/open_editor/container': (panel: any, model: any, view: any) => void;

  // Widget-specific panel actions with better typing
  [K: `panel/open_editor/widget/${string}`]: (panel: any, model: any, view: any) => void;
  [K: `panel/open_editor/${string}`]: (panel: any, model?: any, view?: any) => void;

  // Generic action hooks
  [hookName: string]: ActionCallback<any[]>;
}

/**
 * Common Elementor filter hooks with their expected signatures
 */
export interface ElementorFilterHooks {
  // Element and widget filters
  'elements/widget/icon': (icon: string, widgetName: string) => string;
  'elements/widget/title': (title: string, widgetName: string) => string;
  'elements/widget/controls': (controls: any[], widgetName: string) => any[];

  // Control filters
  'elementor/controls/get_available_tabs_controls': (tabs: any[]) => any[];
  'elementor/element/get_child_type': (childType: string, elementData: any, childModel: any) => string;

  // Content filters
  'elementor/widget/render_content': (content: string, widget: any) => string;
  'elementor/frontend/before_render': (content: string, element: any) => string;
  'elementor/frontend/after_render': (content: string, element: any) => string;

  // Settings and configuration filters
  'elementor/frontend/config': (config: any) => any;
  'elementor/editor/localize_settings': (settings: any) => any;

  // CSS and styling filters
  'elementor/css/media_queries': (mediaQueries: Record<string, string>) => Record<string, string>;
  'elementor/css/element_css': (css: string, element: any) => string;

  // Generic filter hooks
  [hookName: string]: FilterCallback<any, any[]>;
}

/**
 * Enhanced Elementor Hooks Interface
 * Main interface for window.elementor.hooks with comprehensive typing
 */
export interface ElementorHooks {
  /**
   * Add an action hook with specific typing
   * @param action - Action hook name
   * @param callback - Function to execute when action is triggered
   * @param priority - Priority for execution order (lower numbers run first)
   * @param context - Optional context for the callback
   */
  addAction<K extends keyof ElementorActionHooks>(
    action: K,
    callback: ElementorActionHooks[K],
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Add an action hook with generic typing
   * @param action - Action hook name
   * @param callback - Function to execute when action is triggered
   * @param priority - Priority for execution order (lower numbers run first)
   * @param context - Optional context for the callback
   */
  addAction(
    action: string,
    callback: ActionCallback<any[]>,
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Remove an action hook with specific typing
   * @param action - Action hook name
   * @param callback - Optional specific callback to remove
   */
  removeAction<K extends keyof ElementorActionHooks>(
    action: K,
    callback?: ElementorActionHooks[K]
  ): void;

  /**
   * Remove an action hook with generic typing
   * @param action - Action hook name
   * @param callback - Optional specific callback to remove
   */
  removeAction(action: string, callback?: Function): void;

  /**
   * Trigger an action hook with specific typing
   * @param action - Action hook name
   * @param args - Arguments to pass to the callbacks
   */
  doAction<K extends keyof ElementorActionHooks>(
    action: K,
    ...args: Parameters<ElementorActionHooks[K]>
  ): void;

  /**
   * Trigger an action hook with generic typing
   * @param action - Action hook name
   * @param args - Arguments to pass to the callbacks
   */
  doAction(action: string, ...args: any[]): void;

  /**
   * Add a filter hook with specific typing
   * @param filter - Filter hook name
   * @param callback - Function to filter the value
   * @param priority - Priority for execution order (lower numbers run first)
   * @param context - Optional context for the callback
   */
  addFilter<K extends keyof ElementorFilterHooks>(
    filter: K,
    callback: ElementorFilterHooks[K],
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Add a filter hook with generic typing
   * @param filter - Filter hook name
   * @param callback - Function to filter the value
   * @param priority - Priority for execution order (lower numbers run first)
   * @param context - Optional context for the callback
   */
  addFilter<TValue = any>(
    filter: string,
    callback: FilterCallback<TValue, any[]>,
    priority?: HookPriority,
    context?: any
  ): void;

  /**
   * Remove a filter hook with specific typing
   * @param filter - Filter hook name
   * @param callback - Optional specific callback to remove
   */
  removeFilter<K extends keyof ElementorFilterHooks>(
    filter: K,
    callback?: ElementorFilterHooks[K]
  ): void;

  /**
   * Remove a filter hook with generic typing
   * @param filter - Filter hook name
   * @param callback - Optional specific callback to remove
   */
  removeFilter(filter: string, callback?: Function): void;

  /**
   * Apply filters with specific typing
   * @param filter - Filter hook name
   * @param value - Value to filter
   * @param args - Additional arguments to pass to the filter callbacks
   */
  applyFilters<K extends keyof ElementorFilterHooks>(
    filter: K,
    value: Parameters<ElementorFilterHooks[K]>[0],
    ...args: any[]
  ): ReturnType<ElementorFilterHooks[K]>;

  /**
   * Apply filters with generic typing
   * @param filter - Filter hook name
   * @param value - Value to filter
   * @param args - Additional arguments to pass to the filter callbacks
   */
  applyFilters<TValue = any>(
    filter: string,
    value: TValue,
    ...args: any[]
  ): TValue;

  /**
   * Check if an action has any callbacks
   * @param action - Action hook name
   * @returns Whether the action has callbacks
   */
  hasAction(action: string): boolean;

  /**
   * Check if a filter has any callbacks
   * @param filter - Filter hook name
   * @returns Whether the filter has callbacks
   */
  hasFilter(filter: string): boolean;

  /**
   * Get the number of callbacks for an action
   * @param action - Action hook name
   * @returns Number of callbacks registered
   */
  didAction(action: string): number;

  /**
   * Remove all callbacks for an action
   * @param action - Action hook name
   */
  removeAllActions(action: string): void;

  /**
   * Remove all callbacks for a filter
   * @param filter - Filter hook name
   */
  removeAllFilters(filter: string): void;
}