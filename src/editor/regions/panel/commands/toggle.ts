/**
 * Panel Toggle Command
 *
 * Mirrors editor/regions/panel/commands/toggle.js
 * Toggles panel visibility between edit and preview modes
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Toggle command for panel region
 * Switches between edit mode (panel open) and preview mode (panel closed)
 */
export interface ToggleCommand extends CommandBase {
	/**
	 * Apply toggle operation
	 * Toggles between edit and preview modes
	 */
	apply(): void;
}

/**
 * Constructor for ToggleCommand
 */
export interface ToggleCommandConstructor {
	new (options?: any): ToggleCommand;
	extend(proto: any, staticProps?: any): ToggleCommandConstructor;
}

declare const Toggle: ToggleCommandConstructor;

export { Toggle };
export default Toggle;