/**
 * Document Elements Delete Command
 *
 * Mirrors editor/document/elements/commands/delete.js
 * Deletes elements from the document with history support
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for delete element command
 */
export interface DeleteElementArgs {
	container?: any;
	containers?: any[];
	force?: boolean;
	[key: string]: any;
}

/**
 * History item for delete operations
 */
export interface DeleteHistoryItem {
	get(key: string): any;
}

/**
 * Delete command for document elements
 * Removes elements with full history support and undo/redo capability
 */
export interface DeleteElementCommand extends CommandHistoryBase {
	/**
	 * Validate delete arguments
	 */
	validateArgs(args: DeleteElementArgs): void;

	/**
	 * Get history configuration for this delete operation
	 */
	getHistory(args: DeleteElementArgs): any;

	/**
	 * Apply delete operation to containers
	 */
	apply(args: DeleteElementArgs): any;

	/**
	 * Method to restore from history
	 */
	restore(historyItem: DeleteHistoryItem, isRedo: boolean): void;
}

/**
 * Constructor for DeleteElementCommand
 */
export interface DeleteElementCommandConstructor {
	new (options?: any): DeleteElementCommand;
	extend(proto: any, staticProps?: any): DeleteElementCommandConstructor;
	restore(historyItem: DeleteHistoryItem, isRedo: boolean): void;
}

declare const Delete: DeleteElementCommandConstructor;

export { Delete };
export default Delete;