/**
 * Breakpoints System
 * Responsive breakpoint management for Elementor
 */

import { Module } from "../core";

/**
 * Breakpoints management system
 */
export declare class Breakpoints extends Module {
  activeBreakpoints: { [key: string]: any };

  /**
   * Get list of active breakpoint names
   */
  getActiveBreakpointsList(): string[];

  /**
   * Get breakpoint pixel values
   */
  getBreakpointValues(): number[];

  /**
   * Get the minimum desktop breakpoint
   */
  getDesktopMinPoint(): number;
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
