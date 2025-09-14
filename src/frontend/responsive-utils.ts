/**
 * Responsive Control Utilities
 * Type definitions for responsive control value getters and device management
 */

import type { ResponsiveValue } from "../editor/element-settings";

/**
 * Device mode types
 */
export type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'widescreen' | 'laptop' | 'tablet_extra' | 'mobile_extra';

/**
 * Responsive control configuration
 */
export interface ResponsiveControlConfig {
  /** Default device values */
  default?: {
    desktop: any;
    tablet?: any;
    mobile?: any;
    widescreen?: any;
    laptop?: any;
    tablet_extra?: any;
    mobile_extra?: any;
  };

  /** Units for the control */
  units?: string[];

  /** Range configuration */
  range?: {
    [unit: string]: {
      min: number;
      max: number;
      step?: number;
    };
  };

  /** Selectors for CSS generation */
  selectors?: {
    [selector: string]: string;
  };
}

/**
 * Control value with unit
 */
export interface ControlValueWithUnit {
  size: number | string;
  unit: string;
  sizes?: {
    [device in DeviceMode]?: number | string;
  };
}

/**
 * Responsive utilities interface for frontend
 */
export interface ResponsiveUtilities {
  /**
   * Get responsive control value for current device
   *
   * @param settings - Element settings object
   * @param controlKey - Control key to get value from
   * @param subKey - Sub-key for complex controls (e.g., 'size' for dimension controls)
   * @param currentDevice - Current device mode (optional, uses current if not provided)
   * @returns Control value for the specified device
   *
   * @example
   * // Get responsive width value
   * const width = getResponsiveControlValue(settings, 'width', 'size', 'tablet');
   *
   * // Get responsive margin
   * const margin = getResponsiveControlValue(settings, 'margin');
   */
  getResponsiveControlValue<T = any>(
    settings: any,
    controlKey: string,
    subKey?: string,
    currentDevice?: DeviceMode
  ): T;

  /**
   * Get control value for all devices
   *
   * @param settings - Element settings object
   * @param controlKey - Control key to get values from
   * @param subKey - Sub-key for complex controls
   * @returns Object with values for all devices
   */
  getResponsiveControlValues(
    settings: any,
    controlKey: string,
    subKey?: string
  ): Partial<Record<DeviceMode, any>>;

  /**
   * Check if control has responsive values
   *
   * @param settings - Element settings object
   * @param controlKey - Control key to check
   * @returns True if control has device-specific values
   */
  hasResponsiveValue(settings: any, controlKey: string): boolean;

  /**
   * Get device-specific CSS selector
   *
   * @param device - Device mode
   * @param selector - Base CSS selector
   * @returns Device-specific CSS selector with media query
   *
   * @example
   * // Returns: '@media (max-width: 1024px) { .my-element }'
   * const selector = getDeviceSelector('tablet', '.my-element');
   */
  getDeviceSelector(device: DeviceMode, selector: string): string;

  /**
   * Generate responsive CSS
   *
   * @param settings - Element settings object
   * @param controlKey - Control key
   * @param cssProperty - CSS property name
   * @param selector - CSS selector
   * @param unit - CSS unit (optional)
   * @returns Generated CSS rules for all devices
   */
  generateResponsiveCSS(
    settings: any,
    controlKey: string,
    cssProperty: string,
    selector: string,
    unit?: string
  ): string;
}

/**
 * Controls utilities interface
 */
export interface ControlsUtils extends ResponsiveUtilities {
  /**
   * Get slider control value
   *
   * @param control - Control configuration
   * @param controlValue - Control value
   * @param controlData - Additional control data
   * @returns Processed slider value
   */
  getSliderValue(control: any, controlValue: any, controlData?: any): ControlValueWithUnit;

  /**
   * Get dimensions control value
   *
   * @param control - Control configuration
   * @param controlValue - Control value
   * @returns Processed dimensions value
   */
  getDimensionsValue(control: any, controlValue: any): {
    top: number | string;
    right: number | string;
    bottom: number | string;
    left: number | string;
    unit: string;
    isLinked: boolean;
  };

  /**
   * Get color control value with proper formatting
   *
   * @param controlValue - Color control value
   * @returns Formatted color value
   */
  getColorValue(controlValue: any): string;

  /**
   * Get typography control values
   *
   * @param controlValue - Typography control value
   * @returns Processed typography values
   */
  getTypographyValue(controlValue: any): {
    font_family?: string;
    font_size?: ControlValueWithUnit;
    font_weight?: string;
    text_transform?: string;
    font_style?: string;
    text_decoration?: string;
    line_height?: ControlValueWithUnit;
    letter_spacing?: ControlValueWithUnit;
    word_spacing?: ControlValueWithUnit;
  };

  /**
   * Get media control value (image/video)
   *
   * @param controlValue - Media control value
   * @param size - Image size
   * @returns Processed media value
   */
  getMediaValue(controlValue: any, size?: string): {
    id: number;
    url: string;
    alt?: string;
    caption?: string;
    description?: string;
    sizes?: { [size: string]: string };
  };

  /**
   * Get repeater control values
   *
   * @param controlValue - Repeater control value
   * @returns Array of repeater item values
   */
  getRepeaterValue(controlValue: any): any[];

  /**
   * Check if control value is empty
   *
   * @param controlValue - Control value to check
   * @param controlType - Type of control
   * @returns True if value is considered empty
   */
  isControlValueEmpty(controlValue: any, controlType?: string): boolean;
}

/**
 * Breakpoints manager interface
 */
export interface BreakpointsManager {
  /**
   * Get active breakpoints
   */
  getActiveBreakpoints(): { [key: string]: { label: string; value: number; default_value: number; direction: 'min' | 'max' } };

  /**
   * Get breakpoint value
   *
   * @param device - Device name
   * @returns Breakpoint value in pixels
   */
  getBreakpoint(device: DeviceMode): number;

  /**
   * Get device min/max width
   *
   * @param device - Device name
   * @returns Min and max width for the device
   */
  getDeviceMinMaxWidth(device: DeviceMode): { min?: number; max?: number };

  /**
   * Get current device based on window width
   */
  getCurrentDevice(): DeviceMode;

  /**
   * Get devices list in order
   */
  getDevicesList(): DeviceMode[];

  /**
   * Check if device is larger than another
   *
   * @param device1 - First device
   * @param device2 - Second device
   * @returns True if device1 is larger than device2
   */
  isDeviceLarger(device1: DeviceMode, device2: DeviceMode): boolean;

  /**
   * Get desktop-first breakpoint query
   *
   * @param device - Device name
   * @returns CSS media query string
   */
  getDesktopMediaQuery(device: DeviceMode): string;

  /**
   * Get mobile-first breakpoint query
   *
   * @param device - Device name
   * @returns CSS media query string
   */
  getMobileMediaQuery(device: DeviceMode): string;
}

/**
 * Frontend utilities that include responsive controls
 */
export interface FrontendUtils {
  /** Controls utilities */
  controls: ControlsUtils;

  /** Breakpoints manager */
  breakpoints: BreakpointsManager;

  /** Responsive utilities */
  responsive: ResponsiveUtilities;
}