/**
 * Template Library Component
 *
 * Mirrors editor/components/template-library/component.js
 * Main component for template library management
 */

import type { ComponentBase } from '../../components';

/**
 * Template library tab configuration
 */
export interface TemplateLibraryTab {
	title: string;
	filter?: {
		source?: string;
		type?: string;
		subtype?: string;
		view?: string;
	};
	getFilter?: () => {
		source?: string;
		type?: string;
		subtype?: string;
		view?: string;
	};
}

/**
 * Template library tabs configuration
 */
export interface TemplateLibraryTabs {
	'templates/blocks': TemplateLibraryTab;
	'templates/pages': TemplateLibraryTab;
	'templates/my-templates': TemplateLibraryTab;
	[key: string]: TemplateLibraryTab;
}

/**
 * Template library routes configuration
 */
export interface TemplateLibraryRoutes {
	import(): void;
	'save-template'(args: { model: any; context?: string }): void;
	preview(args: { model: any }): void;
	connect(args: any): void;
	'view-folder'?(args: any): void;
}

/**
 * Template library shortcuts configuration
 */
export interface TemplateLibraryShortcuts {
	open: {
		keys: 'ctrl+shift+l';
	};
}

/**
 * Arguments for template operations
 */
export interface TemplateArgs {
	model?: any;
	withPageSettings?: boolean;
	importOptions?: any;
	onAfter?: () => void;
	[key: string]: any;
}

/**
 * Template Library Management Component
 * Handles template browsing, importing, saving, and management
 */
export interface TemplateLibraryComponent extends ComponentBase {
	/**
	 * Current active tab
	 */
	currentTab: string;

	/**
	 * Get component namespace
	 */
	getNamespace(): 'library';

	/**
	 * Get default tabs configuration
	 */
	defaultTabs(): TemplateLibraryTabs;

	/**
	 * Get default routes configuration
	 */
	defaultRoutes(): TemplateLibraryRoutes;

	/**
	 * Import default template commands
	 */
	defaultCommands(): any;

	/**
	 * Import default template data commands
	 */
	defaultData(): any;

	/**
	 * Get default keyboard shortcuts
	 */
	defaultShortcuts(): TemplateLibraryShortcuts;

	/**
	 * Handle document loaded event
	 */
	onDocumentLoaded(document: any): void;

	/**
	 * Render specific tab
	 */
	renderTab(tab: string): void;

	/**
	 * Activate specific tab
	 */
	activateTab(tab: string): void;

	/**
	 * Open template library
	 */
	open(): boolean;

	/**
	 * Close template library
	 */
	close(): boolean;

	/**
	 * Show template library with configuration
	 */
	show(args: any): void;

	/**
	 * Insert template into document
	 */
	insertTemplate(args: TemplateArgs): void;

	/**
	 * Download template data
	 */
	downloadTemplate(args: TemplateArgs, callback: (data: any, params: any) => void): void;

	/**
	 * Get import settings dialog handler
	 */
	getImportSettingsDialog(): any;

	/**
	 * Get tabs wrapper selector
	 */
	getTabsWrapperSelector(): '#elementor-template-library-header-menu';

	/**
	 * Get modal layout class
	 */
	getModalLayout(): any;

	/**
	 * Maybe open library based on URL hash
	 */
	maybeOpenLibrary(): void;
}

/**
 * Constructor for TemplateLibraryComponent
 */
export interface TemplateLibraryComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): TemplateLibraryComponentConstructor;
}

declare const TemplateLibraryComponent: TemplateLibraryComponentConstructor;

export { TemplateLibraryComponent };
export default TemplateLibraryComponent;