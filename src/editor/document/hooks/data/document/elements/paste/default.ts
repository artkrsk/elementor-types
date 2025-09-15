/**
 * Document Data Elements Paste Default Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/paste/default.js
 * Handles default element paste operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for paste element hook
 */
export interface PasteElementHookArgs {
	containers?: any[];
	target?: any;
	options?: {
		at?: number;
		storageData?: any;
		rebuild?: boolean;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Paste Element hook for data operations
 * Handles element pasting with proper positioning
 */
export interface PasteElementHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/paste';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'default';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: PasteElementHookArgs): boolean;

	/**
	 * Apply element paste processing
	 */
	apply(args: PasteElementHookArgs): void;
}

/**
 * Constructor for PasteElementHook
 */
export interface PasteElementHookConstructor {
	new (options?: any): PasteElementHook;
	extend(proto: any, staticProps?: any): PasteElementHookConstructor;
}

declare const PasteElementDefault: PasteElementHookConstructor;

export { PasteElementDefault };
export default PasteElementDefault;