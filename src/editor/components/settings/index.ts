/**
 * Settings Components System
 *
 * Export all settings component interfaces and types
 */

export * from './base/manager';
export * from './page/component';
export * from './editor-preferences/manager';

export { default as SettingsBaseManager } from './base/manager';
export { default as PageSettingsComponent } from './page/component';
export { default as EditorPreferencesManager } from './editor-preferences/manager';

// Re-export commonly used types
export type {
	ChangeCallback,
	PanelMenuSettings,
	PanelPageConfig,
	SettingsConfig,
	EditedView
} from './base/manager';
export type { EditorPreferencesConfig } from './editor-preferences/manager';