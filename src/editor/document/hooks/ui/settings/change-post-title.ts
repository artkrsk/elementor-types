/**
 * Document UI Settings Change Post Title Hook
 *
 * Mirrors editor/document/hooks/ui/settings/change-post-title.js
 * Handles post title changes in document settings
 */

import type { UIHook } from './draggable';

/**
 * Arguments for change post title hook
 */
export interface ChangePostTitleHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		post_title?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Change Post Title hook for UI settings operations
 * Updates document title when post title setting changes
 */
export interface ChangePostTitleHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): string;

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'change-post-title';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: ChangePostTitleHookArgs): boolean;

	/**
	 * Apply post title change to document
	 */
	apply(args: ChangePostTitleHookArgs): void;
}

/**
 * Constructor for ChangePostTitleHook
 */
export interface ChangePostTitleHookConstructor {
	new (options?: any): ChangePostTitleHook;
	extend(proto: any, staticProps?: any): ChangePostTitleHookConstructor;
}

declare const ChangePostTitle: ChangePostTitleHookConstructor;

export { ChangePostTitle };
export default ChangePostTitle;