/**
 * Document History Undo Command
 *
 * Mirrors editor/document/history/commands/undo.js
 * Undoes the last change in the document history
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for undo command
 */
export interface UndoArgs {
	document?: {
		history: {
			navigate(direction: number): void;
		};
	};
	[key: string]: any;
}

/**
 * Undo command for document history
 * Reverts the last change in the document
 */
export interface UndoCommand extends CommandBase {
	/**
	 * Apply undo operation
	 */
	apply(args: UndoArgs): void;
}

/**
 * Constructor for UndoCommand
 */
export interface UndoCommandConstructor {
	new (options?: any): UndoCommand;
	extend(proto: any, staticProps?: any): UndoCommandConstructor;
}

declare const Undo: UndoCommandConstructor;

export { Undo };
export default Undo;