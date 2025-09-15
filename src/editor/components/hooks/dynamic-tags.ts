/**
 * Dynamic Tags Component Hooks
 *
 * Hooks for dynamic tags component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Dynamic tags hook arguments
 */
export interface DynamicTagsHookArgs extends ComponentHookArgs {
	tag?: any;
	tagType?: string;
	tagSettings?: any;
	control?: any;
	[key: string]: any;
}

/**
 * Dynamic tags register hook
 */
export interface DynamicTagsRegisterHook extends ComponentHook {
	getComponent(): 'dynamic-tags';
	getId(): 'register';
	apply(args: DynamicTagsHookArgs): void;
}

/**
 * Dynamic tags render hook
 */
export interface DynamicTagsRenderHook extends ComponentHook {
	getComponent(): 'dynamic-tags';
	getId(): 'render';
	apply(args: DynamicTagsHookArgs): void;
}

/**
 * Dynamic tags update hook
 */
export interface DynamicTagsUpdateHook extends ComponentHook {
	getComponent(): 'dynamic-tags';
	getId(): 'update';
	apply(args: DynamicTagsHookArgs): void;
}

// Export all dynamic tags hooks
export type DynamicTagsHooks =
	| DynamicTagsRegisterHook
	| DynamicTagsRenderHook
	| DynamicTagsUpdateHook;