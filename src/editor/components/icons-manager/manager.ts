/**
 * Icons Manager
 *
 * Mirrors editor/components/icons-manager/manager.js
 * Manages icon libraries and icon functionality
 */

import type { Module } from '../../../core/modules';

/**
 * Icon configuration
 */
export interface IconConfig {
	library: string;
	value: string;
	url?: string;
	svg?: string;
}

/**
 * Icon library configuration
 */
export interface IconLibraryConfig {
	name: string;
	label: string;
	url?: string;
	icons: Record<string, string>;
	categories?: string[];
}

/**
 * Icons Manager
 * Handles icon libraries, icon selection, and icon rendering
 */
export interface IconsManager extends Module {
	/**
	 * Registered icon libraries
	 */
	libraries: Record<string, IconLibraryConfig>;

	/**
	 * Register an icon library
	 */
	registerLibrary(name: string, config: IconLibraryConfig): void;

	/**
	 * Unregister an icon library
	 */
	unregisterLibrary(name: string): void;

	/**
	 * Get icon library configuration
	 */
	getLibrary(name: string): IconLibraryConfig | null;

	/**
	 * Get all registered libraries
	 */
	getLibraries(): Record<string, IconLibraryConfig>;

	/**
	 * Get icon from library
	 */
	getIcon(library: string, icon: string): string | null;

	/**
	 * Render icon HTML
	 */
	renderIcon(iconConfig: IconConfig): string;

	/**
	 * Get icon URL
	 */
	getIconUrl(iconConfig: IconConfig): string;

	/**
	 * Search icons by query
	 */
	searchIcons(query: string, library?: string): IconConfig[];

	/**
	 * Get icons by category
	 */
	getIconsByCategory(category: string, library?: string): IconConfig[];
}

/**
 * Constructor for IconsManager
 */
export interface IconsManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): IconsManagerConstructor;
}

declare const IconsManager: IconsManagerConstructor;

export { IconsManager };
export default IconsManager;