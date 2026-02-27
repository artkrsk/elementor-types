/**
 * Responsive Control Utilities
 * Utility types for responsive control values and device management
 */

/**
 * Device mode types
 */
export type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'widescreen' | 'laptop' | 'tablet_extra' | 'mobile_extra';

/**
 * Responsive control configuration
 */
export interface ResponsiveControlConfig {
  default?: {
    desktop: any;
    tablet?: any;
    mobile?: any;
    widescreen?: any;
    laptop?: any;
    tablet_extra?: any;
    mobile_extra?: any;
  };
  units?: string[];
  range?: {
    [unit: string]: {
      min: number;
      max: number;
      step?: number;
    };
  };
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
