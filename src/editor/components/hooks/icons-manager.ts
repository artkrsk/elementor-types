/**
 * Icons Manager Component Hooks
 *
 * Hooks for icons manager component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Icons manager hook arguments
 */
export interface IconsManagerHookArgs extends ComponentHookArgs {
	icon?: any;
	iconLibrary?: string;
	iconSet?: any;
	library?: any;
	[key: string]: any;
}

/**
 * Icons manager load hook
 */
export interface IconsManagerLoadHook extends ComponentHook {
	getComponent(): 'icons-manager';
	getId(): 'load';
	apply(args: IconsManagerHookArgs): void;
}

/**
 * Icons manager register hook
 */
export interface IconsManagerRegisterHook extends ComponentHook {
	getComponent(): 'icons-manager';
	getId(): 'register';
	apply(args: IconsManagerHookArgs): void;
}

/**
 * Icons manager fetch hook
 */
export interface IconsManagerFetchHook extends ComponentHook {
	getComponent(): 'icons-manager';
	getId(): 'fetch';
	apply(args: IconsManagerHookArgs): void;
}

// Export all icons manager hooks
export type IconsManagerHooks =
	| IconsManagerLoadHook
	| IconsManagerRegisterHook
	| IconsManagerFetchHook;