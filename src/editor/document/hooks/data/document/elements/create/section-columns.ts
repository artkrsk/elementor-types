/**
 * Document Data Elements Create Section Columns Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/create/section-columns.js
 * Handles section column creation operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for section columns creation hook
 */
export interface SectionColumnsCreateHookArgs {
	container?: any;
	containers?: any[];
	model?: any;
	options?: {
		structure?: string;
		columns?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Section Columns Create hook for data operations
 * Handles section column structure creation
 */
export interface SectionColumnsCreateHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/create';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'section-columns';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions?(args: SectionColumnsCreateHookArgs): boolean;

	/**
	 * Apply section column creation processing
	 */
	apply(args: SectionColumnsCreateHookArgs): void;
}

/**
 * Constructor for SectionColumnsCreateHook
 */
export declare class SectionColumnsCreateHook implements SectionColumnsCreateHook {
	constructor(options?: any);

	getCommand(): 'document/elements/create';
	getId(): 'section-columns';
	getConditions?(args: SectionColumnsCreateHookArgs): boolean;
	apply(args: SectionColumnsCreateHookArgs): void;

	static extend(proto: any, staticProps?: any): any;
}

export default SectionColumnsCreateHook;