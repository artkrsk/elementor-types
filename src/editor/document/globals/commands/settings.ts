/**
 * Document Globals Settings Command
 *
 * Mirrors editor/document/globals/commands/settings.js
 * Handles global settings management
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for globals settings command
 */
export interface GlobalsSettingsCommandArgs {
	container?: any;
	containers?: any[];
	settings: any;
	[key: string]: any;
}

/**
 * Settings command for document globals operations
 * Manages global settings for containers
 */
export interface GlobalsSettingsCommand extends CommandBase {
	/**
	 * Apply global settings to containers
	 */
	apply(args: GlobalsSettingsCommandArgs): void;

	/**
	 * Validate global settings arguments
	 */
	validateArgs(args: GlobalsSettingsCommandArgs): void;
}

/**
 * Constructor for GlobalsSettingsCommand
 */
export interface GlobalsSettingsCommandConstructor {
	new (options?: any): GlobalsSettingsCommand;
	extend(proto: any, staticProps?: any): GlobalsSettingsCommandConstructor;
}

declare const GlobalsSettings: GlobalsSettingsCommandConstructor;

export { GlobalsSettings };
export default GlobalsSettings;