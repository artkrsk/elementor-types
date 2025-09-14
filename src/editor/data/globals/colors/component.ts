/**
 * Global Colors Component
 *
 * Mirrors editor/data/globals/colors/component.js
 * Manages global color values and their commands
 */

import type { ComponentBase } from '../../../components';

/**
 * Global Colors Management Component
 * Handles creation, modification, and management of global color values
 */
export interface ColorsComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'globals/colors';

	/**
	 * Import default color commands
	 */
	defaultCommands(): any;
}

/**
 * Constructor for Colors component
 */
export interface ColorsComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): ColorsComponentConstructor;
}

declare const ColorsComponent: ColorsComponentConstructor;

export { ColorsComponent };
export default ColorsComponent;