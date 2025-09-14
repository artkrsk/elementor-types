/**
 * Create Global Color Command
 *
 * Mirrors editor/data/globals/colors/commands/create.js
 * Command for creating new global color values
 */

import type { CreateBase, CreateBaseArgs } from '../../base/create-base';

/**
 * Arguments for creating a global color
 */
export interface CreateColorArgs extends CreateBaseArgs {
	setting: string;
	title: string;
	container: any;
}

/**
 * Create Global Color Command
 * Creates new global color values that can be used across the site
 */
export interface CreateColorCommand extends CreateBase {
	/**
	 * Validate arguments for color creation
	 */
	validateArgs(args: CreateColorArgs): void;

	/**
	 * Execute color creation
	 */
	apply(args: CreateColorArgs): any;
}

/**
 * Constructor for CreateColor command
 */
export interface CreateColorCommandConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CreateColorCommandConstructor;
}

declare const CreateColorCommand: CreateColorCommandConstructor;

export { CreateColorCommand };
export default CreateColorCommand;