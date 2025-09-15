/**
 * Template Library Component Hooks
 *
 * Hooks for template library component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Template library hook arguments
 */
export interface TemplateLibraryHookArgs extends ComponentHookArgs {
	template?: any;
	source?: string;
	category?: string;
	model?: any;
	[key: string]: any;
}

/**
 * Template library open hook
 */
export interface TemplateLibraryOpenHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'open';
	apply(args: TemplateLibraryHookArgs): void;
}

/**
 * Template library close hook
 */
export interface TemplateLibraryCloseHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'close';
	apply(args: TemplateLibraryHookArgs): void;
}

/**
 * Template library insert hook
 */
export interface TemplateLibraryInsertHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'insert';
	apply(args: TemplateLibraryHookArgs): void;
}

/**
 * Template library filter hook
 */
export interface TemplateLibraryFilterHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'filter';
	apply(args: TemplateLibraryHookArgs): void;
}

/**
 * Template library preview hook
 */
export interface TemplateLibraryPreviewHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'preview';
	apply(args: TemplateLibraryHookArgs): void;
}

/**
 * Template library save hook
 */
export interface TemplateLibrarySaveHook extends ComponentHook {
	getComponent(): 'template-library';
	getId(): 'save';
	apply(args: TemplateLibraryHookArgs): void;
}

// Export all template library hooks
export type TemplateLibraryHooks =
	| TemplateLibraryOpenHook
	| TemplateLibraryCloseHook
	| TemplateLibraryInsertHook
	| TemplateLibraryFilterHook
	| TemplateLibraryPreviewHook
	| TemplateLibrarySaveHook;