/**
 * Document Elements Copy Command
 *
 * Mirrors editor/document/elements/commands/copy.js
 * Copies elements to internal storage for pasting
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for copy element command
 */
export interface CopyElementArgs {
	container?: any;
	containers?: any[];
	[key: string]: any;
}

/**
 * Copy command for document elements
 * Copies selected elements to internal storage
 */
export interface CopyElementCommand extends CommandBase {
	/**
	 * Validate copy arguments
	 */
	validateArgs(args: CopyElementArgs): void;

	/**
	 * Apply copy operation to containers
	 */
	apply(args: CopyElementArgs): any;
}

/**
 * Constructor for CopyElementCommand
 */
export interface CopyElementCommandConstructor {
	new (options?: any): CopyElementCommand;
	extend(proto: any, staticProps?: any): CopyElementCommandConstructor;
}

declare const Copy: CopyElementCommandConstructor;

export { Copy };
export default Copy;