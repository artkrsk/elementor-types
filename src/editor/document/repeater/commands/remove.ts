/**
 * Document Repeater Remove Command
 *
 * Mirrors editor/document/repeater/commands/remove.js
 * Handles removing items from repeater controls
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for repeater remove command
 */
export interface RepeaterRemoveArgs {
	container?: any;
	index?: number;
	name?: string;
	[key: string]: any;
}

/**
 * Remove command for repeater controls
 * Removes items from repeater field arrays
 */
export interface RepeaterRemoveCommand extends CommandBase {
	/**
	 * Apply remove operation to repeater
	 */
	apply(args: RepeaterRemoveArgs): any;

	/**
	 * Validate remove arguments
	 */
	validateArgs(args: RepeaterRemoveArgs): void;
}

/**
 * Constructor for RepeaterRemoveCommand
 */
export interface RepeaterRemoveCommandConstructor {
	new (options?: any): RepeaterRemoveCommand;
	extend(proto: any, staticProps?: any): RepeaterRemoveCommandConstructor;
}

declare const Remove: RepeaterRemoveCommandConstructor;

export { Remove };
export default Remove;