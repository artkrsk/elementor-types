/**
 * Base Component Hook Interfaces
 *
 * Common interfaces for all component hooks
 */

/**
 * Base component hook arguments interface
 */
export interface ComponentHookArgs {
	component?: any;
	options?: Record<string, any>;
	[key: string]: any;
}

/**
 * Base component hook interface
 */
export interface ComponentHook {
	/**
	 * Get the component this hook applies to
	 */
	getComponent(): string;

	/**
	 * Get unique identifier for this hook
	 */
	getId(): string;

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: ComponentHookArgs): boolean;

	/**
	 * Apply hook processing
	 */
	apply(args: ComponentHookArgs): void;
}

/**
 * Constructor for ComponentHook
 */
export interface ComponentHookConstructor {
	new (options?: any): ComponentHook;
	extend(proto: any, staticProps?: any): ComponentHookConstructor;
}