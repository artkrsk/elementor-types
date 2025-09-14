/**
 * Command History Base
 *
 * Mirrors editor/document/command-bases/command-history-base.js
 * Base class for commands that support history tracking
 */

import type { CommandContainerBase } from '../base';

/**
 * Base command that supports history operations
 */
export interface CommandHistoryBase extends CommandContainerBase {
	/**
	 * History object for this command
	 */
	history: any | boolean;

	/**
	 * History ID for tracking
	 */
	historyId: number | boolean;

	/**
	 * Get history object from child command
	 */
	getHistory(args?: any): any | boolean;

	/**
	 * Check if history is active
	 */
	isHistoryActive(): boolean;

	/**
	 * Check if data was changed by this command
	 */
	isDataChanged(): boolean;

	/**
	 * Called before command runs
	 */
	onBeforeRun(args: any): void;

	/**
	 * Called after command runs
	 */
	onAfterRun(args: any, result: any): void;

	/**
	 * Called after apply
	 */
	onAfterApply(args: any, result: any): void;

	/**
	 * Called on apply error
	 */
	onCatchApply(error: any): void;
}

/**
 * Constructor for CommandHistoryBase
 */
export interface CommandHistoryBaseConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CommandHistoryBaseConstructor;
}

declare const CommandHistoryBase: CommandHistoryBaseConstructor;

export { CommandHistoryBase };
export default CommandHistoryBase;