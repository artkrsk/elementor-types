/**
 * Sortable Behavior
 *
 * Mirrors editor/elements/views/behaviors/sortable.js
 * Drag and drop sorting behavior for elements
 */

/**
 * Sortable configuration
 */
export interface SortableConfig {
	items: string;
	handle?: string;
	placeholder?: string;
	connectWith?: string;
	tolerance?: 'intersect' | 'pointer';
	cursor?: string;
}

/**
 * Sortable Behavior
 * Enables drag and drop sorting for element collections
 */
export interface SortableBehavior {
	/**
	 * Sortable configuration
	 */
	config: SortableConfig;

	/**
	 * Initialize sortable behavior
	 */
	initialize(): void;

	/**
	 * Enable sorting
	 */
	enableSorting(): void;

	/**
	 * Disable sorting
	 */
	disableSorting(): void;

	/**
	 * Handle sort start
	 */
	onSortStart(event: Event, ui: any): void;

	/**
	 * Handle sort update
	 */
	onSortUpdate(event: Event, ui: any): void;

	/**
	 * Handle sort stop
	 */
	onSortStop(event: Event, ui: any): void;

	/**
	 * Update element positions
	 */
	updateElementPositions(): void;

	/**
	 * Destroy sortable behavior
	 */
	destroy(): void;
}

/**
 * Constructor for SortableBehavior
 */
export interface SortableBehaviorConstructor {
	new (config: SortableConfig): any;
	extend(proto: any, staticProps?: any): SortableBehaviorConstructor;
}

declare const SortableBehavior: SortableBehaviorConstructor;

export { SortableBehavior };
export default SortableBehavior;