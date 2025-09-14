/**
 * Document UI Copy Command
 *
 * Mirrors editor/document/ui/commands/copy.js
 * Handles copying of selected elements in the document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Copy command for document UI operations
 * Copies selected elements to clipboard/internal storage
 */
export interface CopyCommand extends CommandBase {
	/**
	 * Apply copy operation to selected elements
	 */
	apply(): boolean | any;
}

/**
 * Constructor for CopyCommand
 */
export interface CopyCommandConstructor {
	new (options?: any): CopyCommand;
	extend(proto: any, staticProps?: any): CopyCommandConstructor;
}

declare const Copy: CopyCommandConstructor;

export { Copy };
export default Copy;