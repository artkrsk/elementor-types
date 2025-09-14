/**
 * Element Type Not Found Error
 *
 * Mirrors editor/errors/element-type-not-found.js
 * Error thrown when element type is not found
 */

/**
 * Element Type Not Found Error
 * Thrown when trying to create an element with an unregistered type
 */
export interface ElementTypeNotFound extends Error {
	/**
	 * Element type that was not found
	 */
	elementType: string;
}

/**
 * Constructor for ElementTypeNotFound error
 */
export interface ElementTypeNotFoundConstructor {
	new (elementType: string): any;
	extend(proto: any, staticProps?: any): ElementTypeNotFoundConstructor;
}

declare const ElementTypeNotFound: ElementTypeNotFoundConstructor;

export { ElementTypeNotFound };
export default ElementTypeNotFound;