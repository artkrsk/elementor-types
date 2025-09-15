/**
 * Preview Component Hooks
 *
 * Hooks for preview component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Preview hook arguments
 */
export interface PreviewHookArgs extends ComponentHookArgs {
	previewMode?: string;
	device?: string;
	frame?: any;
	url?: string;
	[key: string]: any;
}

/**
 * Preview open hook
 */
export interface PreviewOpenHook extends ComponentHook {
	getComponent(): 'preview';
	getId(): 'open';
	apply(args: PreviewHookArgs): void;
}

/**
 * Preview reload hook
 */
export interface PreviewReloadHook extends ComponentHook {
	getComponent(): 'preview';
	getId(): 'reload';
	apply(args: PreviewHookArgs): void;
}

/**
 * Preview close hook
 */
export interface PreviewCloseHook extends ComponentHook {
	getComponent(): 'preview';
	getId(): 'close';
	apply(args: PreviewHookArgs): void;
}

/**
 * Preview drop hook
 */
export interface PreviewDropHook extends ComponentHook {
	getComponent(): 'preview';
	getId(): 'drop';
	apply(args: PreviewHookArgs): void;
}

/**
 * Preview device change hook
 */
export interface PreviewDeviceChangeHook extends ComponentHook {
	getComponent(): 'preview';
	getId(): 'device-change';
	apply(args: PreviewHookArgs): void;
}

// Export all preview hooks
export type PreviewHooks =
	| PreviewOpenHook
	| PreviewReloadHook
	| PreviewCloseHook
	| PreviewDropHook
	| PreviewDeviceChangeHook;