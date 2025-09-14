/**
 * Navigator Close Command
 *
 * Mirrors editor/regions/navigator/commands/close.js
 * Closes the navigator panel
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for navigator close command
 */
export interface NavigatorCloseArgs {
	silent?: boolean;
	[key: string]: any;
}

/**
 * Close command for navigator region
 * Closes the structure tree navigator
 */
export interface NavigatorCloseCommand extends CommandBase {
	/**
	 * Apply close operation
	 */
	apply(args?: NavigatorCloseArgs): boolean;
}

/**
 * Constructor for NavigatorCloseCommand
 */
export interface NavigatorCloseCommandConstructor {
	new (options?: any): NavigatorCloseCommand;
	extend(proto: any, staticProps?: any): NavigatorCloseCommandConstructor;
}

declare const Close: NavigatorCloseCommandConstructor;

export { Close };
export default Close;