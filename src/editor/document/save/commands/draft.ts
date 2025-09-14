/**
 * Document Save Draft Command
 *
 * Mirrors editor/document/save/commands/draft.js
 * Handles saving documents as drafts
 */

import type { SaveBase, SaveBaseArgs } from './base/base';

/**
 * Arguments for draft save command
 */
export interface DraftSaveArgs extends SaveBaseArgs {
	document?: any;
	status?: 'draft';
}

/**
 * Draft Save command for document save operations
 * Saves the document with draft status
 */
export interface DraftSaveCommand extends SaveBase {
	/**
	 * Apply draft save operation
	 */
	apply(args: DraftSaveArgs): any;
}

/**
 * Constructor for DraftSaveCommand
 */
export interface DraftSaveCommandConstructor {
	new (options?: any): DraftSaveCommand;
	extend(proto: any, staticProps?: any): DraftSaveCommandConstructor;
}

declare const Draft: DraftSaveCommandConstructor;

export { Draft };
export default Draft;