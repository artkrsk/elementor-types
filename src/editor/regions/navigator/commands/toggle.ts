/**
 * Navigator Toggle Command
 *
 * Mirrors editor/regions/navigator/commands/toggle.js
 * Toggles navigator panel visibility
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Toggle command for navigator region
 * Toggles the structure tree navigator visibility
 */
export interface NavigatorToggleCommand extends CommandBase {
	/**
	 * Apply toggle operation
	 */
	apply(): boolean;
}

/**
 * Constructor for NavigatorToggleCommand
 */
export interface NavigatorToggleCommandConstructor {
	new (options?: any): NavigatorToggleCommand;
	extend(proto: any, staticProps?: any): NavigatorToggleCommandConstructor;
}

declare const Toggle: NavigatorToggleCommandConstructor;

export { Toggle };
export default Toggle;