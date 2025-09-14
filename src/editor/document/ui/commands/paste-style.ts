/**
 * Document UI Paste Style Command
 *
 * Mirrors editor/document/ui/commands/paste-style.js
 * Handles pasting of styles to selected elements
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for paste style command
 */
export interface PasteStyleCommandArgs {
	containers?: any[];
	settings?: any;
	[key: string]: any;
}

/**
 * Paste Style command for document UI operations
 * Pastes copied styles to selected elements
 */
export interface PasteStyleCommand extends CommandBase {
	/**
	 * Apply paste style operation
	 */
	apply(args: PasteStyleCommandArgs): any;

	/**
	 * Validate paste style arguments
	 */
	validateArgs(args: PasteStyleCommandArgs): void;
}

/**
 * Constructor for PasteStyleCommand
 */
export interface PasteStyleCommandConstructor {
	new (options?: any): PasteStyleCommand;
	extend(proto: any, staticProps?: any): PasteStyleCommandConstructor;
}

declare const PasteStyle: PasteStyleCommandConstructor;

export { PasteStyle };
export default PasteStyle;