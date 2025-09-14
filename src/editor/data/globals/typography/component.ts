/**
 * Global Typography Component
 *
 * Mirrors editor/data/globals/typography/component.js
 * Manages global typography values and their commands
 */

import type { ComponentBase } from '../../../components';

/**
 * Global Typography Management Component
 * Handles creation, modification, and management of global typography values
 */
export interface TypographyComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'globals/typography';

	/**
	 * Import default typography commands
	 */
	defaultCommands(): any;
}

/**
 * Constructor for Typography component
 */
export interface TypographyComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): TypographyComponentConstructor;
}

declare const TypographyComponent: TypographyComponentConstructor;

export { TypographyComponent };
export default TypographyComponent;