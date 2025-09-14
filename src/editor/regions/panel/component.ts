/**
 * Panel Region Component
 *
 * Mirrors editor/regions/panel/component.js
 * Main component for panel region management
 */

import type { ComponentBase } from '../../components';

/**
 * Panel route configuration
 */
export interface PanelRoutes {
	menu(): void;
	'global-colors'(): void;
	'global-fonts'(): void;
	'editor-preferences'(): void;
}

/**
 * Panel shortcut configuration
 */
export interface PanelShortcut {
	keys: string;
	dependency?: () => boolean;
	scopes?: string[];
}

/**
 * Panel shortcuts configuration
 */
export interface PanelShortcuts {
	toggle: PanelShortcut;
	save: PanelShortcut;
	exit: PanelShortcut;
	'change-device-mode': PanelShortcut;
	'page-settings': PanelShortcut;
	'editor-preferences': PanelShortcut;
}

/**
 * Panel Region Management Component
 * Handles the main editor panel including commands, routes, and user interactions
 */
export interface PanelComponent extends ComponentBase {
	/**
	 * State ready flag for initialization
	 */
	stateReadyOnce: boolean;

	/**
	 * Get component namespace
	 */
	getNamespace(): 'panel';

	/**
	 * Get default routes for panel navigation
	 */
	defaultRoutes(): PanelRoutes;

	/**
	 * Import default panel commands
	 */
	defaultCommands(): any;

	/**
	 * Import default internal panel commands
	 */
	defaultCommandsInternal(): any;

	/**
	 * Get default keyboard shortcuts
	 */
	defaultShortcuts(): PanelShortcuts;

	/**
	 * Block user interactions with the panel
	 */
	blockUserInteractions(): void;

	/**
	 * Unblock user interactions with the panel
	 */
	unblockUserInteractions(): void;

	/**
	 * Check if user interactions are blocked
	 */
	isUserInteractionsBlocked(): boolean;
}

/**
 * Constructor for PanelComponent
 */
export interface PanelComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): PanelComponentConstructor;
}

declare const PanelComponent: PanelComponentConstructor;

export { PanelComponent };
export default PanelComponent;