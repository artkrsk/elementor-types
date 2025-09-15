/**
 * Document Data Elements Move Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/move/default.js
 * Handles default element move operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for move element hook
 */
export interface MoveElementHookArgs {
	containers?: any[];
	target?: any;
	options?: {
		at?: number;
		index?: number;
		rebuild?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Move Element hook for data operations
 * Handles element movement with structure updates
 */
export interface MoveElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/move';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: MoveElementHookArgs): boolean;

	/**
	 * Apply element move processing
	 */
	apply(args: MoveElementHookArgs): void;
}

/**
 * Constructor for MoveElementHook
 */
export interface MoveElementHookConstructor {
	new (options?: any): MoveElementHook;
	extend(proto: any, staticProps?: any): MoveElementHookConstructor;
}

declare const MoveElementDefault: MoveElementHookConstructor;

export { MoveElementDefault };
export default MoveElementDefault;