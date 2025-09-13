/**
 * Handler Registration System and Lifecycle Management
 * Comprehensive system for registering, managing, and lifecycle handling of frontend widgets
 */

import type {
  ElementorWidgetHandlers,
  WidgetHandlerRegistration,
  WidgetHandlerEvents,
} from "./widget-interfaces";
import type { EnhancedBase } from "./enhanced-base";

/**
 * Handler lifecycle state enum
 */
export enum HandlerLifecycleState {
  UNINITIALIZED = "uninitialized",
  INITIALIZING = "initializing",
  INITIALIZED = "initialized",
  READY = "ready",
  DESTROYING = "destroying",
  DESTROYED = "destroyed",
  ERROR = "error",
}

/**
 * Handler registration configuration
 */
export interface HandlerRegistrationConfig {
  widgetType: string;
  handlerClass: typeof EnhancedBase;
  priority?: number;
  conditions?: (settings: any, element?: JQuery<HTMLElement>) => boolean;
  dependencies?: string[];
  autoInit?: boolean;
  selector?: string;
  scope?: "global" | "widget" | "section" | "column";
}

/**
 * Handler instance metadata
 */
export interface HandlerInstanceMetadata {
  id: string;
  widgetType: string;
  handlerClass: typeof EnhancedBase;
  state: HandlerLifecycleState;
  $element: JQuery<HTMLElement>;
  settings: any;
  createdAt: Date;
  lastUpdated: Date;
  errors?: Error[];
}

/**
 * Handler lifecycle hooks
 */
export interface HandlerLifecycleHooks {
  beforeInit?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  afterInit?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  beforeReady?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  afterReady?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  beforeDestroy?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  afterDestroy?: (
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void | Promise<void>;
  onError?: (
    error: Error,
    handler: EnhancedBase,
    metadata: HandlerInstanceMetadata
  ) => void;
  onStateChange?: (
    oldState: HandlerLifecycleState,
    newState: HandlerLifecycleState,
    metadata: HandlerInstanceMetadata
  ) => void;
}

/**
 * Handler Registry - Central registry for all handler types
 */
export class HandlerRegistry {
  private static instance: HandlerRegistry;
  private registrations = new Map<string, HandlerRegistrationConfig>();
  private instances = new Map<
    string,
    { handler: EnhancedBase; metadata: HandlerInstanceMetadata }
  >();
  private hooks: HandlerLifecycleHooks = {};
  private eventListeners = new Map<string, Function[]>();

  static getInstance(): HandlerRegistry {
    if (!HandlerRegistry.instance) {
      HandlerRegistry.instance = new HandlerRegistry();
    }
    return HandlerRegistry.instance;
  }

  private constructor() {
    this.setupDefaultHandlers();
  }

  /**
   * Register a handler for a specific widget type
   */
  register(config: HandlerRegistrationConfig): void {
    const { widgetType } = config;

    if (this.registrations.has(widgetType)) {
      console.warn(
        `Handler for widget type "${widgetType}" is already registered. Overwriting...`
      );
    }

    this.registrations.set(widgetType, {
      priority: 0,
      autoInit: true,
      scope: "widget",
      ...config,
    });

    this.emit("handlerRegistered", { widgetType, config });
  }

  /**
   * Unregister a handler
   */
  unregister(widgetType: string): boolean {
    const success = this.registrations.delete(widgetType);
    if (success) {
      this.emit("handlerUnregistered", { widgetType });
    }
    return success;
  }

  /**
   * Get registered handler configuration
   */
  getRegistration(widgetType: string): HandlerRegistrationConfig | undefined {
    return this.registrations.get(widgetType);
  }

  /**
   * Get all registered handler types
   */
  getRegisteredTypes(): string[] {
    return Array.from(this.registrations.keys());
  }

  /**
   * Create handler instance for element
   */
  async createHandler(
    widgetType: string,
    $element: JQuery<HTMLElement>,
    settings: any = {}
  ): Promise<EnhancedBase | null> {
    const registration = this.registrations.get(widgetType);
    if (!registration) {
      console.warn(`No handler registered for widget type: ${widgetType}`);
      return null;
    }

    // Check conditions
    if (
      registration.conditions &&
      !registration.conditions(settings, $element)
    ) {
      return null;
    }

    // Generate unique instance ID
    const instanceId = this.generateInstanceId(widgetType, $element);

    // Check if instance already exists
    if (this.instances.has(instanceId)) {
      console.warn(
        `Handler instance already exists for element: ${instanceId}`
      );
      return this.instances.get(instanceId)!.handler;
    }

    try {
      // Create metadata
      const metadata: HandlerInstanceMetadata = {
        id: instanceId,
        widgetType,
        handlerClass: registration.handlerClass,
        state: HandlerLifecycleState.UNINITIALIZED,
        $element,
        settings,
        createdAt: new Date(),
        lastUpdated: new Date(),
        errors: [],
      };

      // Create handler instance
      const handler = new registration.handlerClass({ $element });

      // Store instance
      this.instances.set(instanceId, { handler, metadata });

      // Initialize if auto-init is enabled
      if (registration.autoInit) {
        await this.initializeHandler(instanceId);
      }

      this.emit("handlerCreated", { handler, metadata });
      return handler;
    } catch (error) {
      console.error(`Failed to create handler for ${widgetType}:`, error);
      this.emit("handlerError", { error, widgetType, $element });
      return null;
    }
  }

  /**
   * Initialize handler instance
   */
  async initializeHandler(instanceId: string): Promise<boolean> {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      console.warn(`Handler instance not found: ${instanceId}`);
      return false;
    }

    const { handler, metadata } = instance;

    try {
      // Update state
      await this.updateHandlerState(
        instanceId,
        HandlerLifecycleState.INITIALIZING
      );

      // Execute beforeInit hook
      if (this.hooks.beforeInit) {
        await this.hooks.beforeInit(handler, metadata);
      }

      // Initialize handler
      if (typeof handler.onInit === "function") {
        handler.onInit();
      }

      // Update state
      await this.updateHandlerState(
        instanceId,
        HandlerLifecycleState.INITIALIZED
      );

      // Execute afterInit hook
      if (this.hooks.afterInit) {
        await this.hooks.afterInit(handler, metadata);
      }

      // Mark as ready
      await this.updateHandlerState(instanceId, HandlerLifecycleState.READY);

      // Execute afterReady hook
      if (this.hooks.afterReady) {
        await this.hooks.afterReady(handler, metadata);
      }

      this.emit("handlerInitialized", { handler, metadata });
      return true;
    } catch (error) {
      console.error(`Failed to initialize handler ${instanceId}:`, error);
      metadata.errors?.push(error as Error);
      await this.updateHandlerState(instanceId, HandlerLifecycleState.ERROR);

      if (this.hooks.onError) {
        this.hooks.onError(error as Error, handler, metadata);
      }

      this.emit("handlerError", { error, handler, metadata });
      return false;
    }
  }

  /**
   * Destroy handler instance
   */
  async destroyHandler(instanceId: string): Promise<boolean> {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      console.warn(`Handler instance not found: ${instanceId}`);
      return false;
    }

    const { handler, metadata } = instance;

    try {
      // Update state
      await this.updateHandlerState(
        instanceId,
        HandlerLifecycleState.DESTROYING
      );

      // Execute beforeDestroy hook
      if (this.hooks.beforeDestroy) {
        await this.hooks.beforeDestroy(handler, metadata);
      }

      // Destroy handler
      if (typeof handler.onDestroy === "function") {
        handler.onDestroy();
      }

      // Execute afterDestroy hook
      if (this.hooks.afterDestroy) {
        await this.hooks.afterDestroy(handler, metadata);
      }

      // Update state
      await this.updateHandlerState(
        instanceId,
        HandlerLifecycleState.DESTROYED
      );

      // Remove from registry
      this.instances.delete(instanceId);

      this.emit("handlerDestroyed", { handler, metadata });
      return true;
    } catch (error) {
      console.error(`Failed to destroy handler ${instanceId}:`, error);
      metadata.errors?.push(error as Error);

      if (this.hooks.onError) {
        this.hooks.onError(error as Error, handler, metadata);
      }

      this.emit("handlerError", { error, handler, metadata });
      return false;
    }
  }

  /**
   * Get handler instance by ID
   */
  getInstance(instanceId: string): EnhancedBase | null {
    const instance = this.instances.get(instanceId);
    return instance ? instance.handler : null;
  }

  /**
   * Get handler metadata
   */
  getMetadata(instanceId: string): HandlerInstanceMetadata | null {
    const instance = this.instances.get(instanceId);
    return instance ? instance.metadata : null;
  }

  /**
   * Get all active instances
   */
  getAllInstances(): {
    handler: EnhancedBase;
    metadata: HandlerInstanceMetadata;
  }[] {
    return Array.from(this.instances.values());
  }

  /**
   * Get instances by widget type
   */
  getInstancesByType(
    widgetType: string
  ): { handler: EnhancedBase; metadata: HandlerInstanceMetadata }[] {
    return Array.from(this.instances.values()).filter(
      (instance) => instance.metadata.widgetType === widgetType
    );
  }

  /**
   * Get instances by state
   */
  getInstancesByState(
    state: HandlerLifecycleState
  ): { handler: EnhancedBase; metadata: HandlerInstanceMetadata }[] {
    return Array.from(this.instances.values()).filter(
      (instance) => instance.metadata.state === state
    );
  }

  /**
   * Set lifecycle hooks
   */
  setLifecycleHooks(hooks: Partial<HandlerLifecycleHooks>): void {
    this.hooks = { ...this.hooks, ...hooks };
  }

  /**
   * Update handler state
   */
  private async updateHandlerState(
    instanceId: string,
    newState: HandlerLifecycleState
  ): Promise<void> {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    const oldState = instance.metadata.state;
    instance.metadata.state = newState;
    instance.metadata.lastUpdated = new Date();

    if (this.hooks.onStateChange) {
      this.hooks.onStateChange(oldState, newState, instance.metadata);
    }

    this.emit("stateChange", {
      instanceId,
      oldState,
      newState,
      metadata: instance.metadata,
    });
  }

  /**
   * Generate unique instance ID
   */
  private generateInstanceId(
    widgetType: string,
    $element: JQuery<HTMLElement>
  ): string {
    const elementId = $element.attr("id") || $element.data("id") || "";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${widgetType}_${elementId}_${timestamp}_${random}`;
  }

  /**
   * Setup default Elementor handlers
   */
  private setupDefaultHandlers(): void {
    // This would register all the built-in Elementor handlers
    // Implementation would come from analyzing the actual Elementor codebase

    // Example registrations (these would be expanded based on actual Elementor widgets)
    const defaultHandlers = [
      { widgetType: "accordion", handlerClass: "AccordionHandler" },
      { widgetType: "tabs", handlerClass: "TabsHandler" },
      { widgetType: "toggle", handlerClass: "ToggleHandler" },
      { widgetType: "video", handlerClass: "VideoHandler" },
      { widgetType: "counter", handlerClass: "CounterHandler" },
      { widgetType: "progress", handlerClass: "ProgressHandler" },
      { widgetType: "alert", handlerClass: "AlertHandler" },
      { widgetType: "image-carousel", handlerClass: "ImageCarouselHandler" },
      { widgetType: "text-editor", handlerClass: "TextEditorHandler" },
    ];

    // Note: Actual registration would require the handler classes to be imported
    // This is a placeholder for the registration pattern
  }

  /**
   * Event system for handler lifecycle events
   */
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Cleanup and destroy all handlers
   */
  async cleanup(): Promise<void> {
    const instances = Array.from(this.instances.keys());
    await Promise.all(instances.map((id) => this.destroyHandler(id)));
    this.registrations.clear();
    this.eventListeners.clear();
    this.hooks = {};
  }
}

/**
 * Handler Manager - High-level interface for handler management
 */
export class HandlerManager {
  private registry: HandlerRegistry;
  private elementObserver?: MutationObserver;
  private isObserving = false;

  constructor() {
    this.registry = HandlerRegistry.getInstance();
    this.setupElementObserver();
  }

  /**
   * Initialize handler management
   */
  initialize(): void {
    if (!this.isObserving) {
      this.startObserving();
      this.scanExistingElements();
    }
  }

  /**
   * Scan existing elements and create handlers
   */
  scanExistingElements(): void {
    // Scan for elements with data-widget_type attribute
    jQuery("[data-widget_type]").each((index, element) => {
      const $element = jQuery(element);
      const widgetType = $element.data("widget_type");

      if (widgetType) {
        this.createHandlerForElement($element, widgetType);
      }
    });
  }

  /**
   * Create handler for specific element
   */
  async createHandlerForElement(
    $element: JQuery<HTMLElement>,
    widgetType?: string
  ): Promise<EnhancedBase | null> {
    const type = widgetType || $element.data("widget_type");
    if (!type) return null;

    const settings = $element.data("settings") || {};
    return await this.registry.createHandler(type, $element, settings);
  }

  /**
   * Register new handler type
   */
  registerHandler(config: HandlerRegistrationConfig): void {
    this.registry.register(config);
  }

  /**
   * Get handler for element
   */
  getHandlerForElement($element: JQuery<HTMLElement>): EnhancedBase | null {
    // Find handler by element
    const instances = this.registry.getAllInstances();
    const instance = instances.find((inst) =>
      inst.metadata.$element.is($element)
    );
    return instance ? instance.handler : null;
  }

  /**
   * Refresh handlers (useful after settings changes)
   */
  async refreshHandlers(widgetType?: string): Promise<void> {
    const instances = widgetType
      ? this.registry.getInstancesByType(widgetType)
      : this.registry.getAllInstances();

    for (const { handler, metadata } of instances) {
      // Re-initialize handler
      if (typeof handler.onDestroy === "function") {
        handler.onDestroy();
      }
      if (typeof handler.onInit === "function") {
        handler.onInit();
      }
    }
  }

  /**
   * Setup DOM mutation observer to automatically handle new elements
   */
  private setupElementObserver(): void {
    if (!window.MutationObserver) return;

    this.elementObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const $element = jQuery(node as HTMLElement);

              // Check if the element itself has a widget type
              const widgetType = $element.data("widget_type");
              if (widgetType) {
                this.createHandlerForElement($element, widgetType);
              }

              // Check for child elements with widget types
              $element.find("[data-widget_type]").each((index, child) => {
                const $child = jQuery(child as HTMLElement);
                const childWidgetType = $child.data("widget_type");
                if (childWidgetType) {
                  this.createHandlerForElement($child, childWidgetType);
                }
              });
            }
          });
        }
      });
    });
  }

  /**
   * Start observing DOM changes
   */
  startObserving(): void {
    if (this.elementObserver && !this.isObserving) {
      this.elementObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      this.isObserving = true;
    }
  }

  /**
   * Stop observing DOM changes
   */
  stopObserving(): void {
    if (this.elementObserver && this.isObserving) {
      this.elementObserver.disconnect();
      this.isObserving = false;
    }
  }

  /**
   * Cleanup and destroy manager
   */
  async destroy(): Promise<void> {
    this.stopObserving();
    await this.registry.cleanup();
  }
}

/**
 * Global handler manager instance
 */
export const handlerManager = new HandlerManager();

/**
 * Utility functions for handler integration
 */
export const HandlerUtils = {
  /**
   * Register handler with simplified syntax
   */
  register(
    widgetType: string,
    handlerClass: typeof EnhancedBase,
    options: Partial<HandlerRegistrationConfig> = {}
  ): void {
    handlerManager.registerHandler({
      widgetType,
      handlerClass,
      ...options,
    });
  },

  /**
   * Create handler for jQuery element
   */
  async create(
    $element: JQuery<HTMLElement>,
    widgetType?: string
  ): Promise<EnhancedBase | null> {
    return await handlerManager.createHandlerForElement($element, widgetType);
  },

  /**
   * Get handler for jQuery element
   */
  get($element: JQuery<HTMLElement>): EnhancedBase | null {
    return handlerManager.getHandlerForElement($element);
  },

  /**
   * Initialize handler system
   */
  init(): void {
    handlerManager.initialize();
  },

  /**
   * Refresh all handlers or handlers of specific type
   */
  async refresh(widgetType?: string): Promise<void> {
    return await handlerManager.refreshHandlers(widgetType);
  },
};

/**
 * Handler registry singleton accessor
 */
export const getHandlerRegistry = (): HandlerRegistry => {
  return HandlerRegistry.getInstance();
};
