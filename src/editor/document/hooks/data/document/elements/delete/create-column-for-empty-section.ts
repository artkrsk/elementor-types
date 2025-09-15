/**
 * Document Data Delete Create Column For Empty Section Hook
 *
 * Handles creating columns when sections become empty after deletion
 */

import type { DataHook } from '../settings/handle-dynamic';

/**
 * Create Column For Empty Section hook arguments
 */
export interface CreateColumnForEmptySectionHookArgs {
	container?: any;
	containers?: any[];
	[key: string]: any;
}

/**
 * Create Column For Empty Section Hook
 * Creates default column when section becomes empty after element deletion
 */
export interface CreateColumnForEmptySectionHook extends DataHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/delete';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'create-column-for-empty-section';

	/**
	 * Apply column creation for empty section
	 */
	apply(args: CreateColumnForEmptySectionHookArgs): void;
}

/**
 * Constructor for CreateColumnForEmptySectionHook
 */
export interface CreateColumnForEmptySectionHookConstructor {
	new (options?: any): CreateColumnForEmptySectionHook;
	extend(proto: any, staticProps?: any): CreateColumnForEmptySectionHookConstructor;
}

declare const CreateColumnForEmptySection: CreateColumnForEmptySectionHookConstructor;

export { CreateColumnForEmptySection };
export default CreateColumnForEmptySection;