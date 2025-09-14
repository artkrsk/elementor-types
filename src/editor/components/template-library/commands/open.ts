/**
 * Template Library Open Command
 *
 * Mirrors editor/components/template-library/commands/open.js
 * Opens the template library modal
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for template library open command
 */
export interface TemplateLibraryOpenArgs {
	toDefault?: boolean;
	importOptions?: any;
	[key: string]: any;
}

/**
 * Open command for template library
 * Opens the template library modal with specified configuration
 */
export interface TemplateLibraryOpenCommand extends CommandBase {
	/**
	 * Apply open operation
	 */
	apply(args?: TemplateLibraryOpenArgs): any;

	/**
	 * Validate open arguments
	 */
	validateArgs(args?: TemplateLibraryOpenArgs): void;
}

/**
 * Constructor for TemplateLibraryOpenCommand
 */
export interface TemplateLibraryOpenCommandConstructor {
	new (options?: any): TemplateLibraryOpenCommand;
	extend(proto: any, staticProps?: any): TemplateLibraryOpenCommandConstructor;
}

declare const Open: TemplateLibraryOpenCommandConstructor;

export { Open };
export default Open;