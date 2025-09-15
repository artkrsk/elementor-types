/**
 * Command Container Base
 *
 * Mirrors editor/command-bases/command-container-base.js
 * Base class for commands that operate on containers
 */

import type { CommandBase } from "../../core";

/**
 * Container command arguments interface
 */
export interface ContainerCommandArgs {
	container?: any;
	containers?: any[];
	[key: string]: any;
}

/**
 * Base class for commands that operate on Elementor containers
 * Provides container validation and utility methods
 */
export interface CommandContainerBase extends CommandBase {
	/**
	 * Command arguments with container support
	 */
	args: ContainerCommandArgs;

	/**
	 * Get instance type identifier
	 */
	getInstanceType(): string;

	/**
	 * Validate container or containers arguments
	 * Ensures exactly one of container/containers is provided
	 *
	 * @param args - Command arguments to validate
	 * @throws Error if validation fails
	 */
	requireContainer(args?: ContainerCommandArgs): void;

	/**
	 * Require argument instance validation
	 * Inherited from CommandBase for container type checking
	 */
	requireArgumentInstance(property: string, instanceType: any, args?: any): void;
}

/**
 * Constructor for CommandContainerBase
 */
export interface CommandContainerBaseConstructor {
	new (args?: ContainerCommandArgs): CommandContainerBase;

	/**
	 * Static method to get instance type
	 */
	getInstanceType(): 'CommandContainerBase';

	/**
	 * Extend method for creating subclasses
	 */
	extend(properties: any): CommandContainerBaseConstructor;
}

declare const CommandContainerBase: CommandContainerBaseConstructor;

export { CommandContainerBase };
export default CommandContainerBase;