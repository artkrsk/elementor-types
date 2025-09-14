/**
 * Document Data Elements Settings Handle Dynamic Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/settings/handle-dynamic.js
 * Handles dynamic content processing for element settings
 */

/**
 * Hook interface for data operations
 */
export interface DataHook {
	getCommand(): string;
	getId(): string;
	getConditions?(args: any): boolean;
	apply(args: any): void;
}

/**
 * Arguments for handle dynamic hook
 */
export interface HandleDynamicHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		__dynamic__?: any;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Handle Dynamic hook for data settings operations
 * Processes dynamic content in element settings
 */
export interface HandleDynamicHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'handle-dynamic';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: HandleDynamicHookArgs): boolean;

	/**
	 * Apply dynamic content processing to containers
	 */
	apply(args: HandleDynamicHookArgs): void;
}

/**
 * Constructor for HandleDynamicHook
 */
export interface HandleDynamicHookConstructor {
	new (options?: any): HandleDynamicHook;
	extend(proto: any, staticProps?: any): HandleDynamicHookConstructor;
}

declare const HandleDynamic: HandleDynamicHookConstructor;

export { HandleDynamic };
export default HandleDynamic;