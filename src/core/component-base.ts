/**
 * Component Base Interface
 *
 * Mirrors modules/web-cli/assets/js/modules/component-base.js
 */

import type { Module } from './modules';

/**
 * Base component interface
 * Foundation for all $e components
 */
export interface ComponentBase extends Module {
	/** Commands registry (built from defaultCommands()) */
	commands: any;

	/** Internal commands registry */
	commandsInternal: any;

	/** Hooks registry */
	hooks: any;

	/** Routes registry */
	routes: any;

	/** Tabs registry */
	tabs: any;

	/** Shortcuts registry */
	shortcuts: any;

	/** Utils registry */
	utils: any;

	/** Data-commands registry */
	data: any;

	/** UI states registry */
	uiStates: any;

	/** States registry */
	states: any;

	/**
	 * Get component namespace (unique component id, e.g. 'document/elements')
	 */
	getNamespace(): string;

	/**
	 * Get service name (defaults to the namespace)
	 */
	getServiceName(): string;

	defaultCommands(): any;
	defaultCommandsInternal(): any;
	defaultHooks(): any;
	defaultRoutes(): any;
	defaultTabs(): any;

	/**
	 * Import commands from a module namespace object
	 */
	importCommands(commandsModule: any): any;

	/**
	 * Import hooks from a module namespace object
	 */
	importHooks(hooksModule: any): any;

	/**
	 * Registration entry point — wires the component into $e
	 */
	registerAPI(): void;

	activate(): void;
	inactivate(): void;
	isActive(): boolean;
	open(): boolean;
	close(): boolean;
	dependency(): boolean;
}

/**
 * Constructor for ComponentBase
 */
export interface ComponentBaseConstructor {
	new (args?: any): ComponentBase;

	/**
	 * Extend method for creating subclasses
	 */
	extend(properties: any): ComponentBaseConstructor;
}

declare const ComponentBase: ComponentBaseConstructor;

export { ComponentBase };
export default ComponentBase;
