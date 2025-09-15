/**
 * Document UI Settings Column Change Size Hook
 *
 * Mirrors editor/document/hooks/ui/settings/column-change-size.js
 * Handles column size changes in sections
 */

import type { UIHook } from './draggable';

/**
 * Column Change Size hook arguments
 */
export interface ColumnChangeSizeHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		_column_size?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Column Change Size Hook for UI settings operations
 * Handles column width changes and section structure updates
 */
export interface ColumnChangeSizeHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'column-change-size';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: ColumnChangeSizeHookArgs): boolean;

	/**
	 * Apply column size change functionality
	 */
	apply(args: ColumnChangeSizeHookArgs): void;
}

/**
 * Constructor for ColumnChangeSizeHook
 */
export interface ColumnChangeSizeHookConstructor {
	new (options?: any): ColumnChangeSizeHook;
	extend(proto: any, staticProps?: any): ColumnChangeSizeHookConstructor;
}

declare const ColumnChangeSize: ColumnChangeSizeHookConstructor;

export { ColumnChangeSize };
export default ColumnChangeSize;