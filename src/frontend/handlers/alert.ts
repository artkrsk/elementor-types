/**
 * Alert Handler
 *
 * Mirrors frontend/handlers/alert.js
 * Handles alert widget functionality
 */

import type { Base } from './base';

/**
 * Alert settings
 */
export interface AlertSettings {
	selectors: {
		dismissButton: '.elementor-alert-dismiss';
	};
}

/**
 * Alert elements
 */
export interface AlertElements {
	$dismissButton: JQuery;
	[key: string]: JQuery;
}

/**
 * Alert Handler
 * Manages alert widget with dismiss functionality
 */
export interface AlertHandler extends Base {
	/**
	 * Get default alert settings
	 */
	getDefaultSettings(): AlertSettings;

	/**
	 * Get default alert elements
	 */
	getDefaultElements(): AlertElements;

	/**
	 * Bind alert events
	 */
	bindEvents(): void;

	/**
	 * Handle dismiss button click
	 */
	onDismissButtonClick(): void;
}

/**
 * Constructor for AlertHandler
 */
export interface AlertHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): AlertHandlerConstructor;
}

declare const AlertHandler: AlertHandlerConstructor;

export { AlertHandler };
export default AlertHandler;