/**
 * Document Data Elements Create Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/create/default.js
 * Handles default element creation operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for create element hook
 */
export interface CreateElementHookArgs {
	model?: any;
	container?: any;
	containers?: any[];
	options?: {
		at?: number;
		clone?: boolean;
		edit?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Create Element hook for data operations
 * Handles element creation with proper data flow
 */
export interface CreateElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/create';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: CreateElementHookArgs): boolean;

	/**
	 * Apply element creation processing
	 */
	apply(args: CreateElementHookArgs): void;
}

/**
 * Constructor for CreateElementHook
 */
export interface CreateElementHookConstructor {
	new (options?: any): CreateElementHook;
	extend(proto: any, staticProps?: any): CreateElementHookConstructor;
}

declare const CreateElementDefault: CreateElementHookConstructor;

export { CreateElementDefault };
export default CreateElementDefault;