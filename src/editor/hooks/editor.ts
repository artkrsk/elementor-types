/**
 * Editor Instance Hooks
 *
 * Hooks for editor instance operations and state management
 */

import type { EditorHook, EditorHookArgs } from './base';

/**
 * Editor instance hook arguments
 */
export interface EditorInstanceHookArgs extends EditorHookArgs {
	editorMode?: string;
	document?: any;
	history?: any;
	selection?: any;
	[key: string]: any;
}

/**
 * Editor mode change hook
 */
export interface EditorModeChangeHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'mode-change';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor document switch hook
 */
export interface EditorDocumentSwitchHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'document-switch';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor selection change hook
 */
export interface EditorSelectionChangeHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'selection-change';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor history change hook
 */
export interface EditorHistoryChangeHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'history-change';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor before save hook
 */
export interface EditorBeforeSaveHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'before-save';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor after save hook
 */
export interface EditorAfterSaveHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'after-save';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor command execute hook
 */
export interface EditorCommandExecuteHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'command-execute';
	apply(args: EditorInstanceHookArgs): void;
}

/**
 * Editor template load hook
 */
export interface EditorTemplateLoadHook extends EditorHook {
	getCategory(): 'editor';
	getId(): 'template-load';
	apply(args: EditorInstanceHookArgs): void;
}

// Export all editor instance hooks
export type EditorInstanceHooks =
	| EditorModeChangeHook
	| EditorDocumentSwitchHook
	| EditorSelectionChangeHook
	| EditorHistoryChangeHook
	| EditorBeforeSaveHook
	| EditorAfterSaveHook
	| EditorCommandExecuteHook
	| EditorTemplateLoadHook;