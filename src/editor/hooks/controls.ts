/**
 * Control Hooks
 *
 * Hooks for control-level operations and events
 */

import type { EditorHook, EditorHookArgs } from './base';

/**
 * Control hook arguments
 */
export interface ControlHookArgs extends EditorHookArgs {
	controlType?: string;
	controlName?: string;
	controlView?: any;
	controlModel?: any;
	value?: any;
	previousValue?: any;
	[key: string]: any;
}

/**
 * Control init hook
 */
export interface ControlInitHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'init';
	apply(args: ControlHookArgs): void;
}

/**
 * Control change hook
 */
export interface ControlChangeHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'change';
	apply(args: ControlHookArgs): void;
}

/**
 * Control render hook
 */
export interface ControlRenderHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'render';
	apply(args: ControlHookArgs): void;
}

/**
 * Control focus hook
 */
export interface ControlFocusHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'focus';
	apply(args: ControlHookArgs): void;
}

/**
 * Control blur hook
 */
export interface ControlBlurHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'blur';
	apply(args: ControlHookArgs): void;
}

/**
 * Control reset hook
 */
export interface ControlResetHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'reset';
	apply(args: ControlHookArgs): void;
}

/**
 * Control destroy hook
 */
export interface ControlDestroyHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'destroy';
	apply(args: ControlHookArgs): void;
}

/**
 * Control validate hook
 */
export interface ControlValidateHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'validate';
	apply(args: ControlHookArgs): void;
}

/**
 * Control before change hook
 */
export interface ControlBeforeChangeHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'before-change';
	apply(args: ControlHookArgs): void;
}

/**
 * Control after change hook
 */
export interface ControlAfterChangeHook extends EditorHook {
	getCategory(): 'controls';
	getId(): 'after-change';
	apply(args: ControlHookArgs): void;
}

// Export all control hooks
export type ControlHooks =
	| ControlInitHook
	| ControlChangeHook
	| ControlRenderHook
	| ControlFocusHook
	| ControlBlurHook
	| ControlResetHook
	| ControlDestroyHook
	| ControlValidateHook
	| ControlBeforeChangeHook
	| ControlAfterChangeHook;