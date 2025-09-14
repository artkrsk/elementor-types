/**
 * Document History Internal Start Log Command
 *
 * Mirrors editor/document/history/commands/internal/start-log.js
 * Starts a new history log entry
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for start log command
 */
export interface StartLogArgs {
	title?: string;
	type?: string;
	containers?: any[];
	data?: any;
	restore?: Function;
	[key: string]: any;
}

/**
 * Start Log command for document history internal operations
 * Begins a new history log entry for tracking changes
 */
export interface StartLogCommand extends CommandBase {
	/**
	 * Apply start log operation
	 */
	apply(args: StartLogArgs): number;
}

/**
 * Constructor for StartLogCommand
 */
export interface StartLogCommandConstructor {
	new (options?: any): StartLogCommand;
	extend(proto: any, staticProps?: any): StartLogCommandConstructor;
}

declare const StartLog: StartLogCommandConstructor;

export { StartLog };
export default StartLog;