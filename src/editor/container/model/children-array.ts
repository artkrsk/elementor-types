/**
 * Container Children Array
 *
 * Mirrors editor/container/model/children-array.js
 * Array class that manages container children with recursive operations
 */

// Forward declaration to avoid circular reference
export interface Container {
	children: any;
	[key: string]: any;
}

/**
 * Callback function type for recursive operations
 */
export type ContainerCallback<T = any> = (container: Container) => T;

/**
 * Array extension for managing container children
 * Provides recursive operations for traversing container hierarchies
 */
export interface ChildrenArray extends Array<Container> {
	/**
	 * Clear all children from the array
	 */
	clear(): void;

	/**
	 * Find a container recursively using a callback
	 * Traverses the container tree and returns the first matching container
	 */
	findRecursive(callback: ContainerCallback<any>): Container | false;

	/**
	 * Execute a callback for each container recursively
	 * Traverses the entire container tree
	 */
	forEachRecursive(callback: ContainerCallback<void>): void;

	/**
	 * Test if any container in the tree matches the callback
	 * Returns true if any container matches, stops at first match
	 */
	someRecursive(callback: ContainerCallback<boolean>): boolean;

	/**
	 * Filter containers recursively
	 */
	filterRecursive?(callback: ContainerCallback<boolean>): Container[];

	/**
	 * Map containers recursively
	 */
	mapRecursive?<T>(callback: ContainerCallback<T>): T[];

	/**
	 * Get all containers recursively as flat array
	 */
	getAllRecursive?(): Container[];
}

/**
 * Constructor for ChildrenArray
 */
export interface ChildrenArrayConstructor {
	new (...items: Container[]): any;
	extend(proto: any, staticProps?: any): ChildrenArrayConstructor;
}

declare const ChildrenArray: ChildrenArrayConstructor;

export { ChildrenArray };
export default ChildrenArray;