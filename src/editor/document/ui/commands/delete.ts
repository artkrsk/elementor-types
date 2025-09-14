/**
 * Document UI Delete Command
 *
 * Mirrors editor/document/ui/commands/delete.js
 * Handles deletion of selected elements in the document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Delete command for document UI operations
 * Deletes selected elements from the document
 */
export interface DeleteCommand extends CommandBase {
	/**
	 * Apply delete operation to selected elements
	 */
	apply(): boolean | any;
}

/**
 * Constructor for DeleteCommand
 */
export interface DeleteCommandConstructor {
	new (options?: any): DeleteCommand;
	extend(proto: any, staticProps?: any): DeleteCommandConstructor;
}

declare const Delete: DeleteCommandConstructor;

export { Delete };
export default Delete;