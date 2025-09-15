/**
 * Documents Component Hooks
 *
 * Hooks for documents component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Documents hook arguments
 */
export interface DocumentsHookArgs extends ComponentHookArgs {
	document?: any;
	documentId?: string;
	documentType?: string;
	config?: any;
	[key: string]: any;
}

/**
 * Documents open hook
 */
export interface DocumentsOpenHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'open';
	apply(args: DocumentsHookArgs): void;
}

/**
 * Documents close hook
 */
export interface DocumentsCloseHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'close';
	apply(args: DocumentsHookArgs): void;
}

/**
 * Documents switch hook
 */
export interface DocumentsSwitchHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'switch';
	apply(args: DocumentsHookArgs): void;
}

/**
 * Documents create hook
 */
export interface DocumentsCreateHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'create';
	apply(args: DocumentsHookArgs): void;
}

/**
 * Documents delete hook
 */
export interface DocumentsDeleteHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'delete';
	apply(args: DocumentsHookArgs): void;
}

/**
 * Documents save hook
 */
export interface DocumentsSaveHook extends ComponentHook {
	getComponent(): 'documents';
	getId(): 'save';
	apply(args: DocumentsHookArgs): void;
}

// Export all documents hooks
export type DocumentsHooks =
	| DocumentsOpenHook
	| DocumentsCloseHook
	| DocumentsSwitchHook
	| DocumentsCreateHook
	| DocumentsDeleteHook
	| DocumentsSaveHook;