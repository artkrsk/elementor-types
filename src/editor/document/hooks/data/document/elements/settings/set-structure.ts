/**
 * Document Data Elements Settings Set Structure Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/settings/set-structure.js
 * Handles structure changes for section elements
 */

import type { DataHook } from './handle-dynamic';

/**
 * Arguments for set structure hook
 */
export interface SetStructureHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		structure?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Set Structure hook for data settings operations
 * Handles structure changes for section elements
 */
export interface SetStructureHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'set-structure';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: SetStructureHookArgs): boolean;

	/**
	 * Apply structure changes to containers
	 */
	apply(args: SetStructureHookArgs): void;
}

/**
 * Constructor for SetStructureHook
 */
export interface SetStructureHookConstructor {
	new (options?: any): SetStructureHook;
	extend(proto: any, staticProps?: any): SetStructureHookConstructor;
}

declare const SetStructure: SetStructureHookConstructor;

export { SetStructure };
export default SetStructure;