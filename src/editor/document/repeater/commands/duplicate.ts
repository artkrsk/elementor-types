/**
 * Document Repeater Duplicate Command
 *
 * Mirrors editor/document/repeater/commands/duplicate.js
 * Handles duplicating items in repeater controls
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for repeater duplicate command
 */
export interface RepeaterDuplicateArgs {
	container?: any;
	index: number;
	name?: string;
	[key: string]: any;
}

/**
 * Duplicate command for repeater controls
 * Duplicates existing items in repeater field arrays
 */
export interface RepeaterDuplicateCommand extends CommandBase {
	/**
	 * Apply duplicate operation to repeater
	 */
	apply(args: RepeaterDuplicateArgs): any;

	/**
	 * Validate duplicate arguments
	 */
	validateArgs(args: RepeaterDuplicateArgs): void;
}

/**
 * Constructor for RepeaterDuplicateCommand
 */
export interface RepeaterDuplicateCommandConstructor {
	new (options?: any): RepeaterDuplicateCommand;
	extend(proto: any, staticProps?: any): RepeaterDuplicateCommandConstructor;
}

declare const Duplicate: RepeaterDuplicateCommandConstructor;

export { Duplicate };
export default Duplicate;