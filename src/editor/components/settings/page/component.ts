/**
 * Settings Page Component
 *
 * Mirrors editor/components/settings/page/component.js
 * Component for page settings management
 */

import type { ComponentBase } from '../../../components';

/**
 * Page Settings Management Component
 * Handles page-specific settings and configuration
 */
export interface PageSettingsComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'settings/page';

	/**
	 * Import default page settings commands
	 */
	defaultCommands(): any;

	/**
	 * Get page settings manager
	 */
	getManager(): any;

	/**
	 * Initialize page settings
	 */
	initializePageSettings(): void;

	/**
	 * Get page settings model
	 */
	getModel(): any;

	/**
	 * Update page settings
	 */
	updateSettings(settings: any): void;
}

/**
 * Constructor for PageSettingsComponent
 */
export interface PageSettingsComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): PageSettingsComponentConstructor;
}

declare const PageSettingsComponent: PageSettingsComponentConstructor;

export { PageSettingsComponent };
export default PageSettingsComponent;