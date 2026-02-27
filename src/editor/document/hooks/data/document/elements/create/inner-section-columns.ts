/**
 * Document Data Elements Create Inner Section Columns Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/create/inner-section-columns.js
 * Handles inner section column creation operations
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for inner section columns creation hook
 */
export interface InnerSectionColumnsCreateHookArgs {
	container?: any;
	model?: any;
	options?: {
		structure?: string;
		preset?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Inner Section Columns Create hook for data operations
 * Handles inner section column structure creation
 */
export declare class InnerSectionColumnsCreateHook implements DataHook {
	constructor(options?: any);

	getCommand(): 'document/elements/create';
	getId(): 'inner-section-columns';
	getConditions?(args: InnerSectionColumnsCreateHookArgs): boolean;
	apply(args: InnerSectionColumnsCreateHookArgs): void;

	static extend(proto: any, staticProps?: any): any;
}
