/**
 * Component Base Interface
 *
 * Base interface for all Elementor components
 */

import type { Module } from './modules';

/**
 * Component configuration interface
 */
export interface ComponentConfig {
	namespace?: string;
	commands?: any;
	commandsInternal?: any;
	[key: string]: any;
}

/**
 * Base component interface
 * Foundation for all Elementor components
 */
export interface ComponentBase extends Module {
	/**
	 * Component configuration
	 */
	config: ComponentConfig;

	/**
	 * Get component namespace
	 */
	getNamespace(): string;

	/**
	 * Get default commands
	 */
	defaultCommands(): any;

	/**
	 * Get default internal commands
	 */
	defaultCommandsInternal?(): any;

	/**
	 * Import commands from module
	 */
	importCommands(commandsModule: any): any;

	/**
	 * Register component
	 */
	register(): void;

	/**
	 * Initialize component
	 */
	initialize(): void;
}

/**
 * Constructor for ComponentBase
 */
export interface ComponentBaseConstructor {
	new (config?: ComponentConfig): ComponentBase;

	/**
	 * Extend method for creating subclasses
	 */
	extend(properties: any): ComponentBaseConstructor;
}

declare const ComponentBase: ComponentBaseConstructor;

export { ComponentBase };
export default ComponentBase;