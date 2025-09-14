/**
 * Global Colors Data Command
 *
 * Mirrors editor/data/globals/commands/data/colors.js
 * Data command for global colors API endpoints
 */

import type { CommandData } from '../../../../commands';

/**
 * Colors Data Command
 * Handles data operations for global colors
 */
export interface ColorsDataCommand extends CommandData {
	/**
	 * Get API endpoint format for colors
	 */
	getEndpointFormat(): 'globals/colors/{id}';
}

/**
 * Static interface for Colors data command
 */
export interface ColorsDataCommandStatic {
	/**
	 * Static method to get endpoint format
	 */
	getEndpointFormat(): 'globals/colors/{id}';
}

/**
 * Constructor for Colors data command
 */
export interface ColorsDataCommandConstructor extends ColorsDataCommandStatic {
	new (): ColorsDataCommand;
	extend(proto: any, staticProps?: any): ColorsDataCommandConstructor;
}

declare const ColorsDataCommand: ColorsDataCommandConstructor;

export { ColorsDataCommand as Colors };
export default ColorsDataCommand;