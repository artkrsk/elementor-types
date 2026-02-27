/**
 * Elementor Editor Hooks System
 * Comprehensive TypeScript interfaces for Elementor's WordPress-style hooks system
 * Based on analysis of actual usage patterns in the JavaScript codebase
 */

import type { BackboneView } from "../third-party";
import type { PanelManager } from "./main";

/**
 * Hook callback function with better type constraints
 */
export type HookCallback<T extends readonly unknown[] = readonly unknown[], R = unknown> = (...args: T) => R;

/**
 * Filter callback that must return a value
 */
export type FilterCallback<T = unknown, TArgs extends readonly unknown[] = readonly unknown[]> = (value: T, ...args: TArgs) => T;

/**
 * Action callback that doesn't return a value
 */
export type ActionCallback<TArgs extends readonly unknown[] = readonly unknown[]> = (...args: TArgs) => void;

/**
 * Control definition interface
 */
export interface ControlDefinition {
  name: string;
  label: string;
  type: string;
  default?: any;
  condition?: Record<string, any>;
  selectors?: Record<string, string>;
  responsive?: boolean;
  [key: string]: any;
}

/**
 * Behavior definition interface
 */
export interface BehaviorDefinition {
  name: string;
  callback?: Function;
  options?: Record<string, any>;
}

/**
 * Context menu group interface
 */
export interface ContextMenuGroup {
  name: string;
  label: string;
  actions: ContextMenuAction[];
}

/**
 * Context menu action interface
 */
export interface ContextMenuAction {
  name: string;
  title: string;
  icon?: string;
  callback: Function;
  isEnabled?: () => boolean;
}

/**
 * Edit button interface
 */
export interface EditButton {
  name: string;
  title: string;
  icon: string;
  callback: Function;
  isEnabled?: () => boolean;
}

/**
 * Widget data interface
 */
export interface WidgetData {
  name: string;
  title: string;
  icon: string;
  categories?: string[];
  keywords?: string[];
  [key: string]: any;
}

/**
 * Element view class interface
 */
export interface ElementViewClass {
  new(...args: any[]): BackboneView;
  extend(properties: Record<string, any>): ElementViewClass;
}

/**
 * Element model class interface
 */
export interface ElementModelClass {
  new(...args: any[]): any;
  extend(properties: Record<string, any>): ElementModelClass;
}

/**
 * Region view interface
 */
export interface RegionView {
  name: string;
  view: any;
  options?: Record<string, any>;
}

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
    controls: ControlDefinition[],
    widgetType: string
  ) => ControlDefinition[];
  "elements/widget/controls/common-optimized/default": (
    controls: ControlDefinition[],
    widgetType: string
  ) => ControlDefinition[];
  "elements/widget/controls/common": (
    controls: ControlDefinition[],
    widgetType: string,
    widgetData: WidgetData
  ) => ControlDefinition[];
  "elements/base/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "elements/widget/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "elements/section/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "elements/column/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "elements/container/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "elements/base-section-container/behaviors": (
    behaviors: BehaviorDefinition[],
    view: BackboneView
  ) => BehaviorDefinition[];

  // Context menu filters
  "elements/context-menu/groups": (groups: ContextMenuGroup[], elementType: string) => ContextMenuGroup[];
  "panel/element/contextMenuGroups": (groups: ContextMenuGroup[], view: BackboneView) => ContextMenuGroup[];

  // Edit buttons and UI
  "elements/edit-buttons": (buttons: EditButton[]) => EditButton[];

  // Index signature for dynamic element-specific hooks
  [K: `elements/${string}/contextMenuGroups`]: (
    groups: ContextMenuGroup[],
    view: BackboneView
  ) => ContextMenuGroup[];
  [K: `elements/edit-buttons/${string}`]: (buttons: EditButton[]) => EditButton[];

  // Panel and layout
  "panel/footer/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "panel/header/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "panel/category/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "panel/element/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];
  "panel/elements/regionViews": (regionViews: RegionView[], context: any) => RegionView[];
  "navigator/layout/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];

  // View and model filters
  "element/view": (ViewClass: ElementViewClass, model: any, parent: any) => ElementViewClass;
  "element/model": (ModelClass: ElementModelClass, attributes: Record<string, any>) => ElementModelClass;
  "views/add-section/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];

  // Template library
  "templates/source/is-remote": (isRemote: boolean, source: string) => boolean;
  "elementor/editor/template-library/template/classes": (
    classes: string[],
    view: BackboneView
  ) => string[];
  "elementor/editor/template-library/template/behaviors": (
    behaviors: BehaviorDefinition[],
    view: BackboneView
  ) => BehaviorDefinition[];
  "elementor/editor/template-library/template/action-button": (
    viewId: string,
    templateData: Record<string, any>
  ) => string;

  // Controls and forms
  "controls/base/behaviors": (behaviors: BehaviorDefinition[], view: BackboneView) => BehaviorDefinition[];

  // Utility filters
  "elementor/social_icons/network_name": (
    social: Record<string, any>,
    iconsControl: ControlDefinition,
    fallbackControl: ControlDefinition,
    toUpperCase: boolean,
    withIcon: boolean
  ) => Record<string, any>;
  "editor/style/styleText": (cssText: string, context: any) => string;

  // Frontend filters
  "frontend/handlers/menu_anchor/scroll_top_distance": (
    scrollTop: number
  ) => number;

  // Generic string-based filters (must be compatible with specific hooks above)
  [key: string]: ((...args: any[]) => any);
}

/**
 * Common Elementor action hooks with their expected signatures
 */
export interface ElementorActionHooks {
  // Panel actions
  "panel/open_editor/document": (manager: PanelManager, model?: any, view?: BackboneView) => void;
  "panel/open_editor/section": (manager: PanelManager, model?: any, view?: BackboneView) => void;
  "panel/open_editor/column": (manager: PanelManager, model?: any, view?: BackboneView) => void;
  "panel/open_editor/container": (manager: PanelManager, model?: any, view?: BackboneView) => void;

  // Widget actions
  "panel/widgets/base/controls/wp_widget/loaded": (view: BackboneView) => void;

  // Frontend element ready actions
  "frontend/element_ready/global": (element: JQuery, $: JQueryStatic) => void;

  // Frontend system actions
  "elementor/frontend/documents-manager/init-classes": (manager: any) => void;

  // Specific widget panel actions (using compatible signature)
  "panel/open_editor/widget": (manager: PanelManager, model?: any, view?: BackboneView) => void;

  // Index signatures for dynamic hooks (must come after specific signatures)
  [K: `panel/open_editor/${string}`]: (
    manager: PanelManager,
    model?: any,
    view?: BackboneView
  ) => void;
  [K: `panel/open_editor/${string}/${string}`]: (
    manager: PanelManager,
    model?: any,
    view?: BackboneView
  ) => void;
  [K: `panel/widgets/${string}/controls/wp_widget/loaded`]: (view: BackboneView) => void;
  [K: `frontend/element_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;
  [K: `frontend/element_handler_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;

  // Generic string-based actions (must be compatible with specific hooks above)
  [key: string]: ((...args: any[]) => void);
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

  applyFilters<T = unknown>(filter: string, value: T, ...args: unknown[]): T;

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

  addFilter<T = unknown>(
    filter: string,
    callback: FilterCallback<T>,
    priority?: HookPriority,
    context?: unknown
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
