/**
 * Preview Drop Command
 *
 * Mirrors editor/components/preview/commands/drop.js
 * Handles drop operations in the preview
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for preview drop command
 */
export interface PreviewDropArgs {
	event: DragEvent;
	target?: HTMLElement;
	data?: any;
	[key: string]: any;
}

/**
 * Drop command for preview
 * Handles drag and drop operations in the preview iframe
 */
export interface PreviewDropCommand extends CommandBase {
	/**
	 * Apply drop operation
	 */
	apply(args: PreviewDropArgs): void;

	/**
	 * Validate drop arguments
	 */
	validateArgs(args: PreviewDropArgs): void;
}

/**
 * Constructor for PreviewDropCommand
 */
export interface PreviewDropCommandConstructor {
	new (options?: any): PreviewDropCommand;
	extend(proto: any, staticProps?: any): PreviewDropCommandConstructor;
}

declare const Drop: PreviewDropCommandConstructor;

export { Drop };
export default Drop;