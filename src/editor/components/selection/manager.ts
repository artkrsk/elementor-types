/**
 * Selection Manager
 *
 * Mirrors editor/components/selection/manager.js
 * Manages selected elements in the editor
 */

import type { Module } from '../../../core/modules';

/**
 * Container interface for selection operations
 */
export interface SelectionContainer {
	id: string;
	type: string;
	model: any;
	view: {
		select(): void;
		deselect(): void;
	};
}

/**
 * Selection Manager
 * Handles element selection, multi-selection, and selection-related UI updates
 */
export interface SelectionManager extends Module {
	/**
	 * Selected elements by ID
	 */
	elements: Record<string, SelectionContainer>;

	/**
	 * Common type of selected elements, or false if mixed types
	 */
	type: string | false;

	/**
	 * Get selected elements array
	 */
	getElements(fallback?: SelectionContainer | SelectionContainer[]): SelectionContainer[];

	/**
	 * Add elements to selection
	 */
	add(containers: SelectionContainer | SelectionContainer[], append?: boolean): void;

	/**
	 * Remove elements from selection
	 */
	remove(containers: SelectionContainer | SelectionContainer[], all?: boolean): void;

	/**
	 * Check if container is selected
	 */
	has(container: SelectionContainer): boolean;

	/**
	 * Update selected elements type
	 */
	updateType(): void;

	/**
	 * Update sortable state based on selection
	 */
	updateSortable(): void;

	/**
	 * Update panel page based on selection
	 */
	updatePanelPage(): void;

	/**
	 * Update navigator selection display
	 */
	updateNavigator(): void;

	/**
	 * Check if multiple elements are selected
	 */
	isMultiple(): boolean;

	/**
	 * Check if selected elements are of same type
	 */
	isSameType(): boolean;

	/**
	 * Check if selection operations are allowed
	 */
	isAllowed(): boolean;
}

/**
 * Constructor for SelectionManager
 */
export interface SelectionManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): SelectionManagerConstructor;
}

declare const SelectionManager: SelectionManagerConstructor;

export { SelectionManager };
export default SelectionManager;