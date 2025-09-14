/**
 * Dynamic Tags Manager
 *
 * Mirrors editor/components/dynamic-tags/manager.js
 * Manages dynamic content tags and their functionality
 */

import type { Module } from '../../../core/modules';

/**
 * Dynamic tag configuration
 */
export interface DynamicTagConfig {
	name: string;
	title: string;
	categories: string[];
	group?: string;
	controls?: any[];
	[key: string]: any;
}

/**
 * Dynamic tag instance
 */
export interface DynamicTag {
	name: string;
	title: string;
	categories: string[];
	model: any;
	view: any;
	getContent(): string;
	renderContent(): void;
}

/**
 * Dynamic Tags Manager
 * Handles registration, creation, and management of dynamic content tags
 */
export interface DynamicTagsManager extends Module {
	/**
	 * Registered dynamic tags by name
	 */
	tags: Record<string, DynamicTagConfig>;

	/**
	 * Register a dynamic tag
	 */
	registerTag(name: string, config: DynamicTagConfig): void;

	/**
	 * Unregister a dynamic tag
	 */
	unregisterTag(name: string): void;

	/**
	 * Get registered tag configuration
	 */
	getTag(name: string): DynamicTagConfig | null;

	/**
	 * Get all registered tags
	 */
	getTags(): Record<string, DynamicTagConfig>;

	/**
	 * Get tags by category
	 */
	getTagsByCategory(category: string): DynamicTagConfig[];

	/**
	 * Create tag instance
	 */
	createTag(name: string, settings?: any): DynamicTag | null;

	/**
	 * Parse dynamic content string
	 */
	parseContent(content: string): string;

	/**
	 * Check if tag exists
	 */
	hasTag(name: string): boolean;

	/**
	 * Get available categories
	 */
	getCategories(): string[];
}

/**
 * Constructor for DynamicTagsManager
 */
export interface DynamicTagsManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): DynamicTagsManagerConstructor;
}

declare const DynamicTagsManager: DynamicTagsManagerConstructor;

export { DynamicTagsManager };
export default DynamicTagsManager;