/**
 * Preview Component
 *
 * Mirrors editor/components/preview/component.js
 * Main component for preview management
 */

import type { ComponentBase } from '../../components';

/**
 * Preview Management Component
 * Handles preview operations and commands
 */
export interface PreviewComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'preview';

	/**
	 * Import default preview commands
	 */
	defaultCommands(): any;

	/**
	 * Reload preview iframe
	 */
	reloadPreview(): void;

	/**
	 * Handle drop operations in preview
	 */
	handleDrop(event: DragEvent): void;

	/**
	 * Get preview iframe element
	 */
	getPreviewFrame(): HTMLIFrameElement;

	/**
	 * Check if preview is loaded
	 */
	isPreviewLoaded(): boolean;
}

/**
 * Constructor for PreviewComponent
 */
export interface PreviewComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): PreviewComponentConstructor;
}

declare const PreviewComponent: PreviewComponentConstructor;

export { PreviewComponent };
export default PreviewComponent;