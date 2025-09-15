/**
 * Base Units Control
 *
 * Mirrors editor/controls/base-units.js
 * Base class for controls with unit selection
 */

import type { ControlBaseDataView } from './base';

/**
 * Unit option configuration
 */
export interface UnitOption {
	title: string;
	unit: string;
	min?: number;
	max?: number;
	step?: number;
}

/**
 * Units control configuration
 */
export interface UnitsControlConfig {
	units: Record<string, UnitOption>;
	defaultUnit: string;
	[key: string]: any;
}

/**
 * Base Units Control
 * Foundation for controls that include unit selection (px, em, %, etc.)
 */
export interface BaseUnits extends ControlBaseDataView {
	/**
	 * Get available units
	 */
	getUnits(): Record<string, UnitOption>;

	/**
	 * Get default unit
	 */
	getDefaultUnit(): string;

	/**
	 * Handle unit change
	 */
	onUnitChange(newUnit: string): void;

	/**
	 * Get current unit
	 */
	getCurrentUnit(): string;

	/**
	 * Convert value between units
	 */
	convertValue(value: number, fromUnit: string, toUnit: string): number;

	/**
	 * Validate value for current unit
	 */
	validateValueForUnit(value: number, unit: string): boolean;
}

/**
 * Constructor for BaseUnits
 */
export interface BaseUnitsConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseUnitsConstructor;
}

declare const BaseUnits: BaseUnitsConstructor;

export { BaseUnits };
export default BaseUnits;