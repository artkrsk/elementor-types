/**
 * Document Save Publish Command
 *
 * Mirrors editor/document/save/commands/publish.js
 * Handles publishing documents
 */

import type { SaveBase, SaveBaseArgs } from './base/base';

/**
 * Arguments for publish save command
 */
export interface PublishSaveArgs extends SaveBaseArgs {
	document?: any;
	status?: 'publish';
}

/**
 * Publish Save command for document save operations
 * Saves and publishes the document
 */
export interface PublishSaveCommand extends SaveBase {
	/**
	 * Apply publish save operation
	 */
	apply(args: PublishSaveArgs): any;
}

/**
 * Constructor for PublishSaveCommand
 */
export interface PublishSaveCommandConstructor {
	new (options?: any): PublishSaveCommand;
	extend(proto: any, staticProps?: any): PublishSaveCommandConstructor;
}

declare const Publish: PublishSaveCommandConstructor;

export { Publish };
export default Publish;