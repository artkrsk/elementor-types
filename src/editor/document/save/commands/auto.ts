/**
 * Document Save Auto Command
 *
 * Mirrors editor/document/save/commands/auto.js
 * Handles automatic saving of documents
 */

import type { SaveBase, SaveBaseArgs } from './base/base';

/**
 * Arguments for auto save command
 */
export interface AutoSaveArgs extends SaveBaseArgs {
	force?: boolean;
	document?: any;
}

/**
 * Auto Save command for document save operations
 * Automatically saves the document if changes are detected
 */
export interface AutoSaveCommand extends SaveBase {
	/**
	 * Apply auto save operation
	 * Checks if document is editable and changed before saving
	 */
	apply(args: AutoSaveArgs): any;
}

/**
 * Constructor for AutoSaveCommand
 */
export interface AutoSaveCommandConstructor {
	new (options?: any): AutoSaveCommand;
	extend(proto: any, staticProps?: any): AutoSaveCommandConstructor;
}

declare const Auto: AutoSaveCommandConstructor;

export { Auto };
export default Auto;