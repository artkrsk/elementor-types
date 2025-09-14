/**
 * Document History Undo All Command
 *
 * Mirrors editor/document/history/commands/undo-all.js
 * Undoes all changes in the document history
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for undo all command
 */
export interface UndoAllArgs {
	document: {
		history: {
			doItem(index: number): void;
			getItems(): any[];
		};
	};
	[key: string]: any;
}

/**
 * Undo All command for document history
 * Reverts all changes to the document's initial state
 */
export interface UndoAllCommand extends CommandBase {
	/**
	 * Apply undo all operation
	 */
	apply(args: UndoAllArgs): void;
}

/**
 * Constructor for UndoAllCommand
 */
export interface UndoAllCommandConstructor {
	new (options?: any): UndoAllCommand;
	extend(proto: any, staticProps?: any): UndoAllCommandConstructor;
}

declare const UndoAll: UndoAllCommandConstructor;

export { UndoAll };
export default UndoAll;