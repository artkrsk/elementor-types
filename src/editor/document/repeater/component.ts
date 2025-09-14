/**
 * Document Repeater Component
 *
 * Mirrors editor/document/repeater/component.js
 * Main component for document repeater control management
 */

import type { ComponentBase } from '../../components';

/**
 * Document Repeater Management Component
 * Handles repeater control operations and commands
 */
export interface DocumentRepeaterComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'document/repeater';

	/**
	 * Import default repeater commands
	 */
	defaultCommands(): any;
}

/**
 * Constructor for DocumentRepeaterComponent
 */
export interface DocumentRepeaterComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): DocumentRepeaterComponentConstructor;
}

declare const DocumentRepeaterComponent: DocumentRepeaterComponentConstructor;

export { DocumentRepeaterComponent };
export default DocumentRepeaterComponent;