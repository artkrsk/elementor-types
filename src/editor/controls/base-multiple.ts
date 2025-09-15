/**
 * Base Multiple Control
 *
 * Mirrors editor/controls/base-multiple.js
 * Base class for controls with multiple values
 */

import type { ControlBaseDataView } from './base';

/**
 * Multiple control configuration
 */
export interface MultipleControlConfig {
	multiple: boolean;
	options: Record<string, string>;
	[key: string]: any;
}

/**
 * Base Multiple Control
 * Foundation for controls that support multiple value selection
 */
export interface BaseMultiple extends ControlBaseDataView {
	/**
	 * Get control configuration
	 */
	getControlConfig(): MultipleControlConfig;

	/**
	 * Handle multiple value selection
	 */
	handleMultipleSelection(value: any): void;

	/**
	 * Get selected values array
	 */
	getSelectedValues(): any[];

	/**
	 * Set selected values
	 */
	setSelectedValues(values: any[]): void;
}

/**
 * Constructor for BaseMultiple
 */
export interface BaseMultipleConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseMultipleConstructor;
}

declare const BaseMultiple: BaseMultipleConstructor;

export { BaseMultiple };
export default BaseMultiple;