/**
 * Stretch Element Tool
 *
 * Mirrors frontend/tools/stretch-element.js
 * Tool for stretching elements to container width
 */

import type { ViewModule } from '../../core/modules/view-module';

export interface StretchElementSettings {
	element: HTMLElement | JQuery | null;
	direction: 'left' | 'right';
	selectors: {
		container: string;
		[key: string]: string;
	};
	containerWindow?: Window;
	considerScrollbar: boolean;
	cssOutput: 'inline' | 'variables';
	margin?: number;
}

export interface StretchElementElements {
	$element: JQuery;
	[key: string]: JQuery | HTMLElement;
}

export interface StretchElementCSS {
	width?: string;
	left?: string;
	right?: string;
	[key: string]: string | undefined;
}

/**
 * Tool for stretching elements to fit container width
 * Provides functionality to make elements span the full container width
 */
export interface StretchElement extends ViewModule {
	/**
	 * Get default settings for stretch element
	 */
	getDefaultSettings(): StretchElementSettings;

	/**
	 * Get default elements
	 */
	getDefaultElements(): StretchElementElements;

	/**
	 * Perform the stretch operation
	 */
	stretch(): void;

	/**
	 * Reset the element to original dimensions
	 */
	reset(): void;

	/**
	 * Apply CSS variables for stretching
	 */
	applyCssVariables($element: JQuery, css: StretchElementCSS): void;

	/**
	 * Reset CSS variables
	 */
	resetCssVariables($element: JQuery): void;

	/**
	 * Set new settings
	 */
	setSettings(settingKey: string, value: any): this;
}

/**
 * Stretch Element Constructor
 */
export interface StretchElementConstructor {
	new (settings?: Partial<StretchElementSettings>): any;
	extend(proto: any): StretchElementConstructor;
}

declare const StretchElement: StretchElementConstructor;

export { StretchElement };
export default StretchElement;