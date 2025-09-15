/**
 * Masonry Utility
 *
 * Mirrors modules/imports/utils/masonry.js
 * Masonry layout utility for grid arrangements
 */

import type { ViewModule } from '../../../core/modules';

/**
 * Masonry configuration options
 */
export interface MasonryConfig {
	container: HTMLElement | string;
	items: string;
	columnWidth?: number | string;
	gutter?: number | string;
	horizontalOrder?: boolean;
	percentPosition?: boolean;
	[key: string]: any;
}

/**
 * Masonry Utility
 * Provides masonry layout functionality for grid arrangements
 */
export interface Masonry extends ViewModule {
	/**
	 * Masonry instance
	 */
	masonry: any;

	/**
	 * Initialize masonry layout
	 */
	initialize(config: MasonryConfig): void;

	/**
	 * Layout all items
	 */
	layout(): void;

	/**
	 * Add items to masonry
	 */
	addItems(items: HTMLElement[]): void;

	/**
	 * Remove items from masonry
	 */
	removeItems(items: HTMLElement[]): void;

	/**
	 * Destroy masonry instance
	 */
	destroy(): void;

	/**
	 * Reload masonry layout
	 */
	reload(): void;

	/**
	 * Get masonry instance
	 */
	getMasonry(): any;
}

/**
 * Constructor for Masonry
 */
export interface MasonryConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): MasonryConstructor;
}

declare const Masonry: MasonryConstructor;

export { Masonry };
export default Masonry;