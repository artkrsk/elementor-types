/**
 * Enhanced Elements Handlers Manager
 * Advanced handler management system that integrates with the new handler registration system
 */

import type { ViewModule } from "../core";
import type {
  HandlerRegistry,
  HandlerManager,
  HandlerRegistrationConfig,
  HandlerLifecycleState,
} from "./handlers/registration";
import type { EnhancedBase } from "./handlers/enhanced-base";

/**
 * Handler module definition for dynamic imports
 */
export interface HandlerModuleDefinition {
  default: typeof EnhancedBase;
  [key: string]: any;
}

/**
 * Handler definition - can be class or dynamic import
 */
export type HandlerDefinition =
  | typeof EnhancedBase
  | (() => Promise<HandlerModuleDefinition>)
  | (() => typeof EnhancedBase);

/**
 * Element handler configuration
 */
export interface ElementHandlerConfig {
  elementName: string;
  skin?: string;
  handlers: HandlerDefinition[];
  conditions?: (element: JQuery<HTMLElement>) => boolean;
  priority?: number;
  experimental?: boolean;
}

/**
 * Handler instance metadata
 */
export interface HandlerInstanceInfo {
  handlerClass: typeof EnhancedBase;
  instance: EnhancedBase;
  elementName: string;
  elementId: string;
  skin?: string;
  createdAt: Date;
  state: HandlerLifecycleState;
}

/**
 * Elements handlers registry
 */
export interface ElementsHandlersRegistry {
  [key: string]: HandlerDefinition | HandlerDefinition[];
}

/**
 * Enhanced Elements Handlers Manager Options
 */
export interface ElementsHandlersManagerOptions {
  registry?: HandlerRegistry;
  autoInit?: boolean;
  enableDynamicLoading?: boolean;
  experimentalFeatures?: Record<string, boolean>;
  delayChildHandlers?: boolean;
}

/**
 * Enhanced Elements Handlers Manager
 * Comprehensive handler management with integration to the new handler system
 */
export declare class EnhancedElementsHandlersManager extends ViewModule {
  // Core properties
  elementsHandlers: ElementsHandlersRegistry;
  handlerInstances: Record<string, Record<string, HandlerInstanceInfo>>;
  registry: HandlerRegistry;
  handlerManager: HandlerManager;

  // Configuration
  options: ElementsHandlersManagerOptions;
  experimentalFeatures: Record<string, boolean>;

  constructor(options?: ElementsHandlersManagerOptions);

  // Handler registration
  registerHandler(
    elementName: string,
    handlerDefinition: HandlerDefinition,
    skin?: string,
    options?: Partial<HandlerRegistrationConfig>
  ): void;

  registerHandlers(configs: ElementHandlerConfig[]): void;

  unregisterHandler(elementName: string, skin?: string): boolean;

  // Handler management
  addHandler(
    HandlerClass: typeof EnhancedBase,
    options: {
      $element: JQuery<HTMLElement>;
      elementName: string;
      skin?: string;
    },
    forceInit?: boolean
  ): EnhancedBase | null;

  removeHandler(elementId: string, handlerName: string): boolean;

  attachHandler(
    elementName: string,
    handlers: HandlerDefinition | HandlerDefinition[],
    skin?: string
  ): void;

  // Handler retrieval
  getHandler(handlerName: string): Promise<typeof EnhancedBase>;

  getHandlerInstance(
    elementId: string,
    handlerName: string
  ): EnhancedBase | null;

  getHandlerInstances(elementId?: string): HandlerInstanceInfo[];

  hasHandler(handlerName: string): boolean;

  // Element processing
  runReadyTrigger(scope: HTMLElement | JQuery<HTMLElement>): void;

  processElement($element: JQuery<HTMLElement>): void;

  processElements($elements: JQuery<HTMLElement>): void;

  // Lifecycle management
  init(): void;

  destroy(): void;

  refresh(): void;

  refreshElement(elementId: string): void;

  // Dynamic loading
  loadDynamicHandler(
    handlerDefinition: () => Promise<HandlerModuleDefinition>
  ): Promise<typeof EnhancedBase>;

  preloadHandlers(handlerNames: string[]): Promise<void>;

  // Element type detection
  getElementType($element: JQuery<HTMLElement>): string | null;

  getWidgetType($element: JQuery<HTMLElement>): string | null;

  getElementSkin($element: JQuery<HTMLElement>): string | null;

  // Handler execution
  executeHandlerForElement(
    $element: JQuery<HTMLElement>,
    elementType: string
  ): void;

  executeGlobalHandlers($element: JQuery<HTMLElement>): void;

  executeWidgetHandlers(
    $element: JQuery<HTMLElement>,
    widgetType: string
  ): void;

  // Experimental features
  isExperimentalFeatureEnabled(featureName: string): boolean;

  enableExperimentalFeature(featureName: string): void;

  disableExperimentalFeature(featureName: string): void;

  // Performance optimization
  optimizeHandlerExecution(): void;

  batchProcessElements($elements: JQuery<HTMLElement>): void;

  throttleHandlerExecution(delay: number): void;

  // Debugging and introspection
  getHandlerInfo(handlerName: string): HandlerRegistrationConfig | null;

  getActiveHandlers(): string[];

  validateHandlers(): {
    valid: string[];
    invalid: string[];
    errors: Record<string, Error>;
  };

  getPerformanceMetrics(): {
    totalHandlers: number;
    activeInstances: number;
    loadTime: number;
    executionTime: number;
  };

  // Event system integration
  bindElementEvents($element: JQuery<HTMLElement>): void;

  unbindElementEvents($element: JQuery<HTMLElement>): void;

  onElementReady(
    callback: (elementType: string, $element: JQuery<HTMLElement>) => void
  ): void;

  onHandlerReady(
    callback: (handlerName: string, instance: EnhancedBase) => void
  ): void;

  // Conditions and filters
  shouldProcessElement($element: JQuery<HTMLElement>): boolean;

  shouldDelayChildHandlers($element: JQuery<HTMLElement>): boolean;

  filterHandlersByConditions(
    handlers: HandlerDefinition[],
    $element: JQuery<HTMLElement>
  ): HandlerDefinition[];
}

/**
 * Elements handlers factory
 */
export interface ElementsHandlersFactory {
  createManager(
    options?: ElementsHandlersManagerOptions
  ): EnhancedElementsHandlersManager;

  createHandlerConfig(
    elementName: string,
    handlerClass: typeof EnhancedBase,
    options?: Partial<ElementHandlerConfig>
  ): ElementHandlerConfig;

  registerBuiltInHandlers(manager: EnhancedElementsHandlersManager): void;

  registerExperimentalHandlers(
    manager: EnhancedElementsHandlersManager,
    features: Record<string, boolean>
  ): void;
}

/**
 * Built-in handler definitions
 */
export interface BuiltInHandlers {
  // Widget handlers
  "accordion.default": () => Promise<HandlerModuleDefinition>;
  "alert.default": () => Promise<HandlerModuleDefinition>;
  "counter.default": () => Promise<HandlerModuleDefinition>;
  "progress.default": () => Promise<HandlerModuleDefinition>;
  "tabs.default": () => Promise<HandlerModuleDefinition>;
  "toggle.default": () => Promise<HandlerModuleDefinition>;
  "video.default": () => Promise<HandlerModuleDefinition>;
  "image-carousel.default": () => Promise<HandlerModuleDefinition>;
  "text-editor.default": () => Promise<HandlerModuleDefinition>;
  "wp-widget-media_audio.default": () => Promise<HandlerModuleDefinition>;

  // Layout handlers
  container: typeof EnhancedBase;
  section: typeof EnhancedBase;
  column: typeof EnhancedBase;

  // Global handler
  global: typeof EnhancedBase;
}

/**
 * Experimental handler definitions
 */
export interface ExperimentalHandlers {
  "nested-tabs.default"?: () => Promise<HandlerModuleDefinition>;
  "nested-accordion.default"?: () => Promise<HandlerModuleDefinition>;
  "contact-buttons.default"?: () => Promise<HandlerModuleDefinition>;
  "floating-bars-var-1.default"?: () => Promise<HandlerModuleDefinition>;
}

/**
 * Handler execution context
 */
export interface HandlerExecutionContext {
  $element: JQuery<HTMLElement>;
  elementType: string;
  widgetType?: string;
  skin?: string;
  isEdit: boolean;
  isStatic: boolean;
  shouldDelay: boolean;
  experimentalFeatures: Record<string, boolean>;
}

/**
 * Handler execution result
 */
export interface HandlerExecutionResult {
  success: boolean;
  handlerName: string;
  executionTime: number;
  instance?: EnhancedBase;
  error?: Error;
}

/**
 * Handler batch execution options
 */
export interface BatchExecutionOptions {
  batchSize?: number;
  delay?: number;
  priority?: "high" | "normal" | "low";
  abortOnError?: boolean;
}

/**
 * Handler performance monitor
 */
export interface HandlerPerformanceMonitor {
  metrics: {
    handlersRegistered: number;
    handlersLoaded: number;
    instancesCreated: number;
    totalExecutionTime: number;
    averageExecutionTime: number;
    errors: number;
  };

  startTiming(operation: string): void;
  endTiming(operation: string): number;
  recordExecution(
    handlerName: string,
    executionTime: number,
    success: boolean
  ): void;
  getMetrics(): Record<string, any>;
  reset(): void;
}

/**
 * Handler loading strategy
 */
export interface HandlerLoadingStrategy {
  eager: string[]; // Load immediately
  lazy: string[]; // Load when needed
  preload: string[]; // Preload in background
  conditional: Record<string, () => boolean>; // Load based on conditions
}

/**
 * Advanced handler manager with comprehensive functionality
 */
export interface AdvancedHandlerManager {
  manager: EnhancedElementsHandlersManager;
  factory: ElementsHandlersFactory;
  monitor: HandlerPerformanceMonitor;
  strategy: HandlerLoadingStrategy;

  // High-level operations
  init(config?: ElementsHandlersManagerOptions): void;
  processPage(): void;
  processSection($section: JQuery<HTMLElement>): void;
  optimizePerformance(): void;

  // Handler management
  registerHandler(config: ElementHandlerConfig): void;
  loadHandler(handlerName: string): Promise<typeof EnhancedBase>;
  executeHandler(
    handlerName: string,
    $element: JQuery<HTMLElement>
  ): Promise<HandlerExecutionResult>;

  // Batch operations
  batchRegister(configs: ElementHandlerConfig[]): void;
  batchExecute(
    $elements: JQuery<HTMLElement>,
    options?: BatchExecutionOptions
  ): Promise<HandlerExecutionResult[]>;

  // Monitoring and debugging
  getStatus(): {
    registered: number;
    loaded: number;
    active: number;
    errors: number;
  };

  debugHandler(handlerName: string): {
    isRegistered: boolean;
    isLoaded: boolean;
    instances: number;
    lastError?: Error;
  };
}

/**
 * Global handlers manager interface
 */
export interface GlobalHandlersManager extends AdvancedHandlerManager {
  // Integration with elementorFrontend
  attachToElementorFrontend(): void;

  // Element observation
  observeElements(): void;
  stopObserving(): void;

  // Hook integration
  bindHooks(): void;
  unbindHooks(): void;

  // Compatibility
  getCompatibilityLayer(): {
    addHandler: (HandlerClass: any, options: any) => void;
    getHandler: (handlerName: string) => Promise<any>;
    runReadyTrigger: (scope: any) => void;
  };
}
