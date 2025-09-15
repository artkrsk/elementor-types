/**
 * Document UI Settings Exit To Hook
 *
 * Mirrors editor/document/hooks/ui/settings/exit-to.js
 * Handles exit-to functionality for document settings
 */

import type { UIHook } from './draggable';

/**
 * Exit To hook arguments
 */
export interface ExitToHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		exit_to?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Exit To Hook for UI settings operations
 * Handles exit-to functionality when settings change
 */
export interface ExitToHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): string;

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'exit-to';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: ExitToHookArgs): boolean;

	/**
	 * Apply exit-to functionality to containers
	 */
	apply(args: ExitToHookArgs): void;
}

/**
 * Constructor for ExitToHook
 */
export interface ExitToHookConstructor {
	new (options?: any): ExitToHook;
	extend(proto: any, staticProps?: any): ExitToHookConstructor;
}

declare const ExitTo: ExitToHookConstructor;

export { ExitTo };
export default ExitTo;