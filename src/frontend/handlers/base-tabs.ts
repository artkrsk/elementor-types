/**
 * Base Tabs Handler
 *
 * Mirrors frontend/handlers/base-tabs.js
 * Base class for tab-based widgets (tabs, accordion, toggle)
 */

import type { Base } from './base';

/**
 * Tab settings configuration
 */
export interface BaseTabsSettings {
	selectors: {
		tablist: '[role="tablist"]';
		tabTitle: '.elementor-tab-title';
		tabContent: '.elementor-tab-content';
	};
	classes: {
		active: 'elementor-active';
	};
	showTabFn: string;
	hideTabFn: string;
	toggleSelf: boolean;
	hidePrevious: boolean;
	autoExpand: boolean | 'editor';
	keyDirection: {
		ArrowLeft: number;
		ArrowUp: number;
		ArrowRight: number;
		ArrowDown: number;
	};
}

/**
 * Tab elements
 */
export interface BaseTabsElements {
	$tabTitles: JQuery;
	$tabContents: JQuery;
	[key: string]: JQuery;
}

/**
 * Base Tabs Handler
 * Provides common functionality for tab-based widgets
 */
export interface BaseTabsHandler extends Base {
	/**
	 * Get default tabs settings
	 */
	getDefaultSettings(): BaseTabsSettings;

	/**
	 * Get default tab elements
	 */
	getDefaultElements(): BaseTabsElements;

	/**
	 * Activate default tab on initialization
	 */
	activateDefaultTab(): void;

	/**
	 * Handle keyboard navigation for accessibility
	 */
	handleKeyboardNavigation(event: KeyboardEvent): void;

	/**
	 * Deactivate currently active tab
	 */
	deactivateActiveTab(tabIndex?: number): void;

	/**
	 * Activate specific tab
	 */
	activateTab(tabIndex: number): void;

	/**
	 * Check if tab is currently active
	 */
	isActiveTab(tabIndex: number): boolean;

	/**
	 * Bind tab event listeners
	 */
	bindEvents(): void;

	/**
	 * Change active tab
	 */
	changeActiveTab(tabIndex: number): void;

	/**
	 * Handle edit settings changes
	 */
	onEditSettingsChange(propertyName: string): void;
}

/**
 * Constructor for BaseTabsHandler
 */
export interface BaseTabsHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseTabsHandlerConstructor;
}

declare const BaseTabsHandler: BaseTabsHandlerConstructor;

export { BaseTabsHandler };
export default BaseTabsHandler;