/**
 * Document Save Internal Set Is Modified Command
 *
 * Mirrors editor/document/save/commands/internal/set-is-modified.js
 * Sets the modified state of the document
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for set is modified command
 */
export interface SetIsModifiedArgs {
	status: boolean;
	document?: any;
	[key: string]: any;
}

/**
 * Set Is Modified command for document save internal operations
 * Updates the modified state to track unsaved changes
 */
export interface SetIsModifiedCommand extends CommandBase {
	/**
	 * Apply set is modified operation
	 */
	apply(args: SetIsModifiedArgs): void;

	/**
	 * Validate set is modified arguments
	 */
	validateArgs(args: SetIsModifiedArgs): void;
}

/**
 * Constructor for SetIsModifiedCommand
 */
export interface SetIsModifiedCommandConstructor {
	new (options?: any): SetIsModifiedCommand;
	extend(proto: any, staticProps?: any): SetIsModifiedCommandConstructor;
}

declare const SetIsModified: SetIsModifiedCommandConstructor;

export { SetIsModified };
export default SetIsModified;