/**
 * Document Save Base Command
 *
 * Mirrors editor/document/save/commands/base/base.js
 * Base class for all save-related commands
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for save base command
 */
export interface SaveBaseArgs {
	document?: any;
	status?: string;
	force?: boolean;
	onSuccess?: Function;
	[key: string]: any;
}

/**
 * Base command for document save operations
 * Provides common functionality for all save commands
 */
export interface SaveBase extends CommandBase {
	/**
	 * Document instance for this save operation
	 */
	document: any;

	/**
	 * Apply save operation
	 */
	apply(args: SaveBaseArgs): any;

	/**
	 * Validate save arguments
	 */
	validateArgs(args: SaveBaseArgs): void;
}

/**
 * Constructor for SaveBase
 */
export interface SaveBaseConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): SaveBaseConstructor;
}

declare const SaveBase: SaveBaseConstructor;

export { SaveBase };
export default SaveBase;