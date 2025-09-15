/**
 * Responsive Bar Region Hooks
 *
 * Hooks for responsive bar region operations
 */

import type { RegionHook, RegionHookArgs } from './base';

/**
 * Responsive bar hook arguments
 */
export interface ResponsiveBarHookArgs extends RegionHookArgs {
	device?: string;
	previousDevice?: string;
	orientation?: string;
	breakpoint?: any;
	[key: string]: any;
}

/**
 * Responsive bar device change hook
 */
export interface ResponsiveBarDeviceChangeHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'device-change';
	apply(args: ResponsiveBarHookArgs): void;
}

/**
 * Responsive bar orientation change hook
 */
export interface ResponsiveBarOrientationChangeHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'orientation-change';
	apply(args: ResponsiveBarHookArgs): void;
}

/**
 * Responsive bar show hook
 */
export interface ResponsiveBarShowHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'show';
	apply(args: ResponsiveBarHookArgs): void;
}

/**
 * Responsive bar hide hook
 */
export interface ResponsiveBarHideHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'hide';
	apply(args: ResponsiveBarHookArgs): void;
}

/**
 * Responsive bar toggle hook
 */
export interface ResponsiveBarToggleHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'toggle';
	apply(args: ResponsiveBarHookArgs): void;
}

/**
 * Responsive bar breakpoint change hook
 */
export interface ResponsiveBarBreakpointChangeHook extends RegionHook {
	getRegion(): 'responsive-bar';
	getId(): 'breakpoint-change';
	apply(args: ResponsiveBarHookArgs): void;
}

// Export all responsive bar hooks
export type ResponsiveBarHooks =
	| ResponsiveBarDeviceChangeHook
	| ResponsiveBarOrientationChangeHook
	| ResponsiveBarShowHook
	| ResponsiveBarHideHook
	| ResponsiveBarToggleHook
	| ResponsiveBarBreakpointChangeHook;