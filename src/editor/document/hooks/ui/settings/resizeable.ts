/**
 * Document UI Settings Resizeable Hook
 *
 * Mirrors editor/document/hooks/ui/settings/resizeable.js
 * Handles resizeable functionality for positioned elements
 */

import type { UIHook } from './draggable';

/**
 * Arguments for resizeable hook
 */
export interface ResizeableHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		_position?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Resizeable hook for UI settings operations
 * Toggles resizeable functionality based on position settings
 */
export interface ResizeableHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'resizeable';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: ResizeableHookArgs): boolean;

	/**
	 * Apply resizeable toggle to containers
	 */
	apply(args: ResizeableHookArgs): void;
}

/**
 * Constructor for ResizeableHook
 */
export interface ResizeableHookConstructor {
	new (options?: any): ResizeableHook;
	extend(proto: any, staticProps?: any): ResizeableHookConstructor;
}

declare const Resizeable: ResizeableHookConstructor;

export { Resizeable };
export default Resizeable;