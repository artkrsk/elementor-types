/**
 * Additional Utility Classes
 * Various utility classes for Elementor functionality
 */

import { Module } from "../core";

/**
 * Advanced React integration utilities for Elementor
 */
export declare class React extends Module {
  /** Component registry */
  private components: Map<string, any>;

  /** Portal containers */
  private portals: Map<string, HTMLElement>;

  /** React roots for React 18+ compatibility */
  private roots: Map<HTMLElement, any>;

  /**
   * Render a React component to an element
   * Automatically detects and uses React 18+ createRoot or legacy ReactDOM.render
   * 
   * @param component - React component to render
   * @param element - DOM element to render into
   * @param props - Props to pass to component
   */
  render(component: any, element: HTMLElement, props?: any): void;

  /**
   * Create React root for React 18+ (modern API)
   * 
   * @param element - DOM element to create root for
   * @returns React root instance
   */
  createRoot(element: HTMLElement): any;

  /**
   * Render using React 18+ createRoot API
   * 
   * @param component - React component to render
   * @param element - DOM element to render into
   * @param props - Props to pass to component
   */
  renderWithCreateRoot(component: any, element: HTMLElement, props?: any): void;

  /**
   * Render using legacy ReactDOM.render API
   * 
   * @param component - React component to render
   * @param element - DOM element to render into
   * @param props - Props to pass to component
   */
  renderWithLegacyAPI(component: any, element: HTMLElement, props?: any): void;

  /**
   * Unmount a React component from an element
   * Handles both React 18+ and legacy unmounting
   */
  unmount(element: HTMLElement): void;

  /**
   * Check if React 18+ createRoot is available
   * 
   * @returns True if createRoot API is available
   */
  hasCreateRootAPI(): boolean;

  /**
   * Get React version string
   * 
   * @returns React version or 'unknown' if not detected
   */
  getReactVersion(): string;

  /**
   * Unmount a React component from an element
   */
  unmount(element: HTMLElement): void;

  /**
   * Register a React component for reuse
   */
  registerComponent(name: string, component: any): void;

  /**
   * Get a registered React component
   */
  getComponent(name: string): any;

  /**
   * Create a React portal
   */
  createPortal(component: any, container: HTMLElement, key?: string): any;

  /**
   * Remove a React portal
   */
  removePortal(key: string): boolean;

  /**
   * Create React hooks for Elementor
   */
  createElementorHooks(): {
    useElementorData: (key: string) => any;
    useElementorSettings: (elementId: string) => any;
    useElementorConfig: () => any;
    useElementorBreakpoints: () => any;
  };

  /**
   * Create React context providers
   */
  createProviders(): {
    ElementorProvider: any;
    SettingsProvider: any;
    BreakpointsProvider: any;
  };

  /**
   * Higher-order component for Elementor integration
   */
  withElementor(component: any): any;

  /**
   * React component for widget rendering
   */
  createWidgetComponent(widgetType: string): any;

  /**
   * React component for control rendering
   */
  createControlComponent(controlType: string): any;

  /**
   * Hydrate server-rendered React components
   */
  hydrate(component: any, element: HTMLElement, props?: any): void;

  /**
   * Create React error boundary for Elementor
   */
  createErrorBoundary(): any;

  /**
   * Performance utilities for React components
   */
  createPerformanceWrapper(component: any): any;

  /**
   * Development tools integration
   */
  enableDevTools(enabled: boolean): void;
}

/**
 * Time utilities
 */
export declare class Time extends Module {
  /**
   * Get user timestamp string with proper timezone handling
   * 
   * @param date - Date object to format (defaults to current date)
   * @param includeTimezone - Whether to include timezone information
   * @returns Formatted timestamp string
   */
  getUserTimestamp(date?: Date, includeTimezone?: boolean): string;

  /**
   * Format timestamp to readable time
   * 
   * @param timestamp - Unix timestamp in milliseconds
   * @param format - Format string (e.g., 'YYYY-MM-DD HH:mm:ss')
   * @returns Formatted time string
   */
  formatTime(timestamp: number, format?: string): string;

  /**
   * Get timezone offset in minutes
   * 
   * @param date - Date to get offset for (defaults to current date)
   * @returns Timezone offset in minutes from UTC
   */
  getTimezoneOffset(date?: Date): number;

  /**
   * Format date to ISO8601 string
   * 
   * @param date - Date to format (defaults to current date)
   * @param includeMilliseconds - Whether to include milliseconds
   * @returns ISO8601 formatted string
   */
  formatISO8601(date?: Date, includeMilliseconds?: boolean): string;

  /**
   * Get user's local timezone identifier
   * 
   * @returns Timezone identifier (e.g., 'America/New_York')
   */
  getUserTimezone(): string;

  /**
   * Convert timestamp between timezones
   * 
   * @param timestamp - Unix timestamp in milliseconds
   * @param fromTimezone - Source timezone
   * @param toTimezone - Target timezone
   * @returns Converted timestamp
   */
  convertTimezone(timestamp: number, fromTimezone: string, toTimezone: string): number;

  /**
   * Get relative time string (e.g., "2 hours ago")
   * 
   * @param timestamp - Unix timestamp to compare
   * @param baseTimestamp - Base timestamp for comparison (defaults to now)
   * @returns Relative time string
   */
  getRelativeTime(timestamp: number, baseTimestamp?: number): string;
}

/**
 * Advanced notification system with multiple types and positioning
 */
export declare class Notifications extends Module {
  /** Active notifications */
  private activeNotifications: Map<string, NotificationInstance>;

  /** Notification queue */
  private notificationQueue: NotificationConfig[];

  /** Global notification settings */
  private globalSettings: NotificationGlobalSettings;

  /**
   * Show a toast notification with advanced options
   */
  showToast(options: ToastNotificationConfig): string;

  /**
   * Show a modal notification
   */
  showModal(options: ModalNotificationConfig): string;

  /**
   * Show an inline notification
   */
  showInline(options: InlineNotificationConfig): string;

  /**
   * Show a banner notification
   */
  showBanner(options: BannerNotificationConfig): string;

  /**
   * Hide a specific notification
   */
  hide(notificationId: string): boolean;

  /**
   * Hide all notifications of a type
   */
  hideByType(type: NotificationType): number;

  /**
   * Clear all notifications
   */
  clearAll(): void;

  /**
   * Update global notification settings
   */
  configure(settings: Partial<NotificationGlobalSettings>): void;

  /**
   * Get active notifications
   */
  getActive(): NotificationInstance[];

  /**
   * Create notification group
   */
  createGroup(
    groupId: string,
    settings: NotificationGroupSettings
  ): NotificationGroup;

  /**
   * Bulk operations
   */
  showBulk(notifications: NotificationConfig[]): string[];

  /**
   * Event callbacks
   */
  onShow(callback: (notification: NotificationInstance) => void): void;
  onHide(callback: (notification: NotificationInstance) => void): void;
  onInteraction(
    callback: (notification: NotificationInstance, action: string) => void
  ): void;
}

/**
 * Notification configuration interfaces
 */
export interface NotificationConfig {
  message: string;
  title?: string;
  type?: NotificationType;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  icon?: string;
  position?: NotificationPosition;
  priority?: NotificationPriority;
  groupId?: string;
  metadata?: Record<string, any>;
}

export interface ToastNotificationConfig extends NotificationConfig {
  showProgress?: boolean;
  pauseOnHover?: boolean;
  closeButton?: boolean;
}

export interface ModalNotificationConfig extends NotificationConfig {
  backdrop?: boolean;
  keyboard?: boolean;
  size?: "small" | "medium" | "large" | "full";
  centered?: boolean;
}

export interface InlineNotificationConfig extends NotificationConfig {
  container: HTMLElement | string;
  dismissible?: boolean;
  border?: boolean;
}

export interface BannerNotificationConfig extends NotificationConfig {
  sticky?: boolean;
  placement?: "top" | "bottom";
  fullWidth?: boolean;
}

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading";

export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export interface NotificationAction {
  label: string;
  action: string | (() => void);
  style?: "primary" | "secondary" | "danger";
}

export interface NotificationInstance {
  id: string;
  config: NotificationConfig;
  element: HTMLElement;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
}

export interface NotificationGlobalSettings {
  maxVisible: number;
  defaultDuration: number;
  animationDuration: number;
  position: NotificationPosition;
  stackDirection: "up" | "down";
  pauseOnFocus: boolean;
  rtl: boolean;
}

export interface NotificationGroupSettings {
  maxItems: number;
  collapseAfter: number;
  groupLabel: string;
  priority: NotificationPriority;
}

export interface NotificationGroup {
  id: string;
  settings: NotificationGroupSettings;
  notifications: NotificationInstance[];
  add(notification: NotificationConfig): string;
  remove(notificationId: string): boolean;
  clear(): void;
  collapse(): void;
  expand(): void;
}

/**
 * Introduction system for onboarding
 */
export declare class Introduction extends Module {
  /**
   * Show an introduction
   */
  show(introductionId: string): void;

  /**
   * Hide an introduction
   */
  hide(introductionId: string): void;

  /**
   * Check if introduction has been viewed
   */
  hasViewed(introductionId: string): boolean;

  /**
   * Mark introduction as viewed
   */
  markAsViewed(introductionId: string): void;
}

/**
 * JSON upload warning message utility
 */
export declare class JsonUploadWarningMessage extends Module {
  /**
   * Show warning message
   */
  show(message: string): void;

  /**
   * Hide warning message
   */
  hide(): void;
}

/**
 * Tiers system for feature management
 */
export declare class Tiers extends Module {
  TIERS: {
    free: string;
    essential: string;
    advanced: string;
    expert: string;
  };
}
