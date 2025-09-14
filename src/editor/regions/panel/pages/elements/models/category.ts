/**
 * Panel Elements Category Model
 *
 * Mirrors editor/regions/panel/pages/elements/models/category.js
 * Model for element categories in the panel
 */

import type { Model } from 'backbone';

/**
 * Category model for panel elements page
 * Represents widget categories in the elements panel
 */
export interface PanelCategoryModel extends Model {
	/**
	 * Category identifier
	 */
	get(attribute: 'name'): string;
	get(attribute: 'title'): string;
	get(attribute: 'icon'): string;
	get(attribute: 'active'): boolean;
	get(attribute: 'items'): any[];
	get(attribute: string): any;

	/**
	 * Check if category is active
	 */
	isActive(): boolean;

	/**
	 * Get category name
	 */
	getName(): string;

	/**
	 * Get category title
	 */
	getTitle(): string;

	/**
	 * Get category icon
	 */
	getIcon(): string;

	/**
	 * Get category items count
	 */
	getItemsCount(): number;
}

/**
 * Constructor for PanelCategoryModel
 */
export interface PanelCategoryModelConstructor {
	new (attributes?: any, options?: any): any;
	extend(proto: any, staticProps?: any): PanelCategoryModelConstructor;
}

declare const PanelCategoryModel: PanelCategoryModelConstructor;

export { PanelCategoryModel };
export default PanelCategoryModel;