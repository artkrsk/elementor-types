/**
 * Editor Preferences Manager
 *
 * Mirrors editor/components/settings/editor-preferences/manager.js
 * Manager for editor preferences and user settings
 */

import type { SettingsBaseManager } from '../base/manager';

/**
 * Editor preferences configuration
 */
export interface EditorPreferencesConfig {
	ui_theme?: 'auto' | 'light' | 'dark';
	panel_width?: number;
	edit_buttons?: boolean;
	show_navigator?: boolean;
	preferences_tooltip?: boolean;
	[key: string]: any;
}

/**
 * Editor Preferences Manager
 * Handles user preferences and editor configuration settings
 */
export interface EditorPreferencesManager extends SettingsBaseManager {
	/**
	 * Get preferences model
	 */
	getModel(): any;

	/**
	 * Update editor theme
	 */
	updateTheme(theme: 'auto' | 'light' | 'dark'): void;

	/**
	 * Update panel width
	 */
	updatePanelWidth(width: number): void;

	/**
	 * Toggle edit buttons visibility
	 */
	toggleEditButtons(show: boolean): void;

	/**
	 * Toggle navigator visibility
	 */
	toggleNavigator(show: boolean): void;

	/**
	 * Get current preferences
	 */
	getPreferences(): EditorPreferencesConfig;

	/**
	 * Set preferences
	 */
	setPreferences(preferences: EditorPreferencesConfig): void;

	/**
	 * Reset preferences to defaults
	 */
	resetPreferences(): void;
}

/**
 * Constructor for EditorPreferencesManager
 */
export interface EditorPreferencesManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): EditorPreferencesManagerConstructor;
}

declare const EditorPreferencesManager: EditorPreferencesManagerConstructor;

export { EditorPreferencesManager };
export default EditorPreferencesManager;