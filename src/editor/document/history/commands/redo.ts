/**
 * Document History Redo Command
 *
 * Mirrors editor/document/history/commands/redo.js
 * Redoes the previously undone change in the document history
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for redo command
 */
export interface RedoArgs {
	document?: {
		history: {
			navigate(direction: number): void;
		};
	};
	[key: string]: any;
}

/**
 * Redo command for document history
 * Re-applies the previously undone change in the document
 */
export interface RedoCommand extends CommandBase {
	/**
	 * Apply redo operation
	 */
	apply(args: RedoArgs): void;
}

/**
 * Constructor for RedoCommand
 */
export interface RedoCommandConstructor {
	new (options?: any): RedoCommand;
	extend(proto: any, staticProps?: any): RedoCommandConstructor;
}

declare const Redo: RedoCommandConstructor;

export { Redo };
export default Redo;