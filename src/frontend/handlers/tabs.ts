/**
 * Tabs Handler
 *
 * Mirrors frontend/handlers/tabs.js
 * Handles tabs widget functionality
 */

import type { BaseTabsHandler } from './base-tabs';

/**
 * Tabs Handler
 * Manages tabs widget with standard tab behavior
 */
export interface TabsHandler extends BaseTabsHandler {
	/**
	 * Handle mobile tab behavior
	 */
	handleMobileMode(): void;

	/**
	 * Check if in mobile mode
	 */
	isMobileMode(): boolean;

	/**
	 * Handle responsive changes
	 */
	onResponsiveChange(): void;
}

/**
 * Constructor for TabsHandler
 */
export interface TabsHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): TabsHandlerConstructor;
}

declare const TabsHandler: TabsHandlerConstructor;

export { TabsHandler };
export default TabsHandler;