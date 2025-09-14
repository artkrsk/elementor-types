/**
 * Document Elements Component
 *
 * Mirrors editor/document/elements/component.js
 * Main component for document elements management
 */

import type { ComponentBase } from '../../components';

/**
 * Document Elements Management Component
 * Handles all document-level element operations and commands
 */
export interface DocumentElementsComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'document/elements';

	/**
	 * Import default element commands
	 */
	defaultCommands(): any;

	/**
	 * Import default element hooks
	 */
	defaultHooks(): any;

	/**
	 * Get element manager instance
	 */
	getManager(): any;
}

/**
 * Constructor for DocumentElementsComponent
 */
export interface DocumentElementsComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): DocumentElementsComponentConstructor;
}

declare const DocumentElementsComponent: DocumentElementsComponentConstructor;

export { DocumentElementsComponent };
export default DocumentElementsComponent;