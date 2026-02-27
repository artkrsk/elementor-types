/**
 * Frontend Controls Utilities
 *
 * Mirrors frontend/utils/controls.js
 * Stateless utility class for control value resolution
 */

/**
 * Frontend Controls Utilities
 */
export declare class Controls {
  /**
   * Get control value, optionally accessing a sub-key for object-type controls
   */
  getControlValue(
    controlSettings: Record<string, any>,
    controlKey: string,
    controlSubKey?: string
  ): any;

  /**
   * Get responsive control value for current or specified device.
   * Walks up the breakpoint chain from current device toward desktop
   * until a non-empty value is found.
   */
  getResponsiveControlValue(
    controlSettings: Record<string, any>,
    controlKey: string,
    controlSubKey?: string,
    device?: string | null
  ): any;
}
