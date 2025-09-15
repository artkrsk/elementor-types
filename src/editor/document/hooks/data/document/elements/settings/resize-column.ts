/**
 * Document Data Settings Resize Column Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/settings/resize-column.js
 * Handles column resizing through settings changes
 */

import type { DataHook } from './handle-dynamic';

/**
 * Resize Column hook arguments
 */
export interface ResizeColumnHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		_column_size?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Resize Column Hook
 * Handles column width changes through data settings
 */
export interface ResizeColumnHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'resize-column';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: ResizeColumnHookArgs): boolean;

	/**
	 * Apply column resizing logic
	 */
	apply(args: ResizeColumnHookArgs): void;
}

/**
 * Constructor for ResizeColumnHook
 */
export interface ResizeColumnHookConstructor {
	new (options?: any): ResizeColumnHook;
	extend(proto: any, staticProps?: any): ResizeColumnHookConstructor;
}

declare const ResizeColumn: ResizeColumnHookConstructor;

export { ResizeColumn };
export default ResizeColumn;