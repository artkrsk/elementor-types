/**
 * Document Globals Enable Command
 *
 * Mirrors editor/document/globals/commands/enable.js
 * Enables global values for container settings
 */

import type { CommandDisableEnable, DisableEnableCommandArgs } from '../../../commands/base/index';

/**
 * Enable command for document globals operations
 * Enables global values when switching from custom to global
 */
export interface EnableCommand extends CommandDisableEnable {
	/**
	 * Apply enable operation to containers
	 * Sets global values and clears custom settings
	 */
	apply(args: DisableEnableCommandArgs): void;
}

/**
 * Constructor for EnableCommand
 */
export interface EnableCommandConstructor {
	new (options?: any): EnableCommand;
	extend(proto: any, staticProps?: any): EnableCommandConstructor;
	getName(): string;
	getEnableCommand(): string;
	getDisableCommand(): string;
}

declare const Enable: EnableCommandConstructor;

export { Enable };
export default Enable;