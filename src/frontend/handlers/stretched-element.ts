/**
 * Stretched Element Handler
 *
 * Mirrors frontend/handlers/stretched-element.js
 * Handles element stretching functionality
 */

import type { Base } from './base';

export interface StretchElementConfig {
	element: JQuery;
	selectors: {
		container: string | Window;
	};
	considerScrollbar?: boolean;
}

/**
 * Handler for elements that can be stretched to container width
 * Provides functionality for stretching elements beyond their container
 */
export interface StretchedElementHandler extends Base {
	stretchElement?: any; // StretchElement tool instance

	/**
	 * Get the CSS class used for stretched elements
	 */
	getStretchedClass(): string;

	/**
	 * Get the setting name that controls stretching
	 */
	getStretchSettingName(): string;

	/**
	 * Get the value that activates stretching
	 */
	getStretchActiveValue(): string;

	/**
	 * Bind stretch-related events
	 */
	bindEvents(): void;

	/**
	 * Unbind stretch-related events
	 */
	unbindEvents(): void;

	/**
	 * Check if stretching is active for given settings
	 */
	isActive(settings: any): boolean;

	/**
	 * Get the element to stretch (with optional child selector)
	 */
	getStretchElementForConfig(childSelector?: string | null): JQuery;

	/**
	 * Get configuration for stretch element tool
	 */
	getStretchElementConfig(): StretchElementConfig;

	/**
	 * Initialize stretch functionality
	 */
	initStretch(): void;

	/**
	 * Get the container to stretch to
	 */
	getStretchContainer(): string | Window;

	/**
	 * Check if stretch setting is enabled
	 */
	isStretchSettingEnabled(): boolean;

	/**
	 * Perform the stretch operation
	 */
	performStretch(): void;

	/**
	 * Handle element setting changes
	 */
	onElementChange(propertyName: string): void;

	/**
	 * Handle kit changes that affect stretch container
	 */
	handleKitChangeStretchContainer(): void;
}

/**
 * Stretched Element Handler Constructor
 */
export interface StretchedElementHandlerConstructor {
	new (...args: any[]): any;
	extend(proto: any): StretchedElementHandlerConstructor;
}

declare const StretchedElementHandler: StretchedElementHandlerConstructor;

export { StretchedElementHandler };
export default StretchedElementHandler;