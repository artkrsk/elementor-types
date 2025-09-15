/**
 * Editor Helpers
 *
 * Mirrors editor/utils/helpers.js
 * General helper utilities for editor functionality
 */

/**
 * Helper function for model label generation
 */
export interface ModelLabelHelper {
	(model: any): string;
}

/**
 * Helper function for string escaping
 */
export interface StringEscapeHelper {
	(str: string): string;
}

/**
 * Helper function for deep cloning
 */
export interface DeepCloneHelper {
	<T>(obj: T): T;
}

/**
 * Editor Helpers Interface
 * Collection of general utility functions for editor operations
 */
export interface EditorHelpers {
	/**
	 * Get model label for display
	 */
	getModelLabel: ModelLabelHelper;

	/**
	 * Escape HTML string
	 */
	escapeHtml: StringEscapeHelper;

	/**
	 * Deep clone object
	 */
	deepClone: DeepCloneHelper;

	/**
	 * Generate unique ID
	 */
	generateUniqueId(): string;

	/**
	 * Check if object is empty
	 */
	isEmpty(obj: any): boolean;

	/**
	 * Merge objects deeply
	 */
	deepMerge(target: any, ...sources: any[]): any;

	/**
	 * Debounce function execution
	 */
	debounce(func: Function, wait: number): Function;

	/**
	 * Throttle function execution
	 */
	throttle(func: Function, limit: number): Function;
}

declare const EditorHelpers: any;

export { EditorHelpers };
export default EditorHelpers;