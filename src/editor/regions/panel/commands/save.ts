/**
 * Panel Save Command
 *
 * Mirrors editor/regions/panel/commands/save.js
 * Handles saving from the panel interface
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for panel save command
 */
export interface PanelSaveArgs {
	document?: any;
	force?: boolean;
	[key: string]: any;
}

/**
 * Save command for panel region
 * Triggers document save operations from the panel
 */
export interface PanelSaveCommand extends CommandBase {
	/**
	 * Apply save operation from panel
	 */
	apply(args?: PanelSaveArgs): any;
}

/**
 * Constructor for PanelSaveCommand
 */
export interface PanelSaveCommandConstructor {
	new (options?: any): PanelSaveCommand;
	extend(proto: any, staticProps?: any): PanelSaveCommandConstructor;
}

declare const Save: PanelSaveCommandConstructor;

export { Save };
export default Save;