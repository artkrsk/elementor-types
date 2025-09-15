/**
 * Selection Component Hooks
 *
 * Hooks for selection component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Selection hook arguments
 */
export interface SelectionHookArgs extends ComponentHookArgs {
	elements?: any[];
	element?: any;
	selectionType?: string;
	multiple?: boolean;
	[key: string]: any;
}

/**
 * Selection add hook
 */
export interface SelectionAddHook extends ComponentHook {
	getComponent(): 'selection';
	getId(): 'add';
	apply(args: SelectionHookArgs): void;
}

/**
 * Selection remove hook
 */
export interface SelectionRemoveHook extends ComponentHook {
	getComponent(): 'selection';
	getId(): 'remove';
	apply(args: SelectionHookArgs): void;
}

/**
 * Selection clear hook
 */
export interface SelectionClearHook extends ComponentHook {
	getComponent(): 'selection';
	getId(): 'clear';
	apply(args: SelectionHookArgs): void;
}

/**
 * Selection change hook
 */
export interface SelectionChangeHook extends ComponentHook {
	getComponent(): 'selection';
	getId(): 'change';
	apply(args: SelectionHookArgs): void;
}

// Export all selection hooks
export type SelectionHooks =
	| SelectionAddHook
	| SelectionRemoveHook
	| SelectionClearHook
	| SelectionChangeHook;