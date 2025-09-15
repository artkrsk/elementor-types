/**
 * Document UI Create Section Is Full Hook
 *
 * Mirrors editor/document/hooks/ui/create/section-is-full.js
 * Handles element creation when section is full
 */

import type { UIHook } from '../settings/draggable';

/**
 * Section Is Full Create hook arguments
 */
export interface SectionIsFullCreateHookArgs {
	container?: any;
	containers?: any[];
	model?: any;
	[key: string]: any;
}

/**
 * Section Is Full Create Hook
 * Handles element creation logic when section is at capacity
 */
export interface SectionIsFullCreateHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/create';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'section-is-full';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: SectionIsFullCreateHookArgs): boolean;

	/**
	 * Apply section creation logic
	 */
	apply(args: SectionIsFullCreateHookArgs): void;
}

/**
 * Constructor for SectionIsFullCreateHook
 */
export interface SectionIsFullCreateHookConstructor {
	new (options?: any): SectionIsFullCreateHook;
	extend(proto: any, staticProps?: any): SectionIsFullCreateHookConstructor;
}

declare const SectionIsFullCreate: SectionIsFullCreateHookConstructor;

export { SectionIsFullCreate };
export default SectionIsFullCreate;