/**
 * Document UI Settings Set Direction Mode Hook
 *
 * Mirrors editor/document/hooks/ui/settings/set-direction-mode.js
 * Handles direction mode changes for flex containers
 */

import type { UIHook } from './draggable';

/**
 * Set Direction Mode hook arguments
 */
export interface SetDirectionModeHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		flex_direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Set Direction Mode Hook for UI settings operations
 * Handles flex direction changes and UI state updates
 */
export interface SetDirectionModeHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'set-direction-mode';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: SetDirectionModeHookArgs): boolean;

	/**
	 * Apply direction mode change functionality
	 */
	apply(args: SetDirectionModeHookArgs): void;
}

/**
 * Constructor for SetDirectionModeHook
 */
export interface SetDirectionModeHookConstructor {
	new (options?: any): SetDirectionModeHook;
	extend(proto: any, staticProps?: any): SetDirectionModeHookConstructor;
}

declare const SetDirectionMode: SetDirectionModeHookConstructor;

export { SetDirectionMode };
export default SetDirectionMode;