/**
 * Element Hooks
 *
 * Hooks for element-level operations and events
 */

import type { EditorHook, EditorHookArgs } from './base';

/**
 * Element hook arguments
 */
export interface ElementHookArgs extends EditorHookArgs {
	elementType?: string;
	elementModel?: any;
	elementView?: any;
	container?: any;
	settings?: any;
	position?: number;
	[key: string]: any;
}

/**
 * Element create hook
 */
export interface ElementCreateHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'create';
	apply(args: ElementHookArgs): void;
}

/**
 * Element delete hook
 */
export interface ElementDeleteHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'delete';
	apply(args: ElementHookArgs): void;
}

/**
 * Element duplicate hook
 */
export interface ElementDuplicateHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'duplicate';
	apply(args: ElementHookArgs): void;
}

/**
 * Element move hook
 */
export interface ElementMoveHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'move';
	apply(args: ElementHookArgs): void;
}

/**
 * Element copy hook
 */
export interface ElementCopyHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'copy';
	apply(args: ElementHookArgs): void;
}

/**
 * Element paste hook
 */
export interface ElementPasteHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'paste';
	apply(args: ElementHookArgs): void;
}

/**
 * Element select hook
 */
export interface ElementSelectHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'select';
	apply(args: ElementHookArgs): void;
}

/**
 * Element render hook
 */
export interface ElementRenderHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'render';
	apply(args: ElementHookArgs): void;
}

/**
 * Element settings change hook
 */
export interface ElementSettingsChangeHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'settings-change';
	apply(args: ElementHookArgs): void;
}

/**
 * Element destroy hook
 */
export interface ElementDestroyHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'destroy';
	apply(args: ElementHookArgs): void;
}

/**
 * Element resize hook
 */
export interface ElementResizeHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'resize';
	apply(args: ElementHookArgs): void;
}

/**
 * Element drag start hook
 */
export interface ElementDragStartHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'drag-start';
	apply(args: ElementHookArgs): void;
}

/**
 * Element drag end hook
 */
export interface ElementDragEndHook extends EditorHook {
	getCategory(): 'elements';
	getId(): 'drag-end';
	apply(args: ElementHookArgs): void;
}

// Export all element hooks
export type ElementHooks =
	| ElementCreateHook
	| ElementDeleteHook
	| ElementDuplicateHook
	| ElementMoveHook
	| ElementCopyHook
	| ElementPasteHook
	| ElementSelectHook
	| ElementRenderHook
	| ElementSettingsChangeHook
	| ElementDestroyHook
	| ElementResizeHook
	| ElementDragStartHook
	| ElementDragEndHook;