/**
 * Document UI Delete Section Is Full Hook
 *
 * Mirrors editor/document/hooks/ui/delete/section-is-full.js
 * Handles section deletion when section is full
 */

import type { UIHook } from '../settings/draggable';

/**
 * Section Is Full Delete hook arguments
 */
export interface SectionIsFullDeleteHookArgs {
	container?: any;
	containers?: any[];
	[key: string]: any;
}

/**
 * Section Is Full Delete Hook
 * Handles section deletion logic when section contains elements
 */
export interface SectionIsFullDeleteHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/delete';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'section-is-full';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: SectionIsFullDeleteHookArgs): boolean;

	/**
	 * Apply section deletion logic
	 */
	apply(args: SectionIsFullDeleteHookArgs): void;
}

/**
 * Constructor for SectionIsFullDeleteHook
 */
export interface SectionIsFullDeleteHookConstructor {
	new (options?: any): SectionIsFullDeleteHook;
	extend(proto: any, staticProps?: any): SectionIsFullDeleteHookConstructor;
}

declare const SectionIsFullDelete: SectionIsFullDeleteHookConstructor;

export { SectionIsFullDelete };
export default SectionIsFullDelete;