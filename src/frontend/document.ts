/**
 * Frontend Document
 *
 * Mirrors frontend/document.js
 * Represents a single frontend document instance
 */

import type { ViewModule } from '../core/modules/view-module';

export interface DocumentSettings {
	selectors: {
		elements: string;
		nestedDocumentElements: string;
	};
	classes: {
		editMode: string;
	};
}

export interface DocumentElements {
	$elements: JQuery;
	[key: string]: JQuery | HTMLElement;
}

/**
 * Frontend Document
 * Handles individual document functionality and element management
 */
export interface Document extends ViewModule {
	isEdit?: boolean;

	/**
	 * Get default document settings
	 */
	getDefaultSettings(): DocumentSettings;

	/**
	 * Get default document elements
	 */
	getDefaultElements(): DocumentElements;

	/**
	 * Get document-specific settings
	 */
	getDocumentSettings(setting?: string): any;

	/**
	 * Run handlers for all elements in the document
	 */
	runElementsHandlers(): void;

	/**
	 * Handle document settings changes (in edit mode)
	 */
	onSettingsChange(): void;
}

/**
 * Document Constructor
 */
export interface DocumentConstructor {
	new (...args: any[]): any;
	extend(proto: any): DocumentConstructor;
}

declare const Document: DocumentConstructor;

export { Document };
export default Document;