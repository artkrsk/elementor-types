/**
 * Document UI Settings Reload Preview Hook
 *
 * Mirrors editor/document/hooks/ui/settings/reload-preview.js
 * Handles preview reloading when settings change
 */

import type { UIHook } from './draggable';

/**
 * Reload Preview hook arguments
 */
export interface ReloadPreviewHookArgs {
	container?: any;
	containers?: any[];
	settings: Record<string, any>;
	[key: string]: any;
}

/**
 * Reload Preview Hook for UI settings operations
 * Triggers preview reload when specific settings change
 */
export interface ReloadPreviewHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'reload-preview';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: ReloadPreviewHookArgs): boolean;

	/**
	 * Apply preview reload functionality
	 */
	apply(args: ReloadPreviewHookArgs): void;
}

/**
 * Constructor for ReloadPreviewHook
 */
export interface ReloadPreviewHookConstructor {
	new (options?: any): ReloadPreviewHook;
	extend(proto: any, staticProps?: any): ReloadPreviewHookConstructor;
}

declare const ReloadPreview: ReloadPreviewHookConstructor;

export { ReloadPreview };
export default ReloadPreview;