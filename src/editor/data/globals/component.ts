/**
 * Globals Data Component
 *
 * Mirrors editor/data/globals/component.js
 * Main component for managing global colors and typography
 */

import type { ComponentBase } from '../../components';
import type { TypographyComponent } from './typography/component';
import type { ColorsComponent } from './colors/component';

/**
 * Global Data Management Component
 * Manages global colors, typography, and their associated commands
 */
export interface GlobalsComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'globals';

	/**
	 * Register sub-components (typography and colors)
	 */
	registerAPI(): void;

	/**
	 * Import default data commands
	 */
	defaultData(): any;

	/**
	 * Refresh global data cache
	 * Called when Elementor is loaded
	 */
	refreshGlobalData(): void;

	/**
	 * Typography sub-component
	 */
	typography?: TypographyComponent;

	/**
	 * Colors sub-component
	 */
	colors?: ColorsComponent;
}

/**
 * Constructor for Globals component
 */
export interface GlobalsComponentConstructor {
	new (args?: any): any;
	extend(proto: any, staticProps?: any): GlobalsComponentConstructor;
}

declare const GlobalsComponent: GlobalsComponentConstructor;

export { GlobalsComponent };
export default GlobalsComponent;