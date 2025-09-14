/**
 * Document Globals Disable Command
 *
 * Mirrors editor/document/globals/commands/disable.js
 * Disables global values for container settings
 */

import type { CommandDisableEnable, DisableEnableCommandArgs } from '../../../commands/base/index';

/**
 * Disable command for document globals operations
 * Disables global values when switching from global to custom
 */
export interface DisableCommand extends CommandDisableEnable {
	/**
	 * Apply disable operation to containers
	 * Removes global values and enables custom settings
	 */
	apply(args: DisableEnableCommandArgs): void;
}

/**
 * Constructor for DisableCommand
 */
export interface DisableCommandConstructor {
	new (options?: any): DisableCommand;
	extend(proto: any, staticProps?: any): DisableCommandConstructor;
	getName(): string;
	getEnableCommand(): string;
	getDisableCommand(): string;
}

declare const Disable: DisableCommandConstructor;

export { Disable };
export default Disable;