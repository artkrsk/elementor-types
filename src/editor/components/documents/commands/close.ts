/**
 * Documents Close Command
 *
 * Mirrors editor/components/documents/commands/close.js
 * Closes the current document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for document close command
 */
export interface DocumentCloseArgs {
	id?: string | number;
	mode?: string;
	onClose?: () => void;
	selector?: string;
	[key: string]: any;
}

/**
 * Close command for documents
 * Closes and unloads a document from editing
 */
export interface DocumentCloseCommand extends CommandBase {
	/**
	 * Apply document close operation
	 */
	apply(args?: DocumentCloseArgs): Promise<any>;
}

/**
 * Constructor for DocumentCloseCommand
 */
export interface DocumentCloseCommandConstructor {
	new (options?: any): DocumentCloseCommand;
	extend(proto: any, staticProps?: any): DocumentCloseCommandConstructor;
}

declare const Close: DocumentCloseCommandConstructor;

export { Close };
export default Close;