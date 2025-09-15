/**
 * Command Container Internal Base
 *
 * Mirrors editor/command-bases/command-container-internal-base.js
 * Base class for internal commands that operate on containers
 */

import type { CommandContainerBase, ContainerCommandArgs } from './command-container-base';

/**
 * Base class for internal commands that operate on Elementor containers
 * Extends CommandContainerBase for internal command system integration
 */
export interface CommandContainerInternalBase extends CommandContainerBase {
	/**
	 * Get instance type identifier
	 */
	getInstanceType(): string;

	/**
	 * Internal command system instance
	 * Automatically registers with $e.commandsInternal
	 */
	commandsInstance: any;
}

/**
 * Constructor for CommandContainerInternalBase
 */
export declare class CommandContainerInternalBase implements CommandContainerBase {
	args: ContainerCommandArgs;
	commandsInstance: any;

	constructor(args?: ContainerCommandArgs);

	static getInstanceType(): string;
	getInstanceType(): string;
	requireContainer(args?: ContainerCommandArgs): void;
	requireArgumentInstance(property: string, instanceType: any, args?: any): void;

	// Extend method
	static extend(properties: any): any;
}

export default CommandContainerInternalBase;