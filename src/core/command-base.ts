/**
 * Command Base Interface
 *
 * Base interface for all Elementor commands
 */

import type { ArgsObject } from './modules';

/**
 * Base command arguments interface
 */
export interface CommandArgs {
	[key: string]: any;
}

/**
 * Base command interface
 * Foundation for all Elementor commands
 */
export interface CommandBase extends ArgsObject {
	/**
	 * Command arguments
	 */
	args: CommandArgs;

	/**
	 * Get instance type identifier
	 */
	getInstanceType(): string;

	/**
	 * Apply the command
	 */
	apply(args?: CommandArgs): any;

	/**
	 * Validate the command arguments
	 */
	validateArgs(args?: CommandArgs): void;

	/**
	 * Get command dependencies
	 */
	getDependencies?(): string[];
}

/**
 * Constructor for CommandBase
 */
export interface CommandBaseConstructor {
	new (args?: CommandArgs): CommandBase;

	/**
	 * Static method to get instance type
	 */
	getInstanceType(): string;

	/**
	 * Extend method for creating subclasses
	 */
	extend(properties: any): CommandBaseConstructor;
}

declare const CommandBase: CommandBaseConstructor;

export { CommandBase };
export default CommandBase;