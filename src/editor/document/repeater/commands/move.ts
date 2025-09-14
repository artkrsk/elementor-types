/**
 * Document Repeater Move Command
 *
 * Mirrors editor/document/repeater/commands/move.js
 * Handles moving items within repeater controls
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for repeater move command
 */
export interface RepeaterMoveArgs {
	container?: any;
	sourceIndex: number;
	targetIndex: number;
	name?: string;
	[key: string]: any;
}

/**
 * Move command for repeater controls
 * Moves items within repeater field arrays
 */
export interface RepeaterMoveCommand extends CommandBase {
	/**
	 * Apply move operation to repeater
	 */
	apply(args: RepeaterMoveArgs): any;

	/**
	 * Validate move arguments
	 */
	validateArgs(args: RepeaterMoveArgs): void;
}

/**
 * Constructor for RepeaterMoveCommand
 */
export interface RepeaterMoveCommandConstructor {
	new (options?: any): RepeaterMoveCommand;
	extend(proto: any, staticProps?: any): RepeaterMoveCommandConstructor;
}

declare const Move: RepeaterMoveCommandConstructor;

export { Move };
export default Move;