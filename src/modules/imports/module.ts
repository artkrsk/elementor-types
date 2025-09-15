/**
 * Base Module
 *
 * Mirrors modules/imports/module.js
 * Base module class for all Elementor modules
 */

import type { ArgsObject } from '../../core/modules';

/**
 * Base Module
 * Foundation class for all Elementor modules
 */
export interface Module {
	/**
	 * Module settings
	 */
	settings: ArgsObject;

	/**
	 * Initialize the module
	 */
	onInit(): void;

	/**
	 * Get module settings
	 */
	getSettings(key?: string): any;

	/**
	 * Set module settings
	 */
	setSettings(key: string | object, value?: any): this;

	/**
	 * Get default settings
	 */
	getDefaultSettings(): any;

	/**
	 * Get instance type
	 */
	getInstanceType(): string;

	/**
	 * Destroy the module
	 */
	destroy(): void;
}

/**
 * Constructor for Module
 */
export interface ModuleConstructor {
	new (settings?: any): any;
	extend(proto: any, staticProps?: any): ModuleConstructor;
	getInstanceType(): string;
}

declare const Module: ModuleConstructor;

export { Module };
export default Module;