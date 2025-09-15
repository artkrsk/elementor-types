/**
 * Document Data Elements Duplicate Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/duplicate/default.js
 * Handles default element duplication operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for duplicate element hook
 */
export interface DuplicateElementHookArgs {
	containers?: any[];
	target?: any;
	options?: {
		at?: number;
		name?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Duplicate Element hook for data operations
 * Handles element duplication with proper cloning
 */
export interface DuplicateElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/duplicate';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: DuplicateElementHookArgs): boolean;

	/**
	 * Apply element duplication processing
	 */
	apply(args: DuplicateElementHookArgs): void;
}

/**
 * Constructor for DuplicateElementHook
 */
export interface DuplicateElementHookConstructor {
	new (options?: any): DuplicateElementHook;
	extend(proto: any, staticProps?: any): DuplicateElementHookConstructor;
}

declare const DuplicateElementDefault: DuplicateElementHookConstructor;

export { DuplicateElementDefault };
export default DuplicateElementDefault;