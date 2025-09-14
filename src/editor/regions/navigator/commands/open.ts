/**
 * Navigator Open Command
 *
 * Mirrors editor/regions/navigator/commands/open.js
 * Opens the navigator panel
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for navigator open command
 */
export interface NavigatorOpenArgs {
	model?: any;
	[key: string]: any;
}

/**
 * Open command for navigator region
 * Opens the structure tree navigator
 */
export interface NavigatorOpenCommand extends CommandBase {
	/**
	 * Apply open operation
	 */
	apply(args?: NavigatorOpenArgs): any;
}

/**
 * Constructor for NavigatorOpenCommand
 */
export interface NavigatorOpenCommandConstructor {
	new (options?: any): NavigatorOpenCommand;
	extend(proto: any, staticProps?: any): NavigatorOpenCommandConstructor;
}

declare const Open: NavigatorOpenCommandConstructor;

export { Open };
export default Open;