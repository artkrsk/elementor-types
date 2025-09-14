/**
 * Document UI Duplicate Command
 *
 * Mirrors editor/document/ui/commands/duplicate.js
 * Handles duplication of selected elements in the document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for duplicate command
 */
export interface DuplicateCommandArgs {
	containers?: any[];
	[key: string]: any;
}

/**
 * Duplicate command for document UI operations
 * Duplicates selected elements in the document
 */
export interface DuplicateCommand extends CommandBase {
	/**
	 * Apply duplicate operation
	 */
	apply(args: DuplicateCommandArgs): any;

	/**
	 * Validate duplicate arguments
	 */
	validateArgs(args: DuplicateCommandArgs): void;
}

/**
 * Constructor for DuplicateCommand
 */
export interface DuplicateCommandConstructor {
	new (options?: any): DuplicateCommand;
	extend(proto: any, staticProps?: any): DuplicateCommandConstructor;
}

declare const Duplicate: DuplicateCommandConstructor;

export { Duplicate };
export default Duplicate;