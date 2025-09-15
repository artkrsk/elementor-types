/**
 * Base Region Hook Interfaces
 *
 * Common interfaces for all region hooks
 */

/**
 * Base region hook arguments interface
 */
export interface RegionHookArgs {
	region?: any;
	regionName?: string;
	options?: Record<string, any>;
	[key: string]: any;
}

/**
 * Base region hook interface
 */
export interface RegionHook {
	/**
	 * Get the region this hook applies to
	 */
	getRegion(): string;

	/**
	 * Get unique identifier for this hook
	 */
	getId(): string;

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: RegionHookArgs): boolean;

	/**
	 * Apply hook processing
	 */
	apply(args: RegionHookArgs): void;
}

/**
 * Constructor for RegionHook
 */
export interface RegionHookConstructor {
	new (options?: any): RegionHook;
	extend(proto: any, staticProps?: any): RegionHookConstructor;
}