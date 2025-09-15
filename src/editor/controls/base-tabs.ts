/**
 * Base Tabs Control
 *
 * Mirrors editor/controls/base-tabs.js
 * Base class for tab-based controls
 */

import type { ControlBaseDataView } from './base';

/**
 * Tab control configuration
 */
export interface TabsControlConfig {
	tabs: {
		[key: string]: {
			label: string;
			controls?: Record<string, any>;
		};
	};
	separator?: 'before' | 'after' | 'both' | 'none';
	[key: string]: any;
}

/**
 * Base Tabs Control
 * Foundation for controls that organize content in tabs
 */
export interface BaseTabs extends ControlBaseDataView {
	/**
	 * Get tab configuration
	 */
	getTabsConfig(): TabsControlConfig;

	/**
	 * Get active tab
	 */
	getActiveTab(): string;

	/**
	 * Set active tab
	 */
	setActiveTab(tabName: string): void;

	/**
	 * Handle tab change
	 */
	onTabChange(tabName: string): void;

	/**
	 * Get tab controls
	 */
	getTabControls(tabName: string): Record<string, any>;

	/**
	 * Render tab content
	 */
	renderTabContent(tabName: string): void;
}

/**
 * Constructor for BaseTabs
 */
export interface BaseTabsConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseTabsConstructor;
}

declare const BaseTabs: BaseTabsConstructor;

export { BaseTabs };
export default BaseTabs;