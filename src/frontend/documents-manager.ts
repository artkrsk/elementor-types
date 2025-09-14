/**
 * Frontend Documents Manager
 *
 * Mirrors frontend/documents-manager.js
 * Manages frontend document instances and their initialization
 */

import type { ViewModule } from '../core/modules/view-module';

export interface DocumentsManagerSettings {
	selectors: {
		document: string;
	};
}

export interface DocumentsManagerElements {
	$documents: JQuery;
	[key: string]: JQuery | HTMLElement;
}

export interface DocumentClass {
	new (options: { $element: JQuery; id: string | number }): any;
}

export interface DocumentClasses {
	base: DocumentClass;
	[documentType: string]: DocumentClass;
}

/**
 * Frontend Documents Manager
 * Handles initialization and management of frontend document instances
 */
export interface DocumentsManager extends ViewModule {
	documents: Record<string | number, any>;
	documentClasses: DocumentClasses;

	/**
	 * Get default settings
	 */
	getDefaultSettings(): DocumentsManagerSettings;

	/**
	 * Get default elements
	 */
	getDefaultElements(): DocumentsManagerElements;

	/**
	 * Initialize document classes
	 */
	initDocumentClasses(): void;

	/**
	 * Add a document class for specific document type
	 */
	addDocumentClass(documentType: string, documentClass: DocumentClass): void;

	/**
	 * Attach document classes to all found documents
	 */
	attachDocumentsClasses(): void;

	/**
	 * Attach document class to specific document element
	 */
	attachDocumentClass($document: JQuery): void;
}

/**
 * Documents Manager Constructor
 */
export interface DocumentsManagerConstructor {
	new (...args: any[]): DocumentsManager;
	extend(proto: any): DocumentsManagerConstructor;
}

declare const DocumentsManager: DocumentsManagerConstructor;

export { DocumentsManager };
export default DocumentsManager;