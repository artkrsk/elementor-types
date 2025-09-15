/**
 * Breakpoints System
 * Responsive breakpoint management for Elementor
 */

import { Module } from "../core";

/**
 * Breakpoints management system
 */
export declare class Breakpoints extends Module {
  activeBreakpoints: Record<string, any>;

  /**
   * Get list of active breakpoint names - Enhanced for real usage patterns
   * Used extensively with options for ordering and desktop inclusion
   */
  getActiveBreakpointsList(options?: {
    /** Order from large to small (default: false) */
    largeToSmall?: boolean;
    /** Include desktop breakpoint (default: false) */
    withDesktop?: boolean;
    /** Include specific device types */
    includeTypes?: string[];
  }): string[];

  /**
   * Get breakpoint pixel values
   */
  getBreakpointValues(): number[];

  /**
   * Get the minimum desktop breakpoint
   */
  getDesktopMinPoint(): number;

  /**
   * Get the previous device key before desktop
   * Used for determining the largest tablet/mobile breakpoint
   */
  getDesktopPreviousDeviceKey(): string;

  /**
   * Get minimum breakpoint value for a specific device
   *
   * @param deviceKey - Device key (mobile, tablet, desktop, etc.)
   * @returns Minimum pixel value for the device breakpoint
   */
  getDeviceMinBreakpoint(deviceKey: string): number;

  /**
   * Get active match regex for breakpoint detection
   * Creates a regex pattern for matching current active breakpoints
   *
   * @returns RegExp for matching active breakpoint classes or identifiers
   */
  getActiveMatchRegex(): RegExp;

  /**
   * Get current active breakpoint key
   */
  getCurrentBreakpointKey(): string;

  /**
   * Check if a specific breakpoint is currently active
   */
  isBreakpointActive(breakpointKey: string): boolean;

  /**
   * Get breakpoint configuration for a specific device
   */
  getBreakpointConfig(deviceKey: string): BreakpointConfig[string] | undefined;
}

/**
 * Breakpoint configuration interface
 */
export interface BreakpointConfig {
  [key: string]: {
    label: string;
    value: number;
    default_value: number;
    direction: "min" | "max";
    is_enabled: boolean;
  };
}

/**
 * Responsive configuration
 */
export interface ResponsiveConfig {
  breakpoints: BreakpointConfig;
  hasCustomBreakpoints: boolean;
}
