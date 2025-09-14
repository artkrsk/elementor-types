/**
 * Documents Open Command
 *
 * Mirrors editor/components/documents/commands/open.js
 * Opens a specific document in the editor
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for document open command
 */
export interface DocumentOpenArgs {
	id: string | number;
	shouldScroll?: boolean;
	shouldNavigateToDefaultRoute?: boolean;
	selector?: string;
	setAsInitial?: boolean;
	[key: string]: any;
}

/**
 * Open command for documents
 * Opens and loads a document for editing
 */
export interface DocumentOpenCommand extends CommandBase {
	/**
	 * Validate open arguments
	 */
	validateArgs(args: DocumentOpenArgs): void;

	/**
	 * Apply document open operation
	 */
	apply(args: DocumentOpenArgs): Promise<any>;
}

/**
 * Constructor for DocumentOpenCommand
 */
export interface DocumentOpenCommandConstructor {
	new (options?: any): DocumentOpenCommand;
	extend(proto: any, staticProps?: any): DocumentOpenCommandConstructor;
}

declare const Open: DocumentOpenCommandConstructor;

export { Open };
export default Open;