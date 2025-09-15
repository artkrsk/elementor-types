/**
 * Browser Import Component Hooks
 *
 * Hooks for browser import component operations
 */

import type { ComponentHook, ComponentHookArgs } from './base';

/**
 * Browser import hook arguments
 */
export interface BrowserImportHookArgs extends ComponentHookArgs {
	files?: File[];
	fileType?: string;
	parser?: any;
	result?: any;
	[key: string]: any;
}

/**
 * Browser import start hook
 */
export interface BrowserImportStartHook extends ComponentHook {
	getComponent(): 'browser-import';
	getId(): 'start';
	apply(args: BrowserImportHookArgs): void;
}

/**
 * Browser import parse hook
 */
export interface BrowserImportParseHook extends ComponentHook {
	getComponent(): 'browser-import';
	getId(): 'parse';
	apply(args: BrowserImportHookArgs): void;
}

/**
 * Browser import validate hook
 */
export interface BrowserImportValidateHook extends ComponentHook {
	getComponent(): 'browser-import';
	getId(): 'validate';
	apply(args: BrowserImportHookArgs): void;
}

/**
 * Browser import complete hook
 */
export interface BrowserImportCompleteHook extends ComponentHook {
	getComponent(): 'browser-import';
	getId(): 'complete';
	apply(args: BrowserImportHookArgs): void;
}

/**
 * Browser import error hook
 */
export interface BrowserImportErrorHook extends ComponentHook {
	getComponent(): 'browser-import';
	getId(): 'error';
	apply(args: BrowserImportHookArgs): void;
}

// Export all browser import hooks
export type BrowserImportHooks =
	| BrowserImportStartHook
	| BrowserImportParseHook
	| BrowserImportValidateHook
	| BrowserImportCompleteHook
	| BrowserImportErrorHook;