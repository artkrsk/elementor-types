/**
 * Document Elements Settings Command
 *
 * Mirrors editor/document/elements/commands/settings.js
 * Updates element settings with history support
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for settings element command
 */
export interface SettingsElementArgs {
	container?: any;
	containers?: any[];
	settings: any;
	options?: {
		external?: boolean;
		render?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Settings command for document elements
 * Updates element settings with full history support
 */
export interface SettingsElementCommand extends CommandHistoryBase {
	/**
	 * Validate settings arguments
	 */
	validateArgs(args: SettingsElementArgs): void;

	/**
	 * Get history configuration for this settings operation
	 */
	getHistory(args: SettingsElementArgs): any;

	/**
	 * Apply settings changes to containers
	 */
	apply(args: SettingsElementArgs): any;

	/**
	 * Get subtitle for history display
	 */
	getSubTitle(args: SettingsElementArgs): string;
}

/**
 * Constructor for SettingsElementCommand
 */
export interface SettingsElementCommandConstructor {
	new (options?: any): SettingsElementCommand;
	extend(proto: any, staticProps?: any): SettingsElementCommandConstructor;
	getSubTitle(args: SettingsElementArgs): string;
}

declare const Settings: SettingsElementCommandConstructor;

export { Settings };
export default Settings;