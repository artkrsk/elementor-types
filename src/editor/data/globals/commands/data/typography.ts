/**
 * Global Typography Data Command
 *
 * Mirrors editor/data/globals/commands/data/typography.js
 * Data command for global typography API endpoints
 */

import type { CommandData } from '../../../../commands';

/**
 * Typography Data Command
 * Handles data operations for global typography
 */
export interface TypographyDataCommand extends CommandData {
	/**
	 * Get API endpoint format for typography
	 */
	getEndpointFormat(): 'globals/typography/{id}';
}

/**
 * Static interface for Typography data command
 */
export interface TypographyDataCommandStatic {
	/**
	 * Static method to get endpoint format
	 */
	getEndpointFormat(): 'globals/typography/{id}';
}

/**
 * Constructor for Typography data command
 */
export interface TypographyDataCommandConstructor extends TypographyDataCommandStatic {
	new (): TypographyDataCommand;
	extend(proto: any, staticProps?: any): TypographyDataCommandConstructor;
}

declare const TypographyDataCommand: TypographyDataCommandConstructor;

export { TypographyDataCommand as Typography };
export default TypographyDataCommand;