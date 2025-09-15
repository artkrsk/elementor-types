/**
 * Responsive Control Behavior
 *
 * Handles responsive functionality for controls
 */

import type { ControlBaseView } from '../base';

/**
 * Responsive behavior configuration
 */
export interface ResponsiveConfig {
	breakpoints: string[];
	defaultDevice: string;
	inheritFromLarger?: boolean;
}

/**
 * Responsive Control Behavior
 * Adds responsive functionality to controls
 */
export interface ResponsiveBehavior {
	/**
	 * Associated control view
	 */
	view: ControlBaseView;

	/**
	 * Current active device
	 */
	activeDevice: string;

	/**
	 * Available breakpoints
	 */
	breakpoints: string[];

	/**
	 * Initialize responsive behavior
	 */
	initialize(): void;

	/**
	 * Switch to device mode
	 */
	switchToDevice(device: string): void;

	/**
	 * Get value for device
	 */
	getDeviceValue(device: string): any;

	/**
	 * Set value for device
	 */
	setDeviceValue(device: string, value: any): void;

	/**
	 * Handle device change
	 */
	onDeviceChange(device: string): void;

	/**
	 * Get inherited value
	 */
	getInheritedValue(device: string): any;

	/**
	 * Update responsive controls
	 */
	updateResponsiveControls(): void;
}

/**
 * Constructor for ResponsiveBehavior
 */
export interface ResponsiveBehaviorConstructor {
	new (view: ControlBaseView, config: ResponsiveConfig): any;
	extend(proto: any, staticProps?: any): ResponsiveBehaviorConstructor;
}

declare const ResponsiveBehavior: ResponsiveBehaviorConstructor;

export { ResponsiveBehavior };
export default ResponsiveBehavior;