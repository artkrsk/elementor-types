/**
 * Elementor Hooks System
 * Complete interface for window.elementor.hooks functionality
 */

/**
 * Hook configuration options for addAction and addFilter
 */
export interface ElementorHookConfig {
  /** Hook priority (lower = earlier execution) */
  priority?: number;

  /** Number of arguments the callback accepts */
  acceptedArgs?: number;

  /** Context object for the callback */
  context?: any;

  /** Execute hook only once */
  once?: boolean;

  /** Hook namespace for organization */
  namespace?: string;
}

/**
 * Action callback function type with proper typing
 */
export type ElementorActionCallback<T extends any[] = any[]> = (...args: T) => void;

/**
 * Filter callback function type with proper typing
 */
export type ElementorFilterCallback<TValue = any, TArgs extends any[] = any[]> = (
  value: TValue,
  ...args: TArgs
) => TValue;

/**
 * Hook handler information
 */
export interface ElementorHookHandler {
  /** Callback function */
  callback: Function;

  /** Execution priority */
  priority: number;

  /** Number of accepted arguments */
  acceptedArgs: number;

  /** Callback context */
  context?: any;

  /** Execute only once */
  once: boolean;

  /** Unique handler ID */
  id: string;

  /** Hook namespace */
  namespace?: string;
}

/**
 * Complete Elementor Hooks Interface
 * Enhanced version of the hooks system with comprehensive functionality
 */
export interface ElementorHooks {
  /**
   * Add an action hook
   *
   * Register a callback function to be executed when a specific action is triggered.
   * Actions are executed in order of priority (lower numbers = higher priority).
   * Actions do not return values and are used for triggering side effects.
   *
   * @param action - The action name to hook into (use ElementorActionHooks for type safety)
   * @param callback - Function to execute when action is triggered
   * @param priority - Execution priority (default: 10, lower = earlier execution)
   * @param context - Context object for the callback (becomes 'this' in callback)
   * @returns Unique hook handler ID that can be used for removal
   *
   * @example
   * ```typescript
   * // Basic action hook - no parameters
   * const hookId = elementor.hooks.addAction('panel/open/editor', function() {
   *   console.log('Editor panel opened');
   * });
   *
   * // Action hook with typed parameters
   * elementor.hooks.addAction('widget/render', function(widget: WidgetModel) {
   *   console.log('Rendering widget:', widget.getType());
   *   // Perform custom widget rendering logic
   * });
   *
   * // Action with priority (lower = higher priority)
   * elementor.hooks.addAction('document/save/before', function(document: DocumentModel) {
   *   // This runs early due to priority 5
   *   this.validateDocument(document);
   * }, 5, myValidator);
   *
   * // Action with context object
   * class MyExtension {
   *   init() {
   *     elementor.hooks.addAction('frontend/element_ready', this.onElementReady, 10, this);
   *   }
   *
   *   onElementReady(element: JQuery, elementType: string) {
   *     // 'this' refers to MyExtension instance
   *     this.enhanceElement(element, elementType);
   *   }
   *
   *   enhanceElement(element: JQuery, type: string) {
   *     // Custom enhancement logic
   *   }
   * }
   *
   * // One-time execution action
   * elementor.hooks.addAction('editor/loaded', function() {
   *   console.log('Editor fully loaded - this runs only once');
   * });
   *
   * // Removing an action hook
   * const removeHandler = elementor.hooks.addAction('test/action', myCallback);
   * elementor.hooks.removeAction('test/action', removeHandler);
   * ```
   */
  addAction<TArgs extends any[] = any[]>(
    action: ElementorActionHooks | string,
    callback: ElementorActionCallback<TArgs>,
    priority?: number,
    context?: any
  ): string;

  /**
   * Execute an action hook
   *
   * Trigger all callbacks registered for the specified action.
   * Callbacks are executed in priority order.
   *
   * @param action - The action name to trigger
   * @param args - Arguments to pass to the action callbacks
   *
   * @example
   * ```typescript
   * // Trigger a simple action
   * elementor.hooks.doAction('custom/action');
   *
   * // Trigger action with data
   * elementor.hooks.doAction('widget/updated', widgetModel, changes);
   * ```
   */
  doAction(action: string, ...args: any[]): void;

  /**
   * Remove an action hook
   *
   * Remove a previously registered action callback by function reference or handler ID.
   *
   * @param action - The action name
   * @param callback - Function reference or handler ID to remove
   * @returns True if hook was removed successfully
   *
   * @example
   * ```typescript
   * // Remove by function reference
   * elementor.hooks.removeAction('panel/open/editor', myCallback);
   *
   * // Remove by handler ID
   * const hookId = elementor.hooks.addAction('test', callback);
   * elementor.hooks.removeAction('test', hookId);
   * ```
   */
  removeAction(action: string, callback?: Function | string): boolean;

  /**
   * Add a filter hook
   *
   * Register a callback function to modify a value when a specific filter is applied.
   * Filters are applied in order of priority and must return the (modified) value.
   * Unlike actions, filters must return a value and are used for data transformation.
   *
   * @param filter - The filter name to hook into (use ElementorFilterHooks for type safety)
   * @param callback - Function to modify the filtered value (must return the value)
   * @param priority - Execution priority (default: 10, lower = earlier execution)
   * @param context - Context object for the callback (becomes 'this' in callback)
   * @returns Unique hook handler ID that can be used for removal
   *
   * @example
   * ```typescript
   * // Basic filter hook
   * elementor.hooks.addFilter('widget/settings', function(settings, widget) {
   *   if (widget.getType() === 'heading') {
   *     settings.enhanced = true;
   *   }
   *   return settings; // Must return the modified settings
   * });
   *
   * // Filter with typed parameters
   * elementor.hooks.addFilter('element/css', function(css: string, element: ElementModel): string {
   *   if (element.get('elType') === 'widget') {
   *     css += ' .widget-enhancement { transition: all 0.3s; }';
   *   }
   *   return css;
   * });
   *
   * // Filter with priority and context
   * class CSSEnhancer {
   *   addCustomCSS(css: string, element: ElementModel): string {
   *     return css + this.getCustomStyles(element);
   *   }
   *
   *   getCustomStyles(element: ElementModel): string {
   *     return ' .custom-styles { opacity: 0.9; }';
   *   }
   * }
   *
   * const enhancer = new CSSEnhancer();
   * elementor.hooks.addFilter('element/css', enhancer.addCustomCSS, 15, enhancer);
   *
   * // Complex filter example
   * elementor.hooks.addFilter('controls/section', function(sections, elementType) {
   *   if (elementType === 'heading') {
   *     sections.push({
   *       name: 'custom_section',
   *       label: 'Custom Settings',
   *       controls: {
   *         custom_control: {
   *           type: 'text',
   *           label: 'Custom Property'
   *         }
   *       }
   *     });
   *   }
   *   return sections;
   * });
   * ```
   */
  addFilter<TValue = any, TArgs extends any[] = any[]>(
    filter: ElementorFilterHooks | string,
    callback: ElementorFilterCallback<TValue, TArgs>,
    priority?: number,
    context?: any
  ): string;

  /**
   * Apply filters to a value
   *
   * Pass a value through all registered filter callbacks for the specified filter.
   * Each callback receives the current value and should return the modified value.
   *
   * @param filter - The filter name to apply
   * @param value - The initial value to filter
   * @param args - Additional arguments to pass to filter callbacks
   * @returns The filtered value after all callbacks have been applied
   *
   * @example
   * ```typescript
   * // Apply a filter to modify settings
   * const settings = { color: 'blue' };
   * const filteredSettings = elementor.hooks.applyFilters('widget/settings', settings, widget);
   *
   * // Apply filter with multiple arguments
   * const css = elementor.hooks.applyFilters('element/css', '', element, device);
   * ```
   */
  applyFilters(filter: string, value: any, ...args: any[]): any;

  /**
   * Remove a filter hook
   *
   * Remove a previously registered filter callback by function reference or handler ID.
   *
   * @param filter - The filter name
   * @param callback - Function reference or handler ID to remove
   * @returns True if hook was removed successfully
   */
  removeFilter?(filter: string, callback?: Function | string): boolean;

  /**
   * Check if an action has registered hooks
   *
   * @param action - Action name to check
   * @returns True if action has registered callbacks
   */
  hasAction?(action: string): boolean;

  /**
   * Check if a filter has registered hooks
   *
   * @param filter - Filter name to check
   * @returns True if filter has registered callbacks
   */
  hasFilter?(filter: string): boolean;

  /**
   * Remove all hooks for a specific action
   *
   * @param action - Action name to clear
   * @returns True if any hooks were removed
   */
  removeAllActions?(action: string): boolean;

  /**
   * Remove all hooks for a specific filter
   *
   * @param filter - Filter name to clear
   * @returns True if any hooks were removed
   */
  removeAllFilters?(filter: string): boolean;

  /**
   * Get current hook being executed
   * Useful for conditional logic within hook callbacks
   *
   * @returns Current hook name or null if not in a hook context
   */
  current?(): string | null;

  /**
   * Get hook execution statistics
   * Useful for debugging and performance monitoring
   *
   * @returns Statistics about registered hooks and executions
   */
  getStats?(): {
    totalActions: number;
    totalFilters: number;
    totalHandlers: number;
    executionCounts: Record<string, number>;
  };
}

/**
 * Common Elementor Hook Names
 * Type-safe constants for frequently used hooks
 */
export type ElementorActionHooks =
  // Panel hooks
  | 'panel/open/editor'
  | 'panel/close/editor'
  | 'panel/open/page-settings'
  | 'panel/state/loading'

  // Document hooks
  | 'document/loaded'
  | 'document/save/before'
  | 'document/save/after'
  | 'document/publish'

  // Widget hooks
  | 'widget/render/before'
  | 'widget/render/after'
  | 'widget/edit/before'
  | 'widget/edit/after'
  | 'widget/duplicate'
  | 'widget/delete'

  // Element hooks
  | 'element/before_add'
  | 'element/after_add'
  | 'element/before_remove'
  | 'element/after_remove'

  // Preview hooks
  | 'preview/loaded'
  | 'preview/refresh'
  | 'preview/device_mode/change'

  // General hooks
  | 'editor/loaded'
  | 'editor/init'
  | 'frontend/init'
  | 'frontend/element_ready';

export type ElementorFilterHooks =
  // Settings filters
  | 'widget/settings'
  | 'element/settings'
  | 'page/settings'

  // Content filters
  | 'element/content'
  | 'widget/content'
  | 'section/content'

  // CSS filters
  | 'element/css'
  | 'widget/css'
  | 'global/css'

  // Control filters
  | 'control/value'
  | 'controls/section'

  // General filters
  | 'editor/config'
  | 'frontend/config';

/**
 * Type guard to check if an object is ElementorHooks
 */
export function isElementorHooks(obj: any): obj is ElementorHooks {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'addAction' in obj &&
    'doAction' in obj &&
    'removeAction' in obj &&
    'addFilter' in obj &&
    'applyFilters' in obj &&
    typeof obj.addAction === 'function' &&
    typeof obj.doAction === 'function' &&
    typeof obj.removeAction === 'function' &&
    typeof obj.addFilter === 'function' &&
    typeof obj.applyFilters === 'function'
  );
}