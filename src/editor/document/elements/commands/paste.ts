/**
 * Document Elements Paste Command
 *
 * Mirrors editor/document/elements/commands/paste.js
 * Pastes copied elements into the document
 */

import type { CommandHistoryBase } from '../../../commands/base/index';

/**
 * Arguments for paste element command
 */
export interface PasteElementArgs {
	container?: any;
	containers?: any[];
	at?: number;
	rebuild?: boolean;
	clone?: boolean;
	[key: string]: any;
}

/**
 * Paste command for document elements
 * Pastes previously copied elements with history support
 */
export interface PasteElementCommand extends CommandHistoryBase {
	/**
	 * Validate paste arguments
	 */
	validateArgs(args: PasteElementArgs): void;

	/**
	 * Get history configuration for this paste operation
	 */
	getHistory(args: PasteElementArgs): any;

	/**
	 * Apply paste operation to containers
	 */
	apply(args: PasteElementArgs): any;
}

/**
 * Constructor for PasteElementCommand
 */
export interface PasteElementCommandConstructor {
	new (options?: any): PasteElementCommand;
	extend(proto: any, staticProps?: any): PasteElementCommandConstructor;
}

declare const Paste: PasteElementCommandConstructor;

export { Paste };
export default Paste;