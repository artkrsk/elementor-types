/**
 * Document History Component
 *
 * Mirrors editor/document/history/component.js
 * Main component for document history management
 */

import type { ComponentBase } from '../../components';

/**
 * Transaction data for history operations
 */
export interface HistoryTransaction {
	container?: any;
	containers?: any[];
	data?: {
		changes?: Record<string, any>;
		[key: string]: any;
	};
	title?: string;
	type?: string;
	[key: string]: any;
}

/**
 * Document History Management Component
 * Handles undo/redo operations, transaction management, and history logging
 */
export interface DocumentHistoryComponent extends ComponentBase {
	/**
	 * Transactions holder array
	 */
	transactions: HistoryTransaction[];

	/**
	 * Get component namespace
	 */
	getNamespace(): 'document/history';

	/**
	 * Import default history commands
	 */
	defaultCommands(): any;

	/**
	 * Import default internal history commands
	 */
	defaultCommandsInternal(): any;

	/**
	 * Normalize log title for history entries
	 */
	normalizeLogTitle(args: HistoryTransaction): HistoryTransaction;

	/**
	 * Merge multiple transactions into a single result
	 */
	mergeTransactions(transactions: HistoryTransaction[]): Record<string, HistoryTransaction>;

	/**
	 * Check if transaction is currently started
	 */
	isTransactionStarted(): boolean;
}

/**
 * Constructor for DocumentHistoryComponent
 */
export interface DocumentHistoryComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): DocumentHistoryComponentConstructor;
}

declare const DocumentHistoryComponent: DocumentHistoryComponentConstructor;

export { DocumentHistoryComponent };
export default DocumentHistoryComponent;