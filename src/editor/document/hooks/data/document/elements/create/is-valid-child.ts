/**
 * Document Data Elements Create Is Valid Child Hook
 *
 * Mirrors editor/document/hooks/data/document/elements/create/is-valid-child.js
 * Validates if element can be created as child of another element
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Arguments for is valid child hook
 */
export interface IsValidChildHookArgs {
	container?: any;
	model?: any;
	targetContainer?: any;
	elementType?: string;
	options?: {
		index?: number;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Is Valid Child hook for data operations
 * Validates parent-child relationships during element creation
 */
export declare class IsValidChildHook implements DataHook {
	constructor(options?: any);

	getCommand(): 'document/elements/create';
	getId(): 'is-valid-child';
	getConditions?(args: IsValidChildHookArgs): boolean;
	apply(args: IsValidChildHookArgs): void;

	static extend(proto: any, staticProps?: any): any;
}

export default IsValidChildHook;