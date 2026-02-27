/**
 * Frontend Utilities
 * Utility interfaces for frontend functionality
 */

import type { ElementorFrontendConfig } from "./config";

// Export detailed utility implementations
export * from "./utils/";

/**
 * Breakpoints utility interface
 * Complete interface for window.elementor.breakpoints functionality
 */
export interface ElementorBreakpoints {
  /** Responsive configuration from frontend config */
  responsiveConfig: ElementorFrontendConfig["responsive"];

  /**
   * Get list of active breakpoint names
   * @param args - Configuration options for breakpoints list
   * @param args.largeToSmall - Return breakpoints ordered from large to small
   * @param args.withDesktop - Include desktop breakpoint in the list
   * @returns Array of active breakpoint names
   *
   * @example
   * ```typescript
   * // Get all active breakpoints
   * const breakpoints = elementor.breakpoints.getActiveBreakpointsList();
   * // ['mobile', 'tablet', 'desktop']
   *
   * // Get breakpoints in large to small order
   * const ordered = elementor.breakpoints.getActiveBreakpointsList({
   *   largeToSmall: true
   * });
   * // ['desktop', 'tablet', 'mobile']
   *
   * // Get breakpoints without desktop
   * const withoutDesktop = elementor.breakpoints.getActiveBreakpointsList({
   *   withDesktop: false
   * });
   * // ['mobile', 'tablet']
   * ```
   */
  getActiveBreakpointsList(args?: {
    largeToSmall?: boolean;
    withDesktop?: boolean;
  }): string[];

  /**
   * Get breakpoint pixel values for all active breakpoints
   * @returns Array of breakpoint values in pixels
   */
  getBreakpointValues(): number[];

  /**
   * Get the device key that comes before desktop
   * @returns Device key (usually 'tablet')
   */
  getDesktopPreviousDeviceKey(): string;

  /**
   * Get the minimum pixel value for desktop breakpoint
   * @returns Minimum pixel value for desktop
   */
  getDesktopMinPoint(): number;

  /**
   * Get minimum breakpoint value for a specific device
   * @param device - Device key (mobile, tablet, desktop, etc.)
   * @returns Minimum pixel value for the device breakpoint
   */
  getDeviceMinBreakpoint(device: string): number;

  /**
   * Get regex pattern for matching active breakpoints
   * @returns RegExp for matching active breakpoint classes or identifiers
   */
  getActiveMatchRegex(): RegExp;

  /**
   * Check if a specific breakpoint is currently active
   * @param breakpointKey - Breakpoint key to check
   * @returns True if breakpoint is currently active
   */
  isBreakpointActive?(breakpointKey: string): boolean;

  /**
   * Get current active breakpoint key
   * @returns Currently active breakpoint key
   */
  getCurrentBreakpointKey?(): string;

  /**
   * Get breakpoint configuration for a specific device
   * @param deviceKey - Device key
   * @returns Breakpoint configuration or undefined
   */
  getBreakpointConfig?(deviceKey: string): {
    label: string;
    value: number;
    default_value: number;
    direction: "min" | "max";
    is_enabled: boolean;
  } | undefined;

  /**
   * Get all breakpoint configurations
   * @returns Record of all breakpoint configurations
   */
  getAllBreakpoints?(): Record<string, {
    label: string;
    value: number;
    default_value: number;
    direction: "min" | "max";
    is_enabled: boolean;
  }>;

  /**
   * Check if device has custom breakpoints configured
   * @returns True if custom breakpoints are configured
   */
  hasCustomBreakpoints?(): boolean;

  /**
   * Refresh breakpoints configuration
   * Usually called after breakpoint settings are updated
   */
  refresh?(): void;
}

/**
 * Controls utility
 */
export interface Controls {
  getControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string
  ): any;
  getResponsiveControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string,
    device?: string | null
  ): any;
}

/**
 * Video loader interface
 */
export interface VideoLoader {
  getApiURL(): string;
  getURLRegex(): RegExp;
  isApiLoaded(): boolean;
  getApiObject(): any;
  getVideoIDFromURL(url: string): string | null;
  onApiReady(callback: Function): void;
}

/**
 * Events utility interface
 */
export interface Events {
  dispatch(
    context: HTMLElement | JQuery<HTMLElement>,
    event: string,
    data?: any
  ): void;
}
