/**
 * Template Library Insert Template Command
 *
 * Mirrors editor/components/template-library/commands/insert-template.js
 * Inserts templates into the document
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for insert template command
 */
export interface InsertTemplateArgs {
	model: any;
	withPageSettings?: boolean;
	importOptions?: any;
	onAfter?: () => void;
	[key: string]: any;
}

/**
 * Insert Template command for template library
 * Downloads and inserts templates into the current document
 */
export interface InsertTemplateCommand extends CommandBase {
	/**
	 * Apply insert template operation
	 */
	apply(args: InsertTemplateArgs): any;

	/**
	 * Validate insert template arguments
	 */
	validateArgs(args: InsertTemplateArgs): void;
}

/**
 * Constructor for InsertTemplateCommand
 */
export interface InsertTemplateCommandConstructor {
	new (options?: any): InsertTemplateCommand;
	extend(proto: any, staticProps?: any): InsertTemplateCommandConstructor;
}

declare const InsertTemplate: InsertTemplateCommandConstructor;

export { InsertTemplate };
export default InsertTemplate;