/**
 * Instance Of Utilities
 *
 * Mirrors editor/utils/is-instanceof.js
 * Type checking utilities for editor objects
 */

/**
 * Type checking functions for editor objects
 */
export interface InstanceOfUtils {
	/**
	 * Check if object is a Backbone Model
	 */
	isModel(obj: any): boolean;

	/**
	 * Check if object is a Backbone Collection
	 */
	isCollection(obj: any): boolean;

	/**
	 * Check if object is a Backbone View
	 */
	isView(obj: any): boolean;

	/**
	 * Check if object is an Elementor Element
	 */
	isElement(obj: any): boolean;

	/**
	 * Check if object is an Elementor Control
	 */
	isControl(obj: any): boolean;

	/**
	 * Check if object is an Elementor Container
	 */
	isContainer(obj: any): boolean;

	/**
	 * Generic instanceof checker with fallback
	 */
	checkInstance(obj: any, constructor: Function): boolean;
}

declare const InstanceOfUtils: any;

export { InstanceOfUtils };
export default InstanceOfUtils;