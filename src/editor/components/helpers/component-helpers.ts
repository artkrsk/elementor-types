/**
 * Component Helpers
 *
 * Helper functions for component operations
 */

/**
 * Component Helper Functions
 * Utility functions for component management and operations
 */
export interface ComponentHelpers {
	/**
	 * Get component by name
	 */
	getComponent(name: string): any;

	/**
	 * Check if component exists
	 */
	hasComponent(name: string): boolean;

	/**
	 * Initialize component
	 */
	initializeComponent(name: string, options?: any): any;

	/**
	 * Destroy component
	 */
	destroyComponent(name: string): void;

	/**
	 * Get component instance
	 */
	getComponentInstance(name: string): any;

	/**
	 * Register component helper
	 */
	registerHelper(name: string, helper: Function): void;

	/**
	 * Execute component helper
	 */
	executeHelper(name: string, ...args: any[]): any;
}

declare const ComponentHelpers: any;

export { ComponentHelpers };
export default ComponentHelpers;