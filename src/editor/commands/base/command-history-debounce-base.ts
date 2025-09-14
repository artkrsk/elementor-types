/**
 * Command History Debounce Base
 *
 * Mirrors editor/document/command-bases/command-history-debounce-base.js
 * Base class for commands that support history with debouncing
 */

import type { CommandHistoryBase } from './command-history-base';

/**
 * Base command that supports debounced history operations
 */
export interface CommandHistoryDebounceBase extends CommandHistoryBase {
	/**
	 * Debounce timeout in milliseconds
	 */
	debounceTimeout: number;

	/**
	 * Debounce timer reference
	 */
	debounceTimer: any;

	/**
	 * Get debounce timeout for this command
	 */
	getDebounceTimeout(): number;

	/**
	 * Start debounce timer
	 */
	startDebounce(args: any): void;

	/**
	 * Clear debounce timer
	 */
	clearDebounce(): void;

	/**
	 * Execute debounced command
	 */
	executeDebounced(args: any): void;
}

/**
 * Constructor for CommandHistoryDebounceBase
 */
export interface CommandHistoryDebounceBaseConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CommandHistoryDebounceBaseConstructor;
}

declare const CommandHistoryDebounceBase: CommandHistoryDebounceBaseConstructor;

export { CommandHistoryDebounceBase };
export default CommandHistoryDebounceBase;