/**
 * Document Data Move Section Columns Set Structure Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/move/section-columns-set-structure.js
 * Handles section structure changes during element moves
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Section Columns Set Structure hook arguments
 */
export interface SectionColumnsSetStructureHookArgs {
	container?: any;
	containers?: any[];
	options?: {
		at?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Section Columns Set Structure Hook
 * Updates section structure when elements are moved between columns
 */
export interface SectionColumnsSetStructureHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/move';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'section-columns-set-structure';

	/**
	 * Apply section structure update logic
	 */
	apply(args: SectionColumnsSetStructureHookArgs): void;
}

/**
 * Constructor for SectionColumnsSetStructureHook
 */
export interface SectionColumnsSetStructureHookConstructor {
	new (options?: any): SectionColumnsSetStructureHook;
	extend(proto: any, staticProps?: any): SectionColumnsSetStructureHookConstructor;
}

declare const SectionColumnsSetStructure: SectionColumnsSetStructureHookConstructor;

export { SectionColumnsSetStructure };
export default SectionColumnsSetStructure;