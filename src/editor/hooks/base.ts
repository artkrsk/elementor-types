/**
 * Base Editor Hook Interfaces
 *
 * Common interfaces for all editor hooks
 */

/**
 * Base editor hook arguments interface
 */
export interface EditorHookArgs {
	editor?: any;
	element?: any;
	control?: any;
	model?: any;
	view?: any;
	options?: Record<string, any>;
	[key: string]: any;
}

/**
 * Base editor hook interface
 */
export interface EditorHook {
	/**
	 * Get the hook category
	 */
	getCategory(): string;

	/**
	 * Get unique identifier for this hook
	 */
	getId(): string;

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: EditorHookArgs): boolean;

	/**
	 * Apply hook processing
	 */
	apply(args: EditorHookArgs): void;
}

/**
 * Constructor for EditorHook
 */
export interface EditorHookConstructor {
	new (options?: any): EditorHook;
	extend(proto: any, staticProps?: any): EditorHookConstructor;
}