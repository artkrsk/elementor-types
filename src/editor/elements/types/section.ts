/**
 * Section Element Type
 *
 * Mirrors editor/elements/types/section.js
 * Specific implementation for section elements
 */

import type { BaseElementModel } from '../models/base-element-model';

/**
 * Section configuration
 */
export interface SectionConfig {
	name: 'section';
	title: 'Section';
	icon: 'eicon-columns';
	categories: ['layout'];
	[key: string]: any;
}

/**
 * Section Element Type
 * Specific element type for sections
 */
export interface SectionElement extends BaseElementModel {
	/**
	 * Get section configuration
	 */
	getSectionConfig(): SectionConfig;

	/**
	 * Check if section can contain columns
	 */
	canContainColumns(): boolean;

	/**
	 * Get section structure
	 */
	getSectionStructure(): string;

	/**
	 * Set section structure
	 */
	setSectionStructure(structure: string): void;

	/**
	 * Get section columns
	 */
	getSectionColumns(): any[];

	/**
	 * Add column to section
	 */
	addColumn(position?: number): any;

	/**
	 * Remove column from section
	 */
	removeColumn(columnId: string): boolean;
}

/**
 * Constructor for SectionElement
 */
export interface SectionElementConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): SectionElementConstructor;
}

declare const SectionElement: SectionElementConstructor;

export { SectionElement };
export default SectionElement;