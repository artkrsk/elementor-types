/**
 * Elements Manager
 *
 * Mirrors editor/elements/manager.js
 * Manages element types, registration, and factory methods
 */

import type { ElementModel } from './models/element';
import type { BaseElementView } from './views/base-element-view';

/**
 * Element Type Base Interface
 *
 * Base interface for element type definitions
 */
export interface ElementTypeBase {
	getModel(): any;
	getView(): any;
}

/**
 * Element Type Class Interface
 *
 * Interface for element type class constructors
 */
export interface ElementTypeClass {
	new (...args: any[]): ElementTypeBase;
	getModel(): any;
	getView(): any;
}

/**
 * Elements Manager Interface
 *
 * Manager class for element types registration and factory methods.
 * Handles element type registration, model/view creation, and type validation.
 */
export interface ElementsManager {
	// Registered element types
	elementTypes: Record<string, ElementTypeClass>;

	// Core Methods
	constructor(): void;
	registerElements(): void;

	// Element Type Management
	getElementTypeClass(type: string): ElementTypeClass | null;
	registerElementType(type: string, elementClass: ElementTypeClass): void;
	unregisterElementType(type: string): void;

	// Element Creation
	createElement(type: string, attributes?: any, options?: any): ElementModel;
	createView(model: ElementModel, options?: any): BaseElementView;

	// Type Validation
	isElementTypeRegistered(type: string): boolean;
	getAvailableElementTypes(): string[];

	// Element Type Information
	getElementTypeData(type: string): any;
	getElementTypeTitle(type: string): string;
	getElementTypeIcon(type: string): string;
	getElementTypeCategories(type: string): string[];

	// Widget-specific Methods
	getWidgetTypes(): string[];
	isWidgetType(type: string): boolean;
	getWidgetTypeClass(type: string): ElementTypeClass | null;

	// Initialization
	init(): void;
	initElementTypes(): void;

	// Hooks and Filters
	applyElementTypeFilters(type: string, data: any): any;
}

/**
 * Elements Manager Constructor
 */
export interface ElementsManagerConstructor {
	new (): ElementsManager;
}

declare const ElementsManager: ElementsManagerConstructor;

export { ElementsManager as ElementsManagerClass };