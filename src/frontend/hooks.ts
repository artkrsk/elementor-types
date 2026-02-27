/**
 * Elementor Frontend Hooks System
 * TypeScript interfaces for frontend-specific hooks
 */

import type {
  ElementorHooks,
  ActionCallback,
  FilterCallback,
  HookPriority,
} from "../editor/hooks";

/**
 * Frontend-specific filter hooks
 */
export interface ElementorFrontendFilterHooks {
  "frontend/handlers/menu_anchor/scroll_top_distance": (
    scrollTop: number
  ) => number;

  [key: string]: (...args: any[]) => any;
}

/**
 * Frontend-specific action hooks
 */
export interface ElementorFrontendActionHooks {
  "frontend/element_ready/global": (element: JQuery, $: JQueryStatic) => void;
  "elementor/frontend/documents-manager/init-classes": (manager: any) => void;

  [K: `frontend/element_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;
  [K: `frontend/element_handler_ready/${string}`]: (
    element: JQuery,
    $: JQueryStatic
  ) => void;

  [key: string]: (...args: any[]) => void;
}

/**
 * Frontend hooks system interface
 */
export interface ElementorFrontendHooks extends ElementorHooks {
  /**
   * Apply frontend filters
   */
  applyFilters<K extends keyof ElementorFrontendFilterHooks>(
    filter: K,
    value: Parameters<ElementorFrontendFilterHooks[K]>[0],
    ...args: any[]
  ): ReturnType<ElementorFrontendFilterHooks[K]>;

  applyFilters<T = any>(filter: string, value: T, ...args: any[]): T;

  /**
   * Add frontend filter callback
   */
  addFilter<K extends keyof ElementorFrontendFilterHooks>(
    filter: K,
    callback: ElementorFrontendFilterHooks[K],
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
   * Execute frontend action hooks
   */
  doAction<K extends keyof ElementorFrontendActionHooks>(
    action: K,
    ...args: Parameters<ElementorFrontendActionHooks[K]>
  ): void;

  doAction(action: string, ...args: any[]): void;

  /**
   * Add frontend action callback
   */
  addAction<K extends keyof ElementorFrontendActionHooks>(
    action: K,
    callback: ElementorFrontendActionHooks[K],
    priority?: HookPriority,
    context?: any
  ): void;

  addAction(
    action: string,
    callback: ActionCallback,
    priority?: HookPriority,
    context?: any
  ): void;
}

export default ElementorFrontendHooks;
