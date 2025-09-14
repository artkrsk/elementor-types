/**
 * Documents Switch Command
 *
 * Mirrors editor/components/documents/commands/switch.js
 * Switches between different documents
 */

import type { CommandBase } from '../../../commands/base';

/**
 * Arguments for document switch command
 */
export interface DocumentSwitchArgs {
	id: string | number;
	mode?: string;
	onClose?: () => void;
	shouldScroll?: boolean;
	shouldNavigateToDefaultRoute?: boolean;
	setAsInitial?: boolean;
	selector?: string;
	[key: string]: any;
}

/**
 * Switch command for documents
 * Handles switching between different documents in the editor
 */
export interface DocumentSwitchCommand extends CommandBase {
	/**
	 * Validate switch arguments
	 */
	validateArgs(args: DocumentSwitchArgs): void;

	/**
	 * Apply document switch operation
	 */
	apply(args: DocumentSwitchArgs): Promise<any>;
}

/**
 * Constructor for DocumentSwitchCommand
 */
export interface DocumentSwitchCommandConstructor {
	new (options?: any): DocumentSwitchCommand;
	extend(proto: any, staticProps?: any): DocumentSwitchCommandConstructor;
}

declare const Switch: DocumentSwitchCommandConstructor;

export { Switch };
export default Switch;