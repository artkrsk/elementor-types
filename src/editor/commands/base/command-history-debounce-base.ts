/**
 * Command History Debounce Base
 *
 * Mirrors assets/dev/js/editor/document/command-bases/command-history-debounce-base.js
 * Base class for commands that debounce history transactions.
 * Debouncing is a STATIC lodash wrapper shared across instances — it wraps
 * $e.internal('document/history/end-transaction'|'clear-transaction') calls;
 * there are no per-instance timers.
 */

import { CommandHistoryBase } from './command-history-base';

/**
 * Base command that supports debounced history operations
 */
export declare class CommandHistoryDebounceBase extends CommandHistoryBase {
	/** Set in initialize() from the current command trace / options.debounce */
	isDebounceRequired?: boolean;

	/** Shared lodash-debounced runner (created on first use) */
	static debounce: ((fn: () => void) => void) | undefined;

	static getInstanceType(): string;
}

/**
 * Constructor shape for CommandHistoryDebounceBase
 */
export type CommandHistoryDebounceBaseConstructor = typeof CommandHistoryDebounceBase;

export default CommandHistoryDebounceBase;
