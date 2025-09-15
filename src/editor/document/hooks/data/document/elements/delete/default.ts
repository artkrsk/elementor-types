/**
 * Document Data Elements Delete Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/delete/default.js
 * Handles default element deletion operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for delete element hook
 */
export interface DeleteElementHookArgs {
	containers?: any[];
	options?: {
		at?: number;
		shouldUpdateHistory?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Delete Element hook for data operations
 * Handles element deletion with proper cleanup
 */
export interface DeleteElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/delete';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: DeleteElementHookArgs): boolean;

	/**
	 * Apply element deletion processing
	 */
	apply(args: DeleteElementHookArgs): void;
}

/**
 * Constructor for DeleteElementHook
 */
export interface DeleteElementHookConstructor {
	new (options?: any): DeleteElementHook;
	extend(proto: any, staticProps?: any): DeleteElementHookConstructor;
}

declare const DeleteElementDefault: DeleteElementHookConstructor;

export { DeleteElementDefault };
export default DeleteElementDefault;