/**
 * Settings Base Manager
 *
 * Mirrors editor/components/settings/base/manager.js
 * Base manager for all settings components
 */

import type { ViewModule } from '../../../../core/modules';
import type { Model } from 'backbone';

/**
 * Change callback function type
 */
export type ChangeCallback = (value: any) => void;

/**
 * Panel menu settings configuration
 */
export interface PanelMenuSettings {
	icon: string;
	beforeItem?: string;
}

/**
 * Panel page configuration
 */
export interface PanelPageConfig {
	title: string;
	menu?: PanelMenuSettings;
}

/**
 * Settings configuration
 */
export interface SettingsConfig {
	name: string;
	panelPage: PanelPageConfig;
	cssWrapperSelector: string;
	settings: any;
	controls: any;
}

/**
 * Edited view structure for container creation
 */
export interface EditedView {
	getContainer(): any;
	getEditModel(): any;
	model: any;
	container: any;
}

/**
 * Settings Base Manager
 * Provides common functionality for all settings managers
 */
export interface SettingsBaseManager extends ViewModule {
	/**
	 * Settings model instance
	 */
	model: Model | null;

	/**
	 * Flag indicating if there are unsaved changes
	 */
	hasChange: boolean;

	/**
	 * Change callbacks by attribute name
	 */
	changeCallbacks: Record<string, ChangeCallback>;

	/**
	 * Debounced save function
	 */
	debounceSave: () => void;

	/**
	 * Add change callback for specific attribute
	 */
	addChangeCallback(attribute: string, callback: ChangeCallback): void;

	/**
	 * Bind event listeners
	 */
	bindEvents(): void;

	/**
	 * Unbind event listeners
	 */
	unbindEvents(): void;

	/**
	 * Add panel page for settings
	 */
	addPanelPage(): void;

	/**
	 * Get container type identifier
	 */
	getContainerType(): string;

	/**
	 * Get container ID (deprecated)
	 */
	getContainerId(): string;

	/**
	 * Get edited view structure
	 */
	getEditedView(): EditedView;

	/**
	 * Get document instance
	 */
	getDocument(): any;

	/**
	 * Update stylesheet with current settings
	 */
	updateStylesheet(keepOldEntries?: boolean): void;

	/**
	 * Initialize settings model
	 */
	initModel(): void;

	/**
	 * Get style ID for CSS
	 */
	getStyleId(): string;

	/**
	 * Initialize controls CSS parser
	 */
	initControlsCSSParser(): void;

	/**
	 * Get controls CSS parser instance
	 */
	getControlsCSS(): any;

	/**
	 * Destroy controls CSS parser
	 */
	destroyControlsCSS(): void;

	/**
	 * Get data to save
	 */
	getDataToSave(data: any): any;

	/**
	 * Save settings changes
	 */
	save(callback?: Function): Promise<any>;

	/**
	 * Add panel menu item
	 */
	addPanelMenuItem(): void;

	/**
	 * Handle model change events
	 */
	onModelChange(model: Model): void;

	/**
	 * Handle document loaded event
	 */
	onElementorDocumentLoaded(): void;

	/**
	 * Destroy the manager
	 */
	destroy(): void;
}

/**
 * Constructor for SettingsBaseManager
 */
export interface SettingsBaseManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): SettingsBaseManagerConstructor;
}

declare const SettingsBaseManager: SettingsBaseManagerConstructor;

export { SettingsBaseManager };
export default SettingsBaseManager;