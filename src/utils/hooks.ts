/**
 * Hooks System
 * Advanced action and filter hooks for Elementor with priority management and middleware
 */

import { Module } from "../core";

/**
 * Hook configuration options
 */
export interface HookConfig {
  priority?: number;
  acceptedArgs?: number;
  context?: any;
  once?: boolean;
  namespace?: string;
}

/**
 * Hook handler interface
 */
export interface HookHandler {
  callback: Function;
  priority: number;
  acceptedArgs: number;
  context?: any;
  once: boolean;
  id: string;
  namespace?: string;
}

/**
 * Hook middleware function
 */
export type HookMiddleware = (
  hookName: string,
  args: any[],
  handlers: HookHandler[],
  next: Function
) => void;

/**
 * Advanced Hooks system for actions and filters with priority management
 */
export declare class Hooks extends Module {
  /** Action hooks storage */
  actions: Map<string, HookHandler[]>;

  /** Filter hooks storage */
  filters: Map<string, HookHandler[]>;

  /** Middleware stack */
  private middleware: HookMiddleware[];

  /** Hook ID counter */
  private hookIdCounter: number;

  /**
   * Add an action hook with priority and configuration
   */
  addAction(
    action: string,
    callback: Function,
    priority?: number,
    config?: HookConfig
  ): string;

  /**
   * Remove an action hook by callback or ID
   */
  removeAction(action: string, callbackOrId: Function | string): boolean;

  /**
   * Execute an action hook with middleware support
   */
  doAction(action: string, ...args: any[]): void;

  /**
   * Add a filter hook with priority and configuration
   */
  addFilter(
    filter: string,
    callback: Function,
    priority?: number,
    config?: HookConfig
  ): string;

  /**
   * Remove a filter hook by callback or ID
   */
  removeFilter(filter: string, callbackOrId: Function | string): boolean;

  /**
   * Apply filters to a value with middleware support
   */
  applyFilters(filter: string, value: any, ...args: any[]): any;

  /**
   * Check if action has hooks
   */
  hasAction(action: string): boolean;

  /**
   * Check if filter has hooks
   */
  hasFilter(filter: string): boolean;

  /**
   * Get all handlers for an action
   */
  getActionHandlers(action: string): HookHandler[];

  /**
   * Get all handlers for a filter
   */
  getFilterHandlers(filter: string): HookHandler[];

  /**
   * Remove all hooks for an action
   */
  removeAllActions(action: string): boolean;

  /**
   * Remove all hooks for a filter
   */
  removeAllFilters(filter: string): boolean;

  /**
   * Add middleware to the hook system
   */
  addMiddleware(middleware: HookMiddleware): void;

  /**
   * Remove middleware from the hook system
   */
  removeMiddleware(middleware: HookMiddleware): boolean;

  /**
   * Create namespaced hooks manager
   */
  createNamespace(namespace: string): NamespacedHooks;

  /**
   * Get hook statistics
   */
  getStats(): {
    totalActions: number;
    totalFilters: number;
    totalHandlers: number;
    actionCounts: Record<string, number>;
    filterCounts: Record<string, number>;
  };

  /**
   * Enable performance monitoring
   */
  enablePerformanceMonitoring(enabled: boolean): void;

  /**
   * Debug hooks system
   */
  debug(enabled: boolean): void;

  /**
   * Clear all hooks
   */
  clearAll(): void;
}

/**
 * Namespaced hooks manager
 */
export interface NamespacedHooks {
  addAction(action: string, callback: Function, priority?: number): string;
  removeAction(action: string, callbackOrId: Function | string): boolean;
  doAction(action: string, ...args: any[]): void;
  addFilter(filter: string, callback: Function, priority?: number): string;
  removeFilter(filter: string, callbackOrId: Function | string): boolean;
  applyFilters(filter: string, value: any, ...args: any[]): any;
  clearAll(): void;
}
