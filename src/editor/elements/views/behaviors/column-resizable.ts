/**
 * Column Resizable Behavior
 *
 * Mirrors editor/elements/views/behaviors/column-resizable.js
 * Resizable behavior for column elements
 */

/**
 * Resize configuration
 */
export interface ResizableConfig {
	handles: string;
	minWidth?: number;
	maxWidth?: number;
	aspectRatio?: boolean;
	grid?: number[];
}

/**
 * Column Resizable Behavior
 * Enables column width resizing through drag handles
 */
export interface ColumnResizableBehavior {
	/**
	 * Resize configuration
	 */
	config: ResizableConfig;

	/**
	 * Initialize resizable behavior
	 */
	initialize(): void;

	/**
	 * Enable resizing
	 */
	enableResizing(): void;

	/**
	 * Disable resizing
	 */
	disableResizing(): void;

	/**
	 * Handle resize start
	 */
	onResizeStart(event: Event, ui: any): void;

	/**
	 * Handle resize
	 */
	onResize(event: Event, ui: any): void;

	/**
	 * Handle resize stop
	 */
	onResizeStop(event: Event, ui: any): void;

	/**
	 * Update column width
	 */
	updateColumnWidth(width: number): void;

	/**
	 * Get column constraints
	 */
	getColumnConstraints(): { min: number; max: number };

	/**
	 * Destroy resizable behavior
	 */
	destroy(): void;
}

/**
 * Constructor for ColumnResizableBehavior
 */
export interface ColumnResizableBehaviorConstructor {
	new (config: ResizableConfig): any;
	extend(proto: any, staticProps?: any): ColumnResizableBehaviorConstructor;
}

declare const ColumnResizableBehavior: ColumnResizableBehaviorConstructor;

export { ColumnResizableBehavior };
export default ColumnResizableBehavior;