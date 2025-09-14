/**
 * Document History Internal Delete Log Command
 *
 * Mirrors editor/document/history/commands/internal/delete-log.js
 * Deletes a history log entry
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for delete log command
 */
export interface DeleteLogArgs {
	id: number;
	[key: string]: any;
}

/**
 * Delete Log command for document history internal operations
 * Removes a history log entry from the history stack
 */
export interface DeleteLogCommand extends CommandBase {
	/**
	 * Apply delete log operation
	 */
	apply(args: DeleteLogArgs): void;
}

/**
 * Constructor for DeleteLogCommand
 */
export interface DeleteLogCommandConstructor {
	new (options?: any): DeleteLogCommand;
	extend(proto: any, staticProps?: any): DeleteLogCommandConstructor;
}

declare const DeleteLog: DeleteLogCommandConstructor;

export { DeleteLog };
export default DeleteLog;