/**
 * Global Editor Hooks
 *
 * Hooks for global editor operations and lifecycle events
 */

import type { EditorHook, EditorHookArgs } from './base';

/**
 * Global editor hook arguments
 */
export interface GlobalEditorHookArgs extends EditorHookArgs {
	editorInstance?: any;
	config?: any;
	isReady?: boolean;
	mode?: string;
	[key: string]: any;
}

/**
 * Editor ready hook
 */
export interface EditorReadyHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'ready';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor init hook
 */
export interface EditorInitHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'init';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor loaded hook
 */
export interface EditorLoadedHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'loaded';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor change hook
 */
export interface EditorChangeHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'change';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor save hook
 */
export interface EditorSaveHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'save';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor preview hook
 */
export interface EditorPreviewHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'preview';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor device change hook
 */
export interface EditorDeviceChangeHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'device-change';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor undo hook
 */
export interface EditorUndoHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'undo';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor redo hook
 */
export interface EditorRedoHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'redo';
	apply(args: GlobalEditorHookArgs): void;
}

/**
 * Editor destroy hook
 */
export interface EditorDestroyHook extends EditorHook {
	getCategory(): 'global';
	getId(): 'destroy';
	apply(args: GlobalEditorHookArgs): void;
}

// Export all global editor hooks
export type GlobalEditorHooks =
	| EditorReadyHook
	| EditorInitHook
	| EditorLoadedHook
	| EditorChangeHook
	| EditorSaveHook
	| EditorPreviewHook
	| EditorDeviceChangeHook
	| EditorUndoHook
	| EditorRedoHook
	| EditorDestroyHook;