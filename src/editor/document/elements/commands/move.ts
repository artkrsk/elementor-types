/**
 * Document Elements Move Command
 *
 * Mirrors editor/document/elements/commands/move.js
 * Moves elements within or between containers
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for move element command
 */
export interface MoveElementArgs {
	container?: any;
	containers?: any[];
	target?: any;
	options?: {
		at?: number;
		edit?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Move command for document elements
 * Moves elements between containers with history support
 */
export interface MoveElementCommand extends CommandHistoryBase {
	/**
	 * Validate move arguments
	 */
	validateArgs(args: MoveElementArgs): void;

	/**
	 * Get history configuration for this move operation
	 */
	getHistory(args: MoveElementArgs): any;

	/**
	 * Apply move operation to containers
	 */
	apply(args: MoveElementArgs): any;
}

/**
 * Constructor for MoveElementCommand
 */
export interface MoveElementCommandConstructor {
	new (options?: any): MoveElementCommand;
	extend(proto: any, staticProps?: any): MoveElementCommandConstructor;
}

declare const Move: MoveElementCommandConstructor;

export { Move };
export default Move;