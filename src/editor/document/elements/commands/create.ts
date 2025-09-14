/**
 * Document Elements Create Command
 *
 * Mirrors editor/document/elements/commands/create.js
 * Creates new elements in the document with history support
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for create element command
 */
export interface CreateElementArgs {
	container?: any;
	containers?: any[];
	model: any;
	options?: {
		clone?: boolean;
		at?: number;
		edit?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * History item for create operations
 */
export interface CreateHistoryItem {
	get(key: string): any;
}

/**
 * Create command for document elements
 * Creates new elements with full history support and undo/redo capability
 */
export interface CreateElementCommand extends CommandHistoryBase {
	/**
	 * Validate create arguments
	 */
	validateArgs(args: CreateElementArgs): void;

	/**
	 * Get history configuration for this create operation
	 */
	getHistory(args: CreateElementArgs): any;

	/**
	 * Apply create operation to containers
	 */
	apply(args: CreateElementArgs): any | any[];

	/**
	 * Method to restore from history
	 */
	restore(historyItem: CreateHistoryItem, isRedo: boolean): void;
}

/**
 * Constructor for CreateElementCommand
 */
export interface CreateElementCommandConstructor {
	new (options?: any): CreateElementCommand;
	extend(proto: any, staticProps?: any): CreateElementCommandConstructor;
	restore(historyItem: CreateHistoryItem, isRedo: boolean): void;
}

declare const Create: CreateElementCommandConstructor;

export { Create };
export default Create;