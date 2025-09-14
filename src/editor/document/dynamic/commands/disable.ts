/**
 * Document Dynamic Disable Command
 *
 * Mirrors editor/document/dynamic/commands/disable.js
 * Disables dynamic content for container settings
 */

import type { CommandDisableEnable, DisableEnableCommandArgs } from '../../../commands/base/index';

/**
 * Disable command for document dynamic content operations
 * Disables dynamic content when switching from dynamic to static
 */
export interface DynamicDisableCommand extends CommandDisableEnable {
	/**
	 * Apply disable operation to containers
	 * Removes dynamic values and enables static content
	 */
	apply(args: DisableEnableCommandArgs): void;
}

/**
 * Constructor for DynamicDisableCommand
 */
export interface DynamicDisableCommandConstructor {
	new (options?: any): DynamicDisableCommand;
	extend(proto: any, staticProps?: any): DynamicDisableCommandConstructor;
	getName(): string;
	getEnableCommand(): string;
	getDisableCommand(): string;
}

declare const DynamicDisable: DynamicDisableCommandConstructor;

export { DynamicDisable };
export default DynamicDisable;