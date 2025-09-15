/**
 * Frontend Controls Utilities
 *
 * Mirrors frontend/utils/controls.js
 * Frontend control utilities and helpers
 */

/**
 * Control value configuration
 */
export interface ControlValueConfig {
	deviceMode?: string;
	breakpoint?: string;
	size?: string;
	unit?: string;
}

/**
 * Frontend Controls Utilities
 * Helper functions for control values and responsive settings
 */
export interface FrontendControlsUtils {
	/**
	 * Get control value for device
	 */
	getControlValue(settings: any, controlName: string, config?: ControlValueConfig): any;

	/**
	 * Get responsive value
	 */
	getResponsiveValue(settings: any, controlName: string, deviceMode?: string): any;

	/**
	 * Parse control units
	 */
	parseControlUnits(value: string): { size: number; unit: string };

	/**
	 * Get breakpoint value
	 */
	getBreakpointValue(settings: any, controlName: string, breakpoint: string): any;

	/**
	 * Check if control has value
	 */
	hasControlValue(settings: any, controlName: string): boolean;

	/**
	 * Get control CSS value
	 */
	getControlCSSValue(settings: any, controlName: string): string;
}

declare const FrontendControlsUtils: any;

export { FrontendControlsUtils };
export default FrontendControlsUtils;