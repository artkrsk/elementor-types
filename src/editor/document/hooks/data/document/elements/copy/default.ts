/**
 * Document Data Elements Copy Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/copy/default.js
 * Handles default element copy operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for copy element hook
 */
export interface CopyElementHookArgs {
	containers?: any[];
	options?: {
		storageData?: any;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Copy Element hook for data operations
 * Handles element copying with data preservation
 */
export interface CopyElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/copy';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: CopyElementHookArgs): boolean;

	/**
	 * Apply element copy processing
	 */
	apply(args: CopyElementHookArgs): void;
}

/**
 * Constructor for CopyElementHook
 */
export interface CopyElementHookConstructor {
	new (options?: any): CopyElementHook;
	extend(proto: any, staticProps?: any): CopyElementHookConstructor;
}

declare const CopyElementDefault: CopyElementHookConstructor;

export { CopyElementDefault };
export default CopyElementDefault;