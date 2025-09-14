/**
 * Document UI Paste Command
 *
 * Mirrors editor/document/ui/commands/paste.js
 * Handles pasting of elements in the document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for paste command
 */
export interface PasteCommandArgs {
	container?: any;
	containers?: any[];
	at?: number;
	rebuild?: boolean;
	[key: string]: any;
}

/**
 * Paste command for document UI operations
 * Pastes copied elements into the document
 */
export interface PasteCommand extends CommandBase {
	/**
	 * Apply paste operation
	 */
	apply(args: PasteCommandArgs): any;

	/**
	 * Validate paste arguments
	 */
	validateArgs(args: PasteCommandArgs): void;
}

/**
 * Constructor for PasteCommand
 */
export interface PasteCommandConstructor {
	new (options?: any): PasteCommand;
	extend(proto: any, staticProps?: any): PasteCommandConstructor;
}

declare const Paste: PasteCommandConstructor;

export { Paste };
export default Paste;