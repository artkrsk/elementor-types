/**
 * Events System
 * Advanced event handling utilities for Elementor
 */

import { Module } from "../core";

/**
 * Event listener configuration
 */
export interface EventListenerConfig {
  once?: boolean;
  passive?: boolean;
  capture?: boolean;
  priority?: number;
  context?: any;
  namespace?: string;
}

/**
 * Event handler wrapper
 */
export interface EventHandler {
  callback: Function;
  config: EventListenerConfig;
  id: string;
}

/**
 * Event dispatcher interface
 */
export interface EventDispatcher {
  /**
   * Add event listener
   */
  on(event: string, callback: Function, config?: EventListenerConfig): string;

  /**
   * Remove event listener
   */
  off(event: string, handlerId?: string): boolean;

  /**
   * Add one-time event listener
   */
  once(event: string, callback: Function, config?: EventListenerConfig): string;

  /**
   * Emit event
   */
  emit(event: string, ...args: any[]): boolean;

  /**
   * Get all listeners for an event
   */
  getListeners(event: string): EventHandler[];

  /**
   * Remove all listeners
   */
  removeAllListeners(event?: string): void;

  /**
   * Check if event has listeners
   */
  hasListeners(event: string): boolean;
}

/**
 * Enhanced Events system for dispatching custom events and managing event listeners
 */
export declare class Events extends Module {
  /** Internal event storage */
  private eventListeners: Map<string, EventHandler[]>;

  /** Event ID counter */
  private eventIdCounter: number;

  /**
   * Static method to create a new Events instance
   */
  static create(): Events;

  /**
   * Static method to get global events instance
   */
  static getInstance(): Events;

  /**
   * Dispatch a custom event on a context element
   * Enhanced with better jQuery support and backwards compatibility
   *
   * @param context - Element or jQuery element to dispatch event on
   * @param event - Event name, supports namespacing (e.g., 'custom:event')
   * @param data - Event data payload
   * @param bcEvent - Backwards compatibility event parameter (optional)
   */
  dispatch(
    context: HTMLElement | JQuery<HTMLElement>,
    event: string,
    data?: any,
    bcEvent?: any
  ): void;

  /**
   * Enhanced jQuery event binding with namespace support
   *
   * @param context - jQuery element to bind events on
   * @param events - Event string or object mapping events to handlers
   * @param handler - Event handler function (when events is string)
   * @param namespace - Optional namespace for event cleanup
   */
  bindEvents(
    context: JQuery<HTMLElement>,
    events: string | Record<string, Function>,
    handler?: Function,
    namespace?: string
  ): void;

  /**
   * Enhanced jQuery event unbinding with namespace support
   */
  unbindEvents(
    context: JQuery<HTMLElement>,
    events?: string,
    namespace?: string
  ): void;

  /**
   * Add event listener with advanced configuration
   */
  addEventListener(
    event: string,
    callback: Function,
    config?: EventListenerConfig
  ): string;

  /**
   * Remove event listener by ID or all listeners for event
   */
  removeEventListener(event: string, handlerId?: string): boolean;

  /**
   * Add one-time event listener
   */
  once(event: string, callback: Function, config?: EventListenerConfig): string;

  /**
   * Emit event to all registered listeners
   */
  emit(event: string, ...args: any[]): boolean;

  /**
   * Get all listeners for an event
   */
  getListeners(event: string): EventHandler[];

  /**
   * Remove all listeners for an event or all events
   */
  removeAllListeners(event?: string): void;

  /**
   * Check if event has listeners
   */
  hasListeners(event: string): boolean;

  /**
   * Create namespaced event dispatcher
   */
  createNamespace(namespace: string): EventDispatcher;

  /**
   * Event delegation for dynamic elements
   */
  delegate(
    selector: string,
    event: string,
    callback: Function,
    config?: EventListenerConfig
  ): string;

  /**
   * Remove delegated event listener
   */
  undelegate(selector: string, event?: string, handlerId?: string): boolean;

  /**
   * Throttle event emissions
   */
  throttle(event: string, delay: number): void;

  /**
   * Debounce event emissions
   */
  debounce(event: string, delay: number): void;

  /**
   * Event analytics and debugging
   */
  getEventStats(): {
    totalEvents: number;
    totalListeners: number;
    eventCounts: Record<string, number>;
    memoryUsage: number;
  };

  /**
   * Performance monitoring for event system
   */
  enablePerformanceMonitoring(enabled: boolean): void;

  /**
   * Event middleware system
   */
  addMiddleware(
    middleware: (event: string, args: any[], next: Function) => void
  ): void;

  /**
   * Remove middleware
   */
  removeMiddleware(middleware: Function): void;
}
