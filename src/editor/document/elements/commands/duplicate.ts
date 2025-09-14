/**
 * Document Elements Duplicate Command
 *
 * Mirrors editor/document/elements/commands/duplicate.js
 * Duplicates elements in the document
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for duplicate element command
 */
export interface DuplicateElementArgs {
	container?: any;
	containers?: any[];
	options?: {
		at?: number;
		edit?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Duplicate command for document elements
 * Creates copies of existing elements with history support
 */
export interface DuplicateElementCommand extends CommandHistoryBase {
	/**
	 * Validate duplicate arguments
	 */
	validateArgs(args: DuplicateElementArgs): void;

	/**
	 * Get history configuration for this duplicate operation
	 */
	getHistory(args: DuplicateElementArgs): any;

	/**
	 * Apply duplicate operation to containers
	 */
	apply(args: DuplicateElementArgs): any;
}

/**
 * Constructor for DuplicateElementCommand
 */
export interface DuplicateElementCommandConstructor {
	new (options?: any): DuplicateElementCommand;
	extend(proto: any, staticProps?: any): DuplicateElementCommandConstructor;
}

declare const Duplicate: DuplicateElementCommandConstructor;

export { Duplicate };
export default Duplicate;