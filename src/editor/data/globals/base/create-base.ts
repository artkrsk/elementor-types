/**
 * Base Create Command for Global Values
 *
 * Mirrors editor/data/globals/base/create-base.js
 * Base class for creating global color and typography values
 */

import type { CommandContainerBase } from '../../../commands';

export interface CreateBaseArgs {
	container: any;
	setting: string;
	title: string;
}

/**
 * Base class for global value creation commands
 * Extends CommandContainerBase with validation for global value creation
 */
export interface CreateBase extends CommandContainerBase {
	/**
	 * Validate arguments for global value creation
	 * @param args - Arguments containing container, setting, and title
	 */
	validateArgs(args: CreateBaseArgs): void;
}

/**
 * Constructor for CreateBase command
 */
export interface CreateBaseConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CreateBaseConstructor;
}

declare const CreateBase: CreateBaseConstructor;

export { CreateBase };
export default CreateBase;