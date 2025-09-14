/**
 * Document History Internal End Log Command
 *
 * Mirrors editor/document/history/commands/internal/end-log.js
 * Ends a history log entry
 */

import type { CommandBase } from '../../../../commands/base';

/**
 * Arguments for end log command
 */
export interface EndLogArgs {
	id: number;
	[key: string]: any;
}

/**
 * End Log command for document history internal operations
 * Completes a history log entry and finalizes the change record
 */
export interface EndLogCommand extends CommandBase {
	/**
	 * Apply end log operation
	 */
	apply(args: EndLogArgs): void;
}

/**
 * Constructor for EndLogCommand
 */
export interface EndLogCommandConstructor {
	new (options?: any): EndLogCommand;
	extend(proto: any, staticProps?: any): EndLogCommandConstructor;
}

declare const EndLog: EndLogCommandConstructor;

export { EndLog };
export default EndLog;