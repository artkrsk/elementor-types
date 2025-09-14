/**
 * Documents Component
 *
 * Mirrors editor/components/documents/component.js
 * Main component for document management
 */

import type { ComponentBase } from '../../components';

/**
 * Document interface for document management
 */
export interface Document {
	id: string | number;
	config: any;
	editor: {
		status: 'open' | 'closed';
		isChanged: boolean;
	};
	container: any;
	[key: string]: any;
}

/**
 * Request arguments for document operations
 */
export interface DocumentRequestArgs {
	action: 'get_document_config';
	unique_id: string;
	data: { id: number };
	success: (config: any) => any;
	error: (data: any) => void;
}

/**
 * Documents Management Component
 * Handles document lifecycle, switching, and management operations
 */
export interface DocumentsComponent extends ComponentBase {
	/**
	 * All loaded documents by ID
	 */
	documents: Record<string, Document>;

	/**
	 * Current active document
	 */
	currentDocument: Document | null;

	/**
	 * Get component namespace
	 */
	getNamespace(): 'editor/documents';

	/**
	 * Import default document commands
	 */
	defaultCommands(): any;

	/**
	 * Import default document hooks
	 */
	defaultHooks(): any;

	/**
	 * Import default internal document commands
	 */
	defaultCommandsInternal(): any;

	/**
	 * Add document to manager
	 */
	add(document: Document): Document;

	/**
	 * Add document by configuration
	 */
	addDocumentByConfig(config: any): Document;

	/**
	 * Get document by ID
	 */
	get(id: string | number): Document | false;

	/**
	 * Get current document
	 */
	getCurrent(): Document;

	/**
	 * Get current document ID
	 */
	getCurrentId(): string | number;

	/**
	 * Get initial document ID
	 */
	getInitialId(): string | number;

	/**
	 * Set initial document by ID
	 */
	setInitialById(id: string | number): void;

	/**
	 * Set current document
	 */
	setCurrent(document: Document): void;

	/**
	 * Check if document is current
	 */
	isCurrent(id: string | number): boolean;

	/**
	 * Unset current document
	 */
	unsetCurrent(): void;

	/**
	 * Request document data
	 */
	request(id: string | number): any;

	/**
	 * Invalidate document cache
	 */
	invalidateCache(id?: string | number): void;

	/**
	 * Get request arguments for document operations
	 */
	getRequestArgs(id: string | number): DocumentRequestArgs;

	/**
	 * Save initial document to cache
	 */
	saveInitialDocumentToCache(): void;
}

/**
 * Constructor for DocumentsComponent
 */
export interface DocumentsComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): DocumentsComponentConstructor;
}

declare const DocumentsComponent: DocumentsComponentConstructor;

export { DocumentsComponent };
export default DocumentsComponent;