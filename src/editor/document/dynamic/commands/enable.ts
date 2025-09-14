/**
 * Document Dynamic Enable Command
 *
 * Mirrors editor/document/dynamic/commands/enable.js
 * Enables dynamic content for container settings
 */

import type { CommandDisableEnable, DisableEnableCommandArgs } from '../../../commands/base/index';

/**
 * Enable command for document dynamic content operations
 * Enables dynamic content when switching from static to dynamic
 */
export interface DynamicEnableCommand extends CommandDisableEnable {
	/**
	 * Apply enable operation to containers
	 * Sets dynamic values and configures dynamic content
	 */
	apply(args: DisableEnableCommandArgs): void;
}

/**
 * Constructor for DynamicEnableCommand
 */
export interface DynamicEnableCommandConstructor {
	new (options?: any): DynamicEnableCommand;
	extend(proto: any, staticProps?: any): DynamicEnableCommandConstructor;
	getName(): string;
	getEnableCommand(): string;
	getDisableCommand(): string;
}

declare const DynamicEnable: DynamicEnableCommandConstructor;

export { DynamicEnable };
export default DynamicEnable;