/**
 * Template Library Templates Collection
 *
 * Mirrors editor/components/template-library/collections/templates.js
 * Collection of templates in the library
 */

import type { Collection } from 'backbone';
import type { TemplateModel } from '../models/template';

/**
 * Templates collection for template library
 * Manages the collection of available templates
 */
export interface TemplatesCollection extends Collection<TemplateModel> {
	/**
	 * Base URL for template API
	 */
	url: string;

	/**
	 * Filter templates by criteria
	 */
	filter(criteria: {
		source?: string;
		type?: string;
		subtype?: string;
		category?: string;
		[key: string]: any;
	}): TemplateModel[];

	/**
	 * Search templates by query
	 */
	search(query: string): TemplateModel[];

	/**
	 * Get templates by type
	 */
	getByType(type: string): TemplateModel[];

	/**
	 * Get templates by source
	 */
	getBySource(source: string): TemplateModel[];

	/**
	 * Get featured templates
	 */
	getFeatured(): TemplateModel[];

	/**
	 * Sync with remote template library
	 */
	sync(method: string, collection: this, options?: any): any;
}

/**
 * Constructor for TemplatesCollection
 */
export interface TemplatesCollectionConstructor {
	new (models?: any[], options?: any): any;
	extend(proto: any, staticProps?: any): TemplatesCollectionConstructor;
}

declare const TemplatesCollection: TemplatesCollectionConstructor;

export { TemplatesCollection };
export default TemplatesCollection;