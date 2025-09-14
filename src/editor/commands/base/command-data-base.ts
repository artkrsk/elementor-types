/**
 * Command Data Base
 *
 * Mirrors editor/commands/base/command-data-base.js
 * Base class for data-related commands
 */

import type { CommandBase } from '../base';

/**
 * Base command for data operations
 * Handles data manipulation and validation
 */
export interface CommandDataBase extends CommandBase {
	/**
	 * Validate data arguments
	 */
	validateData(args: any): void;

	/**
	 * Process data before applying
	 */
	processData(data: any): any;

	/**
	 * Apply data changes
	 */
	applyData(args: any): any;
}

/**
 * Constructor for CommandDataBase
 */
export interface CommandDataBaseConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CommandDataBaseConstructor;
}

declare const CommandDataBase: CommandDataBaseConstructor;

export { CommandDataBase };
export default CommandDataBase;