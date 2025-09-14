/**
 * Template Library Template Model
 *
 * Mirrors editor/components/template-library/models/template.js
 * Model for individual templates in the library
 */

import type { Model } from 'backbone';

/**
 * Template model for template library
 * Represents individual templates with their metadata and content
 */
export interface TemplateModel extends Model {
	/**
	 * Template properties
	 */
	get(attribute: 'template_id'): string;
	get(attribute: 'title'): string;
	get(attribute: 'type'): string;
	get(attribute: 'subtype'): string;
	get(attribute: 'source'): string;
	get(attribute: 'author'): string;
	get(attribute: 'thumbnail'): string;
	get(attribute: 'date'): string;
	get(attribute: 'tags'): string[];
	get(attribute: 'export_link'): string;
	get(attribute: 'url'): string;
	get(attribute: 'hasPageSettings'): boolean;
	get(attribute: 'isPro'): boolean;
	get(attribute: 'accessLevel'): number;
	get(attribute: string): any;

	/**
	 * Check if template is available for use
	 */
	isAvailable(): boolean;

	/**
	 * Check if template is pro
	 */
	isPro(): boolean;

	/**
	 * Get template title
	 */
	getTitle(): string;

	/**
	 * Get template type
	 */
	getType(): string;

	/**
	 * Get template source
	 */
	getSource(): string;

	/**
	 * Get template thumbnail URL
	 */
	getThumbnail(): string;

	/**
	 * Check if template has page settings
	 */
	hasPageSettings(): boolean;
}

/**
 * Constructor for TemplateModel
 */
export interface TemplateModelConstructor {
	new (attributes?: any, options?: any): any;
	extend(proto: any, staticProps?: any): TemplateModelConstructor;
}

declare const TemplateModel: TemplateModelConstructor;

export { TemplateModel };
export default TemplateModel;