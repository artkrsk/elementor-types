/**
 * Elementor Admin
 *
 * Mirrors admin/admin.js
 * Main admin interface management
 */

import type { ViewModule } from '../core/modules';

/**
 * Admin elements configuration
 */
export interface AdminElements {
	$switchMode: JQuery;
	$goToEditLink: JQuery;
	$switchModeInput: JQuery;
	$switchModeButton: JQuery;
	$elementorLoader: JQuery;
	$builderEditor: JQuery;
	$importButton: JQuery;
	$importNowButton: JQuery;
	$importArea: JQuery;
	$importForm: JQuery;
	$importFormFileInput: JQuery;
	$settingsForm: JQuery;
	$settingsTabsWrapper: JQuery;
	$menuGetHelpLink: JQuery;
	$menuGoProLink: JQuery;
	$reMigrateGlobalsButton: JQuery;
	$settingsFormPages: JQuery;
	$activeSettingsPage: JQuery;
	$settingsTabs: JQuery;
	$activeSettingsTab: JQuery;
	$formAnchor: JQuery;
	[key: string]: JQuery;
}

/**
 * Role manager configuration
 */
export interface RoleManager {
	selectors: {
		body: string;
		row: string;
		label: string;
		excludedIndicator: string;
		excludedField: string;
		controlsContainer: string;
		toggleHandle: string;
		arrowUp: string;
		arrowDown: string;
	};
	toggle($trigger: JQuery): void;
	updateLabel($row: JQuery): void;
	setAdvancedState($row: JQuery, state: boolean): void;
	bind(): void;
	init(): void;
}

/**
 * Elementor Admin Interface
 * Main admin functionality and interface management
 */
export interface ElementorAdmin extends ViewModule {
	/**
	 * Maintenance mode instance
	 */
	maintenanceMode: any;

	/**
	 * Admin configuration
	 */
	config: any;

	/**
	 * Template controls instance
	 */
	templateControls: any;

	/**
	 * Role manager instance
	 */
	roleManager: RoleManager;

	/**
	 * Get default admin elements
	 */
	getDefaultElements(): AdminElements;

	/**
	 * Toggle editor status display
	 */
	toggleStatus(): void;

	/**
	 * Bind admin event listeners
	 */
	bindEvents(): void;

	/**
	 * Initialize admin interface
	 */
	onInit(): void;

	/**
	 * Add user agent classes to body
	 */
	addUserAgentClasses(): void;

	/**
	 * Open specified links in new tab
	 */
	openLinksInNewTab(): void;

	/**
	 * Initialize template import functionality
	 */
	initTemplatesImport(): void;

	/**
	 * Initialize maintenance mode
	 */
	initMaintenanceMode(): void;

	/**
	 * Check if in Elementor mode
	 */
	isElementorMode(): boolean;

	/**
	 * Animate loader display
	 */
	animateLoader(): void;

	/**
	 * Navigate to settings tab from URL hash
	 */
	goToSettingsTabFromHash(): void;

	/**
	 * Navigate to specific settings tab
	 */
	goToSettingsTab(tabName: string): void;

	/**
	 * Translate admin strings
	 */
	translate(stringKey: string, templateArgs?: any): string;
}

/**
 * Constructor for ElementorAdmin
 */
export interface ElementorAdminConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ElementorAdminConstructor;
}

declare const ElementorAdmin: ElementorAdminConstructor;

/**
 * Window interface extension for elementorAdmin
 * Note: Users should extend Window interface in their own projects if needed
 */

export { ElementorAdmin };
export default ElementorAdmin;