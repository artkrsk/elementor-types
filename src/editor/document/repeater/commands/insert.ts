/**
 * Document Repeater Insert Command
 *
 * Mirrors editor/document/repeater/commands/insert.js
 * Handles inserting new items into repeater controls
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for repeater insert command
 */
export interface RepeaterInsertArgs {
	container?: any;
	model?: any;
	at?: number;
	name?: string;
	[key: string]: any;
}

/**
 * Insert command for repeater controls
 * Inserts new items into repeater field arrays
 */
export interface RepeaterInsertCommand extends CommandBase {
	/**
	 * Apply insert operation to repeater
	 */
	apply(args: RepeaterInsertArgs): any;

	/**
	 * Validate insert arguments
	 */
	validateArgs(args: RepeaterInsertArgs): void;
}

/**
 * Constructor for RepeaterInsertCommand
 */
export interface RepeaterInsertCommandConstructor {
	new (options?: any): RepeaterInsertCommand;
	extend(proto: any, staticProps?: any): RepeaterInsertCommandConstructor;
}

declare const Insert: RepeaterInsertCommandConstructor;

export { Insert };
export default Insert;