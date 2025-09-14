/**
 * Panel Elements Element Model
 *
 * Mirrors editor/regions/panel/pages/elements/models/element.js
 * Model for individual elements in the panel
 */

import type { Model } from 'backbone';

/**
 * Element model for panel elements page
 * Represents individual widget/element in the elements panel
 */
export interface PanelElementModel extends Model {
	/**
	 * Element type identifier
	 */
	get(attribute: 'elType'): string;
	get(attribute: 'widgetType'): string;
	get(attribute: 'title'): string;
	get(attribute: 'icon'): string;
	get(attribute: 'categories'): string[];
	get(attribute: 'keywords'): string[];
	get(attribute: string): any;

	/**
	 * Check if element is available in current context
	 */
	isAvailable(): boolean;

	/**
	 * Get element default settings
	 */
	getDefaultSettings(): any;

	/**
	 * Get element icon
	 */
	getIcon(): string;

	/**
	 * Get element title
	 */
	getTitle(): string;
}

/**
 * Constructor for PanelElementModel
 */
export interface PanelElementModelConstructor {
	new (attributes?: any, options?: any): any;
	extend(proto: any, staticProps?: any): PanelElementModelConstructor;
}

declare const PanelElementModel: PanelElementModelConstructor;

export { PanelElementModel };
export default PanelElementModel;