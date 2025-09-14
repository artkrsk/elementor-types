/**
 * Navigator Region Component
 *
 * Mirrors editor/regions/navigator/component.js
 * Main component for navigator region management
 */

import type { ComponentBase } from '../../components';

/**
 * Navigator route configuration
 */
export interface NavigatorRoutes {
	'': () => void;
}

/**
 * Navigator shortcut configuration
 */
export interface NavigatorShortcut {
	keys: string;
	dependency?: () => boolean;
}

/**
 * Navigator shortcuts configuration
 */
export interface NavigatorShortcuts {
	toggle: NavigatorShortcut;
}

/**
 * Arguments for navigator operations
 */
export interface NavigatorArgs {
	model?: any;
	silent?: boolean;
	[key: string]: any;
}

/**
 * Navigator Region Management Component
 * Handles the structure tree navigator including commands and shortcuts
 */
export interface NavigatorComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'navigator';

	/**
	 * Get default routes for navigator
	 */
	defaultRoutes(): NavigatorRoutes;

	/**
	 * Import default navigator commands
	 */
	defaultCommands(): any;

	/**
	 * Get default keyboard shortcuts
	 */
	defaultShortcuts(): NavigatorShortcuts;

	/**
	 * Open navigator with optional model
	 */
	open(args: NavigatorArgs): boolean;

	/**
	 * Close navigator
	 */
	close(silent?: boolean): boolean;
}

/**
 * Constructor for NavigatorComponent
 */
export interface NavigatorComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): NavigatorComponentConstructor;
}

declare const NavigatorComponent: NavigatorComponentConstructor;

export { NavigatorComponent };
export default NavigatorComponent;