/**
 * Widget Element Type
 *
 * Mirrors editor/elements/types/widget.js
 * Specific implementation for widget elements
 */

import type { BaseElement } from './base';

/**
 * Widget configuration
 */
export interface WidgetConfig {
	name: string;
	title: string;
	icon: string;
	categories: string[];
	keywords?: string[];
	[key: string]: any;
}

/**
 * Widget Element Type
 * Specific element type for widgets
 */
export interface WidgetElement extends BaseElement {
	/**
	 * Get widget configuration
	 */
	getWidgetConfig(): WidgetConfig;

	/**
	 * Get widget type
	 */
	getWidgetType(): string;

	/**
	 * Check if widget is available
	 */
	isWidgetAvailable(): boolean;

	/**
	 * Get widget default settings
	 */
	getWidgetDefaults(): Record<string, any>;
}

/**
 * Constructor for WidgetElement
 */
export interface WidgetElementConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): WidgetElementConstructor;
}

declare const WidgetElement: WidgetElementConstructor;

export { WidgetElement };
export default WidgetElement;