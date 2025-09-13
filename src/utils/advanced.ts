/**
 * Elementor Utilities Types
 *
 * Complete type definitions for Elementor utility modules including:
 * - Notifications system
 * - Introduction/onboarding system
 * - JSON upload warning system
 * - Tiers/pricing system
 * - Additional utility interfaces
 */

import { Module } from "../core";

/**
 * Toast notification widget interface
 */
export interface ToastWidget {
  /** Widget elements */
  getElements(element: string): JQuery;

  /** Refresh widget position */
  refreshPosition(): void;

  /** Show widget with effects */
  show(): void;

  /** Hide widget with effects */
  hide(): void;
}

/**
 * Notification manager interface
 */
export interface NotificationsManager extends Module {
  /** Toast widget instance */
  toast?: ToastWidget;

  /**
   * Initialize toast notification system
   */
  initToast(): void;

  /**
   * Show notification
   */
  showToast(options: {
    message: string;
    title?: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
  }): void;

  /**
   * Show success notification
   */
  success(message: string, title?: string): void;

  /**
   * Show error notification
   */
  error(message: string, title?: string): void;

  /**
   * Show warning notification
   */
  warning(message: string, title?: string): void;

  /**
   * Show info notification
   */
  info(message: string, title?: string): void;
}

/**
 * Introduction step interface
 */
export interface IntroductionStep {
  /** Step element selector */
  element: string;

  /** Step title */
  title: string;

  /** Step description */
  content: string;

  /** Step position relative to element */
  position?: "top" | "bottom" | "left" | "right";

  /** Custom step options */
  options?: Record<string, any>;
}

/**
 * Introduction tour interface
 */
export interface IntroductionTour {
  /** Tour unique identifier */
  id: string;

  /** Tour title */
  title: string;

  /** Tour steps */
  steps: IntroductionStep[];

  /** Tour options */
  options?: {
    /** Auto-start tour */
    autoStart?: boolean;

    /** Show progress indicator */
    showProgress?: boolean;

    /** Exit on overlay click */
    exitOnOverlayClick?: boolean;

    /** Custom tour settings */
    [key: string]: any;
  };
}

/**
 * Introduction manager interface
 */
export interface IntroductionManager extends Module {
  /** Registered tours */
  tours: Map<string, IntroductionTour>;

  /** Current active tour */
  currentTour?: IntroductionTour;

  /** Introduction driver instance */
  driver?: any;

  /**
   * Register a new tour
   */
  registerTour(tour: IntroductionTour): void;

  /**
   * Start tour by ID
   */
  startTour(tourId: string): void;

  /**
   * Stop current tour
   */
  stopTour(): void;

  /**
   * Check if tour is active
   */
  isTourActive(): boolean;

  /**
   * Get tour by ID
   */
  getTour(tourId: string): IntroductionTour | undefined;

  /**
   * Initialize introduction system
   */
  init(): void;
}

/**
 * JSON upload warning configuration
 */
export interface JsonUploadWarning {
  /** Warning message */
  message: string;

  /** Warning title */
  title?: string;

  /** Show warning for file types */
  fileTypes?: string[];

  /** Custom validation function */
  validator?: (file: File) => boolean;

  /** Warning severity level */
  level?: "warning" | "error" | "info";
}

/**
 * JSON upload warning manager interface
 */
export interface JsonUploadWarningManager extends Module {
  /** Registered warnings */
  warnings: JsonUploadWarning[];

  /**
   * Register warning
   */
  registerWarning(warning: JsonUploadWarning): void;

  /**
   * Validate file upload
   */
  validateUpload(file: File): JsonUploadWarning[];

  /**
   * Show warnings for file
   */
  showWarnings(file: File): void;

  /**
   * Check if file should show warnings
   */
  shouldShowWarning(file: File): boolean;
}

/**
 * Tier/pricing plan interface
 */
export interface TierPlan {
  /** Plan identifier */
  id: string;

  /** Plan name */
  name: string;

  /** Plan features */
  features: string[];

  /** Plan limitations */
  limitations?: Record<string, number>;

  /** Plan pricing */
  pricing?: {
    /** Monthly price */
    monthly?: number;

    /** Annual price */
    annual?: number;

    /** Currency */
    currency?: string;
  };

  /** Plan metadata */
  metadata?: Record<string, any>;
}

/**
 * Tiers manager interface
 */
export interface TiersManager extends Module {
  /** Available plans */
  plans: TierPlan[];

  /** Current user plan */
  currentPlan?: TierPlan;

  /**
   * Get current user plan
   */
  getCurrentPlan(): TierPlan | null;

  /**
   * Check if feature is available in current plan
   */
  hasFeature(feature: string): boolean;

  /**
   * Check if user can perform action based on limitations
   */
  canPerformAction(action: string, current: number): boolean;

  /**
   * Get plan by ID
   */
  getPlan(planId: string): TierPlan | undefined;

  /**
   * Get upgrade URL for feature
   */
  getUpgradeUrl(feature?: string): string;

  /**
   * Show upgrade modal
   */
  showUpgradeModal(feature?: string): void;
}

/**
 * Time utility interface
 */
export interface TimeUtility extends Module {
  /**
   * Format timestamp to human readable string
   */
  format(timestamp: number, format?: string): string;

  /**
   * Get relative time string (e.g., "2 hours ago")
   */
  getRelativeTime(timestamp: number): string;

  /**
   * Parse date string to timestamp
   */
  parse(dateString: string): number;

  /**
   * Get current timestamp
   */
  now(): number;

  /**
   * Add time to timestamp
   */
  add(
    timestamp: number,
    amount: number,
    unit: "seconds" | "minutes" | "hours" | "days"
  ): number;

  /**
   * Subtract time from timestamp
   */
  subtract(
    timestamp: number,
    amount: number,
    unit: "seconds" | "minutes" | "hours" | "days"
  ): number;
}

/**
 * React integration utility interface
 */
export interface ReactUtility extends Module {
  /**
   * Render React component in DOM element
   */
  render(component: any, element: HTMLElement): void;

  /**
   * Unmount React component from DOM element
   */
  unmount(element: HTMLElement): void;

  /**
   * Create React portal
   */
  createPortal(component: any, element: HTMLElement): any;

  /**
   * Register React component
   */
  registerComponent(name: string, component: any): void;

  /**
   * Get registered React component
   */
  getComponent(name: string): any;
}

/**
 * Dynamic tags manager interface
 */
export interface DynamicTagsManager extends Module {
  /** Cache for tag data */
  cache: Record<string, any>;

  /** Cache requests queue */
  cacheRequests: Record<string, boolean>;

  /** Cache callbacks */
  cacheCallbacks: Array<(...args: any[]) => void>;

  /** Cache key not found error message */
  CACHE_KEY_NOT_FOUND_ERROR: string;

  /** Available tag types */
  tags: Record<string, any>;

  /**
   * Add cache request for tag
   */
  addCacheRequest(tag: any): void;

  /**
   * Create cache key for tag
   */
  createCacheKey(tag: any): string;

  /**
   * Load tag data from cache
   */
  loadTagDataFromCache(tag: any): any;

  /**
   * Load all pending cache requests
   */
  loadCacheRequests(): void;

  /**
   * Register tag type
   */
  registerTag(name: string, tagClass: any): void;

  /**
   * Get tag by name
   */
  getTag(name: string): any;

  /**
   * Render tag with data
   */
  renderTag(tag: any, data?: any): string;
}

/**
 * Utilities namespace
 */
export namespace Utils {
  export type Notifications = NotificationsManager;
  export type Introduction = IntroductionManager;
  export type JsonUploadWarning = JsonUploadWarningManager;
  export type Tiers = TiersManager;
  export type Time = TimeUtility;
  export type React = ReactUtility;
  export type DynamicTags = DynamicTagsManager;
  export type Tour = IntroductionTour;
  export type Step = IntroductionStep;
  export type Plan = TierPlan;
  export type Warning = JsonUploadWarning;
  export type Toast = ToastWidget;
}

// Default export for convenience
export default Utils;
