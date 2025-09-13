/**
 * Enhanced Frontend Utilities and Configuration
 * Comprehensive utilities for frontend functionality, performance optimization, and configuration management
 */

import type { ElementorFrontendConfig } from "./config";

/**
 * Performance optimization configuration
 */
export interface FrontendPerformanceConfig {
  // Handler optimization
  handlerBatching: {
    enabled: boolean;
    batchSize: number;
    delay: number;
  };

  // Asset loading optimization
  assetLoading: {
    preload: string[];
    defer: string[];
    async: string[];
    critical: string[];
  };

  // DOM optimization
  domOptimization: {
    enableVirtualScrolling: boolean;
    enableIntersectionObserver: boolean;
    enableRequestIdleCallback: boolean;
    throttleResize: number;
    throttleScroll: number;
  };

  // Memory management
  memoryManagement: {
    autoCleanup: boolean;
    cleanupInterval: number;
    maxInactiveHandlers: number;
  };

  // Debugging
  debugging: {
    enablePerformanceLogging: boolean;
    enableHandlerTracing: boolean;
    logLevel: "error" | "warn" | "info" | "debug";
  };
}

/**
 * Enhanced responsive configuration
 */
export interface EnhancedResponsiveConfig {
  // Standard breakpoints
  breakpoints: Record<
    string,
    {
      label: string;
      value: number;
      default_value: number;
      direction: "min" | "max";
      is_enabled: boolean;
      is_custom?: boolean;
    }
  >;

  // Active breakpoints (subset of breakpoints that are enabled)
  activeBreakpoints: Record<
    string,
    {
      label: string;
      value: number;
      default_value: number;
      direction: "min" | "max";
      is_enabled: boolean;
    }
  >;

  // Responsive behavior settings
  behavior: {
    smoothTransitions: boolean;
    transitionDuration: number;
    enableMediaQueries: boolean;
    enableContainerQueries: boolean;
  };

  // Advanced responsive features
  advanced: {
    fluidTypography: boolean;
    aspectRatioSupport: boolean;
    gridResponsive: boolean;
    flexboxResponsive: boolean;
  };

  // Custom breakpoint support
  custom: {
    enabled: boolean;
    maxCustomBreakpoints: number;
    validationRules: {
      minValue: number;
      maxValue: number;
      stepSize: number;
    };
  };
}

/**
 * Configuration management interface
 */
export interface ConfigurationManager {
  // Configuration access
  getConfig(): ElementorFrontendConfig;
  getSection(section: string): any;
  getValue(path: string): any;

  // Configuration updates
  updateConfig(updates: Partial<ElementorFrontendConfig>): void;
  updateSection(section: string, updates: any): void;
  setValue(path: string, value: any): void;

  // Configuration validation
  validateConfig(config: ElementorFrontendConfig): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };

  // Configuration persistence
  saveConfig(): void;
  loadConfig(): void;
  resetConfig(): void;

  // Environment detection
  isEditMode(): boolean;
  isPreviewMode(): boolean;
  isStaticMode(): boolean;
  isDebugMode(): boolean;

  // Feature flags
  isFeatureEnabled(feature: string): boolean;
  enableFeature(feature: string): void;
  disableFeature(feature: string): void;

  // Configuration events
  onChange(callback: (config: ElementorFrontendConfig) => void): void;
  offChange(callback: (config: ElementorFrontendConfig) => void): void;
}

/**
 * Enhanced breakpoints utility
 */
export interface EnhancedBreakpointsUtility {
  config: EnhancedResponsiveConfig;

  // Breakpoint queries
  getActiveBreakpoints(): string[];
  getBreakpointValues(): Record<string, number>;
  getBreakpointByValue(value: number): string | null;
  getCurrentBreakpoint(): string;

  // Device detection
  getCurrentDevice(): string;
  isDevice(device: string): boolean;
  isMobile(): boolean;
  isTablet(): boolean;
  isDesktop(): boolean;

  // Media queries
  getMediaQuery(breakpoint: string): string;
  createMediaQueryList(breakpoint: string): MediaQueryList;

  // Responsive utilities
  getResponsiveValue<T>(values: Record<string, T>, fallback?: T): T;
  interpolateValue(
    values: Record<string, number>,
    currentWidth: number
  ): number;

  // Events
  onBreakpointChange(
    callback: (breakpoint: string, previousBreakpoint: string) => void
  ): void;
  onDeviceChange(
    callback: (device: string, previousDevice: string) => void
  ): void;

  // Validation
  validateBreakpoint(breakpoint: string): boolean;
  validateBreakpointValue(value: number): boolean;

  // Custom breakpoints
  addCustomBreakpoint(name: string, value: number, label?: string): boolean;
  removeCustomBreakpoint(name: string): boolean;
  getCustomBreakpoints(): Record<string, any>;
}

/**
 * Performance monitor interface
 */
export interface FrontendPerformanceMonitor {
  metrics: {
    // Loading metrics
    pageLoadTime: number;
    assetsLoadTime: number;
    handlersInitTime: number;

    // Runtime metrics
    frameRate: number;
    memoryUsage: number;
    domNodes: number;
    activeHandlers: number;

    // User interaction metrics
    timeToInteractive: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;

    // Error metrics
    errorCount: number;
    warningCount: number;
  };

  // Measurement
  startMeasurement(name: string): void;
  endMeasurement(name: string): number;
  recordMetric(name: string, value: number): void;

  // Performance API integration
  getNavigationTiming(): PerformanceNavigationTiming;
  getResourceTimings(): PerformanceResourceTiming[];
  getPaintTimings(): PerformanceEntry[];

  // Memory monitoring
  getMemoryInfo(): {
    totalJSHeapSize?: number;
    usedJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  } | null;
  monitorMemoryUsage(): void;

  // Frame rate monitoring
  startFrameRateMonitoring(): void;
  stopFrameRateMonitoring(): void;
  getAverageFrameRate(): number;

  // Reporting
  generateReport(): {
    summary: Record<string, number>;
    details: Record<string, any>;
    recommendations: string[];
  };

  // Alerts
  setThreshold(metric: string, threshold: number): void;
  onThresholdExceeded(
    callback: (metric: string, value: number, threshold: number) => void
  ): void;
}

/**
 * Asset management utility
 */
export interface EnhancedAssetsManager {
  // Asset registration
  register(
    type: "script" | "style",
    key: string,
    config: EnhancedAssetConfig
  ): void;
  unregister(type: "script" | "style", key: string): boolean;

  // Asset loading
  load(key: string): Promise<boolean>;
  loadMultiple(keys: string[]): Promise<boolean[]>;
  loadGroup(group: string): Promise<boolean>;

  // Preloading
  preload(keys: string[]): Promise<void>;
  prefetch(keys: string[]): Promise<void>;

  // Asset queries
  isLoaded(key: string): boolean;
  isLoading(key: string): boolean;
  getLoadedAssets(): string[];
  getDependencies(key: string): string[];

  // Priority loading
  loadCritical(): Promise<void>;
  loadDeferred(): Promise<void>;

  // Asset optimization
  enableCompression(): void;
  enableCaching(): void;
  setBundling(enabled: boolean): void;

  // Error handling
  onLoadError(callback: (key: string, error: Error) => void): void;
  getLoadErrors(): Record<string, Error>;

  // Performance
  getLoadTimes(): Record<string, number>;
  getAssetSizes(): Record<string, number>;
}

/**
 * Enhanced asset configuration
 */
export interface EnhancedAssetConfig {
  src: string;
  dependencies?: string[];
  priority?: "critical" | "high" | "normal" | "low";
  group?: string;
  conditional?: () => boolean;
  attributes?: Record<string, string>;
  timeout?: number;
}

/**
 * Cache management utility
 */
export interface FrontendCacheManager {
  // Basic cache operations
  set(key: string, value: any, ttl?: number): void;
  get(key: string): any;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;

  // Advanced operations
  setWithTags(key: string, value: any, tags: string[], ttl?: number): void;
  invalidateByTag(tag: string): void;
  invalidateByPattern(pattern: RegExp): void;

  // Statistics
  getStats(): {
    size: number;
    hitRate: number;
    missRate: number;
    memoryUsage: number;
  };

  // Configuration
  setMaxSize(size: number): void;
  setDefaultTTL(ttl: number): void;
  enableAutoCleanup(enabled: boolean): void;

  // Events
  onHit(callback: (key: string) => void): void;
  onMiss(callback: (key: string) => void): void;
  onEviction(callback: (key: string, reason: string) => void): void;
}

/**
 * DOM utilities
 */
export interface DOMUtilities {
  // Element queries
  findElements(selector: string, context?: Element): Element[];
  findElement(selector: string, context?: Element): Element | null;

  // Element creation
  createElement(
    tag: string,
    attributes?: Record<string, string>,
    content?: string
  ): Element;
  createFragment(html: string): DocumentFragment;

  // Element manipulation
  addClass(element: Element, className: string): void;
  removeClass(element: Element, className: string): void;
  toggleClass(element: Element, className: string, force?: boolean): boolean;
  hasClass(element: Element, className: string): boolean;

  // Attributes
  setAttribute(element: Element, name: string, value: string): void;
  getAttribute(element: Element, name: string): string | null;
  removeAttribute(element: Element, name: string): void;

  // Data attributes
  setData(element: Element, key: string, value: any): void;
  getData(element: Element, key: string): any;
  removeData(element: Element, key: string): void;

  // Events
  addEventListener(
    element: Element,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void;
  removeEventListener(
    element: Element,
    event: string,
    handler: EventListener
  ): void;

  // Visibility and positioning
  isVisible(element: Element): boolean;
  isInViewport(element: Element, threshold?: number): boolean;
  getElementPosition(element: Element): {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  // Animation
  animate(
    element: Element,
    keyframes: Keyframe[],
    options?: KeyframeAnimationOptions
  ): Animation;
  fade(
    element: Element,
    direction: "in" | "out",
    duration?: number
  ): Promise<void>;
  slide(
    element: Element,
    direction: "up" | "down",
    duration?: number
  ): Promise<void>;

  // Performance optimizations
  batch(operations: (() => void)[]): void;
  throttle(func: Function, delay: number): Function;
  debounce(func: Function, delay: number): Function;
}

/**
 * Event system utility
 */
export interface EventSystemUtility {
  // Event binding
  on(event: string, callback: Function, context?: any): void;
  off(event: string, callback?: Function): void;
  once(event: string, callback: Function, context?: any): void;

  // Event emission
  emit(event: string, ...args: any[]): void;

  // Event namespacing
  createNamespace(namespace: string): EventSystemUtility;

  // Event delegation
  delegate(selector: string, event: string, callback: Function): void;
  undelegate(selector: string, event?: string, callback?: Function): void;

  // Event filtering
  filter(
    predicate: (event: string, ...args: any[]) => boolean
  ): EventSystemUtility;

  // Event queuing
  queue(event: string, ...args: any[]): void;
  flush(): void;

  // Debug helpers
  getListeners(event?: string): Record<string, Function[]>;
  getEventHistory(): Array<{ event: string; timestamp: number; args: any[] }>;
}

/**
 * Global frontend utilities interface
 */
export interface GlobalFrontendUtilities {
  config: ConfigurationManager;
  breakpoints: EnhancedBreakpointsUtility;
  performance: FrontendPerformanceMonitor;
  assets: EnhancedAssetsManager;
  cache: FrontendCacheManager;
  dom: DOMUtilities;
  events: EventSystemUtility;

  // Utility methods
  init(): void;
  ready(callback: () => void): void;

  // Environment
  getEnvironment(): {
    isEdit: boolean;
    isPreview: boolean;
    isStatic: boolean;
    isDebug: boolean;
    device: string;
    breakpoint: string;
  };

  // Performance helpers
  optimize(): void;
  measurePerformance<T>(name: string, fn: () => T): T;
  enablePerformanceMode(): void;

  // Debugging
  debug(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error): void;

  // Feature detection
  supports(feature: string): boolean;

  // Legacy compatibility
  getCompatibilityLayer(): {
    elementorFrontend: any;
    jQuery: any;
  };
}
