/**
 * Browser Import Component
 *
 * Mirrors editor/components/browser-import/component.js
 * Main component for browser file import functionality
 */

import type { ComponentBase } from '../../components';

/**
 * Browser Import Management Component
 * Handles file import operations including parsing and processing
 */
export interface BrowserImportComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'editor/browser-import';

	/**
	 * Import default browser import commands
	 */
	defaultCommands(): any;

	/**
	 * Import default internal browser import commands
	 */
	defaultCommandsInternal(): any;

	/**
	 * Get file parser for specific file type
	 */
	getParser(fileType: string): any;

	/**
	 * Get file reader for specific file type
	 */
	getReader(fileType: string): any;

	/**
	 * Process imported file
	 */
	processFile(file: File): Promise<any>;

	/**
	 * Validate file for import
	 */
	validateFile(file: File): boolean;
}

/**
 * Constructor for BrowserImportComponent
 */
export interface BrowserImportComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): BrowserImportComponentConstructor;
}

declare const BrowserImportComponent: BrowserImportComponentConstructor;

export { BrowserImportComponent };
export default BrowserImportComponent;