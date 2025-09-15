/**
 * Editor Module Utilities
 *
 * Mirrors editor/utils/module.js
 * Utilities for editor module management
 */

import type { Module } from '../../core/modules';

/**
 * Module registration options
 */
export interface ModuleRegistrationOptions {
	name: string;
	className: string;
	dependencies?: string[];
	autoload?: boolean;
	[key: string]: any;
}

/**
 * Editor Module Utilities
 * Helper functions for module management in the editor
 */
export interface EditorModuleUtils {
	/**
	 * Register editor module
	 */
	registerModule(options: ModuleRegistrationOptions): void;

	/**
	 * Unregister editor module
	 */
	unregisterModule(name: string): boolean;

	/**
	 * Get registered module
	 */
	getModule(name: string): Module | null;

	/**
	 * Check if module is registered
	 */
	hasModule(name: string): boolean;

	/**
	 * Load module dependencies
	 */
	loadDependencies(moduleName: string): Promise<void>;

	/**
	 * Initialize module
	 */
	initializeModule(moduleName: string): Promise<Module>;
}

declare const EditorModuleUtils: any;

export { EditorModuleUtils };
export default EditorModuleUtils;