/**
 * Column Element Type
 *
 * Mirrors editor/elements/types/column.js
 * Specific implementation for column elements
 */

import type { BaseElementModel } from '../models/base-element-model';

/**
 * Column configuration
 */
export interface ColumnConfig {
	name: 'column';
	title: 'Column';
	icon: 'eicon-column';
	categories: ['layout'];
	[key: string]: any;
}

/**
 * Column Element Type
 * Specific element type for columns within sections
 */
export interface ColumnElement extends BaseElementModel {
	/**
	 * Get column configuration
	 */
	getColumnConfig(): ColumnConfig;

	/**
	 * Check if column can contain widgets
	 */
	canContainWidgets(): boolean;

	/**
	 * Get column width percentage
	 */
	getColumnWidth(): number;

	/**
	 * Set column width percentage
	 */
	setColumnWidth(width: number): void;

	/**
	 * Get column size setting
	 */
	getColumnSize(): string;

	/**
	 * Set column size setting
	 */
	setColumnSize(size: string): void;

	/**
	 * Check if column is empty
	 */
	isEmptyColumn(): boolean;

	/**
	 * Get column widgets
	 */
	getColumnWidgets(): any[];
}

/**
 * Constructor for ColumnElement
 */
export interface ColumnElementConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ColumnElementConstructor;
}

declare const ColumnElement: ColumnElementConstructor;

export { ColumnElement };
export default ColumnElement;