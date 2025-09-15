/**
 * Component Extensions
 *
 * Extensions and helpers for component functionality
 */

/**
 * Component extension interface
 */
export interface ComponentExtension {
	name: string;
	initialize(): void;
	destroy(): void;
	extend(component: any): void;
}

/**
 * Component Extensions Manager
 * Manages component extensions and helper systems
 */
export interface ComponentExtensions {
	/**
	 * Registered extensions
	 */
	extensions: Record<string, ComponentExtension>;

	/**
	 * Register component extension
	 */
	registerExtension(name: string, extension: ComponentExtension): void;

	/**
	 * Unregister component extension
	 */
	unregisterExtension(name: string): void;

	/**
	 * Apply extensions to component
	 */
	applyExtensions(component: any): void;

	/**
	 * Get extension by name
	 */
	getExtension(name: string): ComponentExtension | null;
}

declare const ComponentExtensions: any;

export { ComponentExtensions };
export default ComponentExtensions;