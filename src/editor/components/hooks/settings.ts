/**
 * Settings Component Hooks
 *
 * Hooks for settings component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Settings hook arguments
 */
export interface SettingsHookArgs extends ComponentHookArgs {
	settings?: any;
	settingsModel?: any;
	settingsType?: string;
	value?: any;
	[key: string]: any;
}

/**
 * Settings open hook
 */
export interface SettingsOpenHook extends ComponentHook {
	getComponent(): 'settings';
	getId(): 'open';
	apply(args: SettingsHookArgs): void;
}

/**
 * Settings close hook
 */
export interface SettingsCloseHook extends ComponentHook {
	getComponent(): 'settings';
	getId(): 'close';
	apply(args: SettingsHookArgs): void;
}

/**
 * Settings change hook
 */
export interface SettingsChangeHook extends ComponentHook {
	getComponent(): 'settings';
	getId(): 'change';
	apply(args: SettingsHookArgs): void;
}

/**
 * Settings save hook
 */
export interface SettingsSaveHook extends ComponentHook {
	getComponent(): 'settings';
	getId(): 'save';
	apply(args: SettingsHookArgs): void;
}

/**
 * Settings reset hook
 */
export interface SettingsResetHook extends ComponentHook {
	getComponent(): 'settings';
	getId(): 'reset';
	apply(args: SettingsHookArgs): void;
}

// Export all settings hooks
export type SettingsHooks =
	| SettingsOpenHook
	| SettingsCloseHook
	| SettingsChangeHook
	| SettingsSaveHook
	| SettingsResetHook;