/**
 * Navigator Region Hooks
 *
 * Hooks for navigator region operations
 */

import type { RegionHook, RegionHookArgs } from './base';

/**
 * Navigator hook arguments
 */
export interface NavigatorHookArgs extends RegionHookArgs {
	element?: any;
	elements?: any[];
	navigatorModel?: any;
	selectedElements?: any[];
	[key: string]: any;
}

/**
 * Navigator open hook
 */
export interface NavigatorOpenHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'open';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator close hook
 */
export interface NavigatorCloseHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'close';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator toggle hook
 */
export interface NavigatorToggleHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'toggle';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator expand hook
 */
export interface NavigatorExpandHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'expand';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator collapse hook
 */
export interface NavigatorCollapseHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'collapse';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator select hook
 */
export interface NavigatorSelectHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'select';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator refresh hook
 */
export interface NavigatorRefreshHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'refresh';
	apply(args: NavigatorHookArgs): void;
}

/**
 * Navigator highlight hook
 */
export interface NavigatorHighlightHook extends RegionHook {
	getRegion(): 'navigator';
	getId(): 'highlight';
	apply(args: NavigatorHookArgs): void;
}

// Export all navigator hooks
export type NavigatorHooks =
	| NavigatorOpenHook
	| NavigatorCloseHook
	| NavigatorToggleHook
	| NavigatorExpandHook
	| NavigatorCollapseHook
	| NavigatorSelectHook
	| NavigatorRefreshHook
	| NavigatorHighlightHook;