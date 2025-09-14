/**
 * Create Global Typography Command
 *
 * Mirrors editor/data/globals/typography/commands/create.js
 * Command for creating new global typography values
 */

import type { CreateBase, CreateBaseArgs } from '../../base/create-base';

/**
 * Arguments for creating a global typography
 */
export interface CreateTypographyArgs extends CreateBaseArgs {
	setting: string;
	title: string;
	container: any;
}

/**
 * Create Global Typography Command
 * Creates new global typography values that can be used across the site
 */
export interface CreateTypographyCommand extends CreateBase {
	/**
	 * Validate arguments for typography creation
	 */
	validateArgs(args: CreateTypographyArgs): void;

	/**
	 * Execute typography creation
	 */
	apply(args: CreateTypographyArgs): any;
}

/**
 * Constructor for CreateTypography command
 */
export interface CreateTypographyCommandConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CreateTypographyCommandConstructor;
}

declare const CreateTypographyCommand: CreateTypographyCommandConstructor;

export { CreateTypographyCommand };
export default CreateTypographyCommand;