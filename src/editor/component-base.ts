/**
 * Editor Component Base
 *
 * Mirrors editor/component-base.js
 * Base class for editor components with control activation capabilities
 */

import type { ComponentBase as ApiComponentBase, ComponentConfig } from '../core';

/**
 * Editor view interface
 */
export interface EditorView {
	content?: {
		currentView: EditorView;
	};
	getControlViewByName(controlName: string): ControlBaseDataView;
}

/**
 * Control base data view interface
 */
export interface ControlBaseDataView {
	activate?(): void;
	getChildControlView?(controlName: string): ControlBaseDataView;
}

/**
 * Editor Component Base class
 * Extends API ComponentBase with editor-specific functionality
 */
export interface ComponentBase extends ApiComponentBase {
	/**
	 * Activate a control by its path
	 * Navigates to the control and calls its activate method
	 *
	 * @param controlPath - Path to the control (e.g., "section/control_name")
	 *
	 * @example
	 * component.activateControl('style/background_color');
	 */
	activateControl(controlPath: string): void;

	/**
	 * Get control view by path
	 * Traverses the control hierarchy using the provided path
	 *
	 * @param currentView - Current editor view to start from
	 * @param controlPath - Path to the control (e.g., "section/control_name")
	 * @returns The control view at the specified path
	 *
	 * @example
	 * const controlView = component.getControlViewByPath(editorView, 'style/background_color');
	 */
	getControlViewByPath(currentView: EditorView, controlPath: string): ControlBaseDataView;
}

/**
 * Editor Component Base Class
 */
export declare class ComponentBase {
	config: ComponentConfig;

	constructor(config?: ComponentConfig);

	getNamespace(): string;
	defaultCommands(): any;
	defaultCommandsInternal?(): any;
	importCommands(commandsModule: any): any;
	register(): void;
	initialize(): void;

	activateControl(controlPath: string): void;
	getControlViewByPath(currentView: EditorView, controlPath: string): ControlBaseDataView;

	static extend(properties: any): any;
}

export default ComponentBase;