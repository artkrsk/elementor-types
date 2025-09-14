/**
 * Document Globals Unlink Command
 *
 * Mirrors editor/document/globals/commands/unlink.js
 * Unlinks global values while preserving current values
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for unlink command
 */
export interface UnlinkCommandArgs {
	container?: any;
	containers?: any[];
	settings: any;
	[key: string]: any;
}

/**
 * Unlink command for document globals operations
 * Unlinks global values while keeping current computed values
 */
export interface UnlinkCommand extends CommandBase {
	/**
	 * Apply unlink operation to containers
	 * Preserves current values but removes global binding
	 */
	apply(args: UnlinkCommandArgs): void;

	/**
	 * Validate unlink arguments
	 */
	validateArgs(args: UnlinkCommandArgs): void;
}

/**
 * Constructor for UnlinkCommand
 */
export interface UnlinkCommandConstructor {
	new (options?: any): UnlinkCommand;
	extend(proto: any, staticProps?: any): UnlinkCommandConstructor;
}

declare const Unlink: UnlinkCommandConstructor;

export { Unlink };
export default Unlink;