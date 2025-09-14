/**
 * Command Disable Enable Base
 *
 * Mirrors editor/document/command-bases/command-disable-enable.js
 * Base class for commands that support enable/disable behavior
 */

import type { CommandHistoryBase } from './command-history-base';

/**
 * Arguments for disable/enable commands
 */
export interface DisableEnableCommandArgs {
	container: any;
	containers?: any[];
	settings: any;
}

/**
 * History item for disable/enable operations
 */
export interface DisableEnableHistoryItem {
	get(key: string): any;
}

/**
 * Base command for disable/enable operations
 */
export interface CommandDisableEnable extends CommandHistoryBase {
	/**
	 * Type of operation (enable or disable)
	 */
	type: 'enable' | 'disable';

	/**
	 * Validate disable/enable arguments
	 */
	validateArgs(args: DisableEnableCommandArgs): void;

	/**
	 * Get history for disable/enable operation
	 */
	getHistory(args: DisableEnableCommandArgs): any;
}

/**
 * Constructor for CommandDisableEnable
 */
export interface CommandDisableEnableConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CommandDisableEnableConstructor;

	/**
	 * Get the name of this command type
	 */
	getName(): string;

	/**
	 * Get the full enable command string
	 */
	getEnableCommand(): string;

	/**
	 * Get the full disable command string
	 */
	getDisableCommand(): string;

	/**
	 * Restore state from history
	 */
	restore(historyItem: DisableEnableHistoryItem, isRedo: boolean): void;
}

declare const CommandDisableEnable: CommandDisableEnableConstructor;

export { CommandDisableEnable };
export default CommandDisableEnable;