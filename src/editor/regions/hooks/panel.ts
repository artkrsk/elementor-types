/**
 * Panel Region Hooks
 *
 * Hooks for panel region operations
 */

import type { RegionHook, RegionHookArgs } from './base';

/**
 * Panel hook arguments
 */
export interface PanelHookArgs extends RegionHookArgs {
	panelType?: string;
	page?: string;
	model?: any;
	view?: any;
	tab?: string;
	[key: string]: any;
}

/**
 * Panel open hook
 */
export interface PanelOpenHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'open';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel close hook
 */
export interface PanelCloseHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'close';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel toggle hook
 */
export interface PanelToggleHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'toggle';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel save hook
 */
export interface PanelSaveHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'save';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel switch hook
 */
export interface PanelSwitchHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'switch';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel show hook
 */
export interface PanelShowHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'show';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel hide hook
 */
export interface PanelHideHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'hide';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel editor open hook
 */
export interface PanelEditorOpenHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'editor-open';
	apply(args: PanelHookArgs): void;
}

/**
 * Panel change hook
 */
export interface PanelChangeHook extends RegionHook {
	getRegion(): 'panel';
	getId(): 'change';
	apply(args: PanelHookArgs): void;
}

// Export all panel hooks
export type PanelHooks =
	| PanelOpenHook
	| PanelCloseHook
	| PanelToggleHook
	| PanelSaveHook
	| PanelSwitchHook
	| PanelShowHook
	| PanelHideHook
	| PanelEditorOpenHook
	| PanelChangeHook;