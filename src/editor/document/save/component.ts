/**
 * Document Save Component
 *
 * Mirrors editor/document/save/component.js
 * Main component for document save operations
 */

import type { ComponentBase } from '../../components';

/**
 * Footer saver behavior interface
 */
export interface FooterSaver {
	show(): void;
	hide(): void;
	toggle(show: boolean): void;
}

/**
 * Document interface for save operations
 */
export interface SaveDocument {
	id: string;
	container: {
		isEditable(): boolean;
	};
	editor: {
		isChanged: boolean;
	};
}

/**
 * Document Save Management Component
 * Handles auto-save, manual save, and save state management
 */
export interface DocumentSaveComponent extends ComponentBase {
	/**
	 * Footer saver behavior instance
	 */
	footerSaver: FooterSaver;

	/**
	 * Auto save timer handlers by document ID
	 */
	autoSaveTimers: Record<string, any>;

	/**
	 * Auto save interval in milliseconds
	 */
	autoSaveInterval: number;

	/**
	 * Get component namespace
	 */
	getNamespace(): 'document/save';

	/**
	 * Start auto-save timer for document
	 */
	startAutoSave(document: SaveDocument): void;

	/**
	 * Stop auto-save timer for document
	 */
	stopAutoSave(document: SaveDocument): void;

	/**
	 * Import default save commands
	 */
	defaultCommands(): any;

	/**
	 * Import default internal save commands
	 */
	defaultCommandsInternal(): any;

	/**
	 * Import default save hooks
	 */
	defaultHooks(): any;

	/**
	 * Check if editor has unsaved changes
	 */
	isEditorChanged(): boolean;
}

/**
 * Constructor for DocumentSaveComponent
 */
export interface DocumentSaveComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): DocumentSaveComponentConstructor;
}

declare const DocumentSaveComponent: DocumentSaveComponentConstructor;

export { DocumentSaveComponent };
export default DocumentSaveComponent;