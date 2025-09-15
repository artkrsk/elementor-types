/**
 * Toggle Handler
 *
 * Mirrors frontend/handlers/toggle.js
 * Handles toggle widget functionality
 */

import type { BaseTabsHandler, BaseTabsSettings } from './base-tabs';

/**
 * Toggle settings extending base tabs
 */
export interface ToggleSettings extends BaseTabsSettings {
	toggleSelf: true;
	hidePrevious: false;
}

/**
 * Toggle Handler
 * Manages toggle widget with collapsible sections
 */
export interface ToggleHandler extends BaseTabsHandler {
	/**
	 * Get default toggle settings
	 */
	getDefaultSettings(): ToggleSettings;
}

/**
 * Constructor for ToggleHandler
 */
export interface ToggleHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ToggleHandlerConstructor;
}

declare const ToggleHandler: ToggleHandlerConstructor;

export { ToggleHandler };
export default ToggleHandler;