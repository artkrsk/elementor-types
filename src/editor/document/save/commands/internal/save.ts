/**
 * Document Save Internal Save Command
 *
 * Mirrors editor/document/save/commands/internal/save.js
 * Internal save operation that handles the actual save process
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for internal save command
 */
export interface InternalSaveArgs {
	document?: any;
	status?: string;
	data?: any;
	onSuccess?: Function;
	onError?: Function;
	[key: string]: any;
}

/**
 * Internal Save command for document save operations
 * Performs the actual save operation to the backend
 */
export interface InternalSaveCommand extends CommandBase {
	/**
	 * Apply internal save operation
	 */
	apply(args: InternalSaveArgs): any;

	/**
	 * Validate internal save arguments
	 */
	validateArgs(args: InternalSaveArgs): void;
}

/**
 * Constructor for InternalSaveCommand
 */
export interface InternalSaveCommandConstructor {
	new (options?: any): InternalSaveCommand;
	extend(proto: any, staticProps?: any): InternalSaveCommandConstructor;
}

declare const Save: InternalSaveCommandConstructor;

export { Save };
export default Save;