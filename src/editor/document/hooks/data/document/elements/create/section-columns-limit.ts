/**
 * Document Data Elements Create Section Columns Limit Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/create/section-columns-limit.js
 * Handles section column limit validation during creation
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for section columns limit hook
 */
export interface SectionColumnsLimitHookArgs {
	container?: any;
	model?: any;
	options?: {
		structure?: string;
		maxColumns?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Section Columns Limit hook for data operations
 * Validates section column limits during creation
 */
export declare class SectionColumnsLimitHook implements DataHook {
	constructor(options?: any);

	getCommand(): 'document/elements/create';
	getId(): 'section-columns-limit';
	getConditions?(args: SectionColumnsLimitHookArgs): boolean;
	apply(args: SectionColumnsLimitHookArgs): void;

	static extend(proto: any, staticProps?: any): any;
}

export default SectionColumnsLimitHook;