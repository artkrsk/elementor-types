/**
 * Performance Utilities
 * Advanced performance monitoring and optimization utilities for Elementor
 */

import { Module } from "../core";

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  // Loading metrics
  domContentLoaded: number;
  windowLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;

  // Runtime metrics
  frameRate: number;
  memoryUsage: MemoryUsage;
  cpuUsage: number;

  // Elementor-specific metrics
  editorLoadTime: number;
  widgetRenderTime: Record<string, number>;
  assetLoadTime: Record<string, number>;
  handlerInitTime: Record<string, number>;

  // User interaction metrics
  timeToInteractive: number;
  inputLatency: number;
  scrollPerformance: number;
}

/**
 * Memory usage information
 */
export interface MemoryUsage {
  totalJSHeapSize: number;
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
  estimatedDomSize: number;
}

/**
 * Performance monitoring configuration
 */
export interface PerformanceConfig {
  enabled: boolean;
  sampleRate: number;
  maxSamples: number;
  trackUserInteractions: boolean;
  trackNetworkRequests: boolean;
  trackMemoryUsage: boolean;
  enableVitals: boolean;
  enableCustomMetrics: boolean;
  reportingEndpoint?: string;
  reportingInterval: number;
}

/**
 * Performance alert configuration
 */
export interface PerformanceAlert {
  metric: keyof PerformanceMetrics;
  threshold: number;
  comparison: "gt" | "lt" | "eq";
  callback: (value: number, threshold: number) => void;
  enabled: boolean;
}

/**
 * Performance optimization suggestions
 */
export interface OptimizationSuggestion {
  category: "loading" | "runtime" | "memory" | "network" | "rendering";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  description: string;
  solution: string;
  impact: string;
  effort: string;
  autoFixAvailable: boolean;
  autoFixAction?: () => Promise<boolean>;
}

/**
 * Performance monitoring utility
 */
export declare class Performance extends Module {
  /** Current metrics */
  private metrics: PerformanceMetrics;

  /** Configuration */
  private config: PerformanceConfig;

  /** Active alerts */
  private alerts: Map<string, PerformanceAlert>;

  /** Performance observers */
  private observers: Map<string, PerformanceObserver>;

  /** Measurement sessions */
  private sessions: Map<string, number>;

  /**
   * Initialize performance monitoring
   */
  init(config?: Partial<PerformanceConfig>): void;

  /**
   * Start measuring a custom metric
   */
  startMeasurement(name: string): void;

  /**
   * End measuring a custom metric
   */
  endMeasurement(name: string): number;

  /**
   * Record a custom metric value
   */
  recordMetric(name: string, value: number, unit?: string): void;

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics;

  /**
   * Get web vitals
   */
  getWebVitals(): {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
  };

  /**
   * Get memory information
   */
  getMemoryInfo(): MemoryUsage;

  /**
   * Monitor frame rate
   */
  startFrameRateMonitoring(): void;
  stopFrameRateMonitoring(): void;
  getAverageFrameRate(): number;

  /**
   * Performance alerts
   */
  addAlert(id: string, alert: PerformanceAlert): void;
  removeAlert(id: string): boolean;
  checkAlerts(): void;

  /**
   * Optimization analysis
   */
  analyzePerformance(): OptimizationSuggestion[];
  getOptimizationRecommendations(): OptimizationSuggestion[];

  /**
   * Resource timing analysis
   */
  getResourceTimings(): PerformanceResourceTiming[];
  analyzeResourceTimings(): {
    slowestResources: Array<{ name: string; duration: number }>;
    largestResources: Array<{ name: string; size: number }>;
    blockedRequests: Array<{ name: string; blockingTime: number }>;
  };

  /**
   * Network performance
   */
  getNetworkInformation(): {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };

  /**
   * Performance profiling
   */
  startProfiling(name: string): void;
  stopProfiling(name: string): PerformanceProfile;
  getProfilingData(): Record<string, PerformanceProfile>;

  /**
   * Performance reporting
   */
  generateReport(): PerformanceReport;
  exportReport(format: "json" | "csv" | "html"): string;
  sendReport(endpoint?: string): Promise<boolean>;

  /**
   * Performance optimization
   */
  enableOptimizations(): void;
  disableOptimizations(): void;
  applyOptimization(suggestion: OptimizationSuggestion): Promise<boolean>;

  /**
   * Real User Monitoring (RUM)
   */
  enableRUM(): void;
  disableRUM(): void;
  getRUMData(): RUMData;

  /**
   * Performance budgets
   */
  setBudget(metric: string, limit: number): void;
  checkBudgets(): BudgetCheck[];
  getBudgetStatus(): Record<string, BudgetStatus>;
}

/**
 * Performance profile data
 */
export interface PerformanceProfile {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  memoryStart: MemoryUsage;
  memoryEnd: MemoryUsage;
  marks: PerformanceMark[];
  measures: PerformanceMeasure[];
  customMetrics: Record<string, number>;
}

/**
 * Performance report
 */
export interface PerformanceReport {
  timestamp: number;
  sessionId: string;
  metrics: PerformanceMetrics;
  webVitals: any;
  optimizations: OptimizationSuggestion[];
  resourceTimings: any[];
  userAgent: string;
  viewport: { width: number; height: number };
  connection: any;
  budgetChecks: BudgetCheck[];
  customData: Record<string, any>;
}

/**
 * Real User Monitoring data
 */
export interface RUMData {
  sessionId: string;
  userId?: string;
  pageViews: PageView[];
  interactions: UserInteraction[];
  errors: ErrorEvent[];
  performance: PerformanceMetrics;
  metadata: Record<string, any>;
}

/**
 * Page view data for RUM
 */
export interface PageView {
  id: string;
  url: string;
  title: string;
  timestamp: number;
  loadTime: number;
  isElementorPage: boolean;
  elementorMode?: "edit" | "preview" | "frontend";
}

/**
 * User interaction data
 */
export interface UserInteraction {
  type: "click" | "scroll" | "input" | "resize" | "custom";
  target: string;
  timestamp: number;
  value?: any;
  performance?: {
    responseTime: number;
    deltaTime: number;
  };
}

/**
 * Budget check result
 */
export interface BudgetCheck {
  metric: string;
  limit: number;
  actual: number;
  passed: boolean;
  severity: "info" | "warning" | "error";
}

/**
 * Budget status
 */
export interface BudgetStatus {
  metric: string;
  limit: number;
  current: number;
  percentage: number;
  status: "good" | "warning" | "exceeded";
}

/**
 * Performance utilities for common operations
 */
export declare class PerformanceUtils extends Module {
  /**
   * Debounce function execution
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void;

  /**
   * Throttle function execution
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void;

  /**
   * Request idle callback with fallback
   */
  requestIdleCallback(callback: () => void, timeout?: number): number;

  /**
   * Cancel idle callback
   */
  cancelIdleCallback(id: number): void;

  /**
   * Optimize DOM operations with batching
   */
  batchDOMUpdates(operations: (() => void)[]): void;

  /**
   * Optimize image loading
   */
  optimizeImageLoading(images: HTMLImageElement[]): void;

  /**
   * Virtual scrolling helper
   */
  createVirtualScrolling(
    container: HTMLElement,
    itemHeight: number
  ): VirtualScrollController;

  /**
   * Intersection observer helper
   */
  createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver;

  /**
   * Memory-efficient event delegation
   */
  delegate(
    container: HTMLElement,
    selector: string,
    event: string,
    handler: EventListener
  ): () => void;

  /**
   * Optimize CSS animations
   */
  optimizeAnimations(elements: HTMLElement[]): void;

  /**
   * Resource hints helper
   */
  addResourceHints(resources: ResourceHint[]): void;
}

/**
 * Virtual scroll controller
 */
export interface VirtualScrollController {
  scrollToIndex(index: number): void;
  getVisibleRange(): { start: number; end: number };
  refresh(): void;
  destroy(): void;
}

/**
 * Resource hint configuration
 */
export interface ResourceHint {
  href: string;
  as?: string;
  type?: string;
  crossorigin?: string;
  rel: "preload" | "prefetch" | "preconnect" | "dns-prefetch";
}
