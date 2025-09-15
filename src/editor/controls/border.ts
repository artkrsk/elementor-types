/**
 * Border Control
 *
 * Mirrors editor/controls/border.js
 * Comprehensive border control with all border properties
 */

import type { ControlBaseDataView } from './base';

/**
 * Border types
 */
export type BorderType = 'none' | 'solid' | 'double' | 'dotted' | 'dashed' | 'groove';

/**
 * Border control configuration
 */
export interface BorderControlConfig {
	selector: string;
	fields_options?: {
		border?: Record<string, any>;
		width?: Record<string, any>;
		color?: Record<string, any>;
	};
	separator?: 'before' | 'after' | 'both' | 'none';
	[key: string]: any;
}

/**
 * Border Control
 * Complete control for border styling with type, width, and color
 */
export interface BorderControl extends ControlBaseDataView {
	/**
	 * Get border configuration
	 */
	getBorderConfig(): BorderControlConfig;

	/**
	 * Get current border type
	 */
	getCurrentBorderType(): BorderType;

	/**
	 * Set border type
	 */
	setBorderType(type: BorderType): void;

	/**
	 * Handle border type change
	 */
	onBorderTypeChange(newType: BorderType): void;

	/**
	 * Get border CSS
	 */
	getBorderCSS(): Record<string, string>;

	/**
	 * Validate border settings
	 */
	validateBorderSettings(): boolean;

	/**
	 * Reset border values
	 */
	resetBorder(): void;
}

/**
 * Constructor for BorderControl
 */
export interface BorderControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BorderControlConstructor;
}

declare const BorderControl: BorderControlConstructor;

export { BorderControl };
export default BorderControl;