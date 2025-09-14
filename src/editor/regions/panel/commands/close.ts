/**
 * Panel Close Command
 *
 * Mirrors editor/regions/panel/commands/close.js
 * Closes the panel and switches to preview mode
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Close command for panel region
 * Switches editor to preview mode and closes the panel
 */
export interface CloseCommand extends CommandBase {
	/**
	 * Apply close operation
	 * Changes edit mode to preview
	 */
	apply(): void;
}

/**
 * Constructor for CloseCommand
 */
export interface CloseCommandConstructor {
	new (options?: any): CloseCommand;
	extend(proto: any, staticProps?: any): CloseCommandConstructor;
}

declare const Close: CloseCommandConstructor;

export { Close };
export default Close;