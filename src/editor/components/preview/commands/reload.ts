/**
 * Preview Reload Command
 *
 * Mirrors editor/components/preview/commands/reload.js
 * Reloads the preview iframe
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for preview reload command
 */
export interface PreviewReloadArgs {
	force?: boolean;
	[key: string]: any;
}

/**
 * Reload command for preview
 * Reloads the preview iframe with current document state
 */
export interface PreviewReloadCommand extends CommandBase {
	/**
	 * Apply reload operation
	 */
	apply(args?: PreviewReloadArgs): void;
}

/**
 * Constructor for PreviewReloadCommand
 */
export interface PreviewReloadCommandConstructor {
	new (options?: any): PreviewReloadCommand;
	extend(proto: any, staticProps?: any): PreviewReloadCommandConstructor;
}

declare const Reload: PreviewReloadCommandConstructor;

export { Reload };
export default Reload;