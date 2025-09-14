/**
 * Elementor Masonry Utility Module
 *
 * Mirrors modules/imports/utils/masonry.js
 * Provides masonry layout functionality for grid arrangements
 */

import type { ViewModule } from '../../core/modules/view-module';

export interface MasonrySettings {
	container: string | HTMLElement | null;
	items: string | HTMLElement | null;
	columnsCount: number;
	verticalSpaceBetween: number;
}

export interface MasonryElements {
	$container: JQuery;
	$items: JQuery;
	[key: string]: JQuery | HTMLElement;
}

/**
 * Masonry utility class for creating grid layouts
 * Extends ViewModule to provide masonry layout functionality
 */
export interface Masonry extends ViewModule {
	/**
	 * Get default settings for masonry layout
	 */
	getDefaultSettings(): MasonrySettings;

	/**
	 * Get default jQuery elements
	 */
	getDefaultElements(): MasonryElements;

	/**
	 * Run the masonry layout calculation
	 */
	run(): void;

	// Inherited from ViewModule
	elements: MasonryElements;
	getSettings(): MasonrySettings;
	getSettings(key: keyof MasonrySettings): MasonrySettings[keyof MasonrySettings];
}

/**
 * Masonry constructor interface
 */
export interface MasonryConstructor {
	new (settings?: Partial<MasonrySettings>): Masonry;
	extend(proto: any): MasonryConstructor;
}

declare const Masonry: MasonryConstructor;

export default Masonry;