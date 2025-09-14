/**
 * Container System
 *
 * Mirrors editor/container/container.js
 * Container is the core architecture for element hierarchy
 */

import type { Model } from 'backbone';
import type { View, CompositeView } from '../third-party/marionette';
import type { ChildrenArray } from './container/model';

// Forward declaration to fix circular reference issues

export interface ContainerDocument {
	id: string;
	config?: any;
	[key: string]: any;
}

export interface ContainerChildren extends Array<any> {
	// ChildrenArray methods
	clear(): void;
	findRecursive(callback: (container: any) => any): any | false;
	forEachRecursive(callback: (container: any) => void): void;
	someRecursive(callback: (container: any) => boolean): boolean;

	// Additional container-specific methods
	recursiveChildren?: any[];
	recursiveEmpty?: () => any[];
}

export interface ContainerPanel {
	getControlView(name: string): any;
	[key: string]: any;
}

export interface ContainerSettings extends Model {
	validators: Record<string, any[]>;
	controls?: Record<string, any>;
}

export interface ContainerGlobals extends Model {
	get(key: string): string | undefined;
	set(key: string | Record<string, any>, value?: any): this;
}

export interface ContainerDynamic extends Model {
	get(key: string): any;
	set(key: string | Record<string, any>, value?: any): this;
}

export interface ContainerView extends View<Model> {
	getContainer?(): any;
	$el: JQuery;
	el: HTMLElement;
	model: Model;
}

/**
 * Container Class
 * Core container system for element hierarchy
 */
export interface Container {
	// Static constants
	TYPE_REPEATER: 'repeater-control';
	TYPE_REPEATER_ITEM: 'repeater';

	// Properties
	type: string;
	id: string;
	document: ContainerDocument;
	model: Model;
	settings: ContainerSettings;
	view: ContainerView | CompositeView<Model> | View<Model>;
	parent?: any;
	children: ContainerChildren;
	dynamic?: ContainerDynamic;
	globals?: ContainerGlobals;
	label?: string;
	controls?: Record<string, any>;
	renderer?: any;
	panel?: ContainerPanel;
	placeholders: Record<string, any>;

	// Methods
	get(key: string): any;
	lookup(): any | undefined;
	findChildrenRecursive(callback: (child: any) => boolean): any[];
	forEachChildrenRecursive(callback: (child: any) => void): void;
	getParentAncestry(): any[];
	getAllAncestry(): any[];
	getHierarchy(): string[];
	getSetting(key: string): any;
	setSetting(key: string, value: any): void;
	getGroupRelatedControls(groupName: string): Record<string, any>;
	getAllControls(): Record<string, any>;
	getLabel(): string;
	isEditable(): boolean;
	isDesignable(): boolean;
	isValidChild(childModel: Model): boolean;
	isRepeater(): boolean;
	isRepeaterItem(): boolean;
	getChildType(): string;
	getElementType(): string;
	isEmpty(): boolean;
	isInner(): boolean;
	render(): void;
	renderUI(): void;
}

/**
 * Container Constructor
 */
export interface ContainerConstructor {
	new (args: {
		type?: string;
		id?: string;
		model?: Model;
		settings?: Model;
		view?: View<Model>;
		parent?: any;
		children?: any[];
		label?: string;
		controls?: Record<string, any>;
		renderer?: any;
		panel?: any;
		document?: ContainerDocument;
		[key: string]: any;
	}): any;
	TYPE_REPEATER: 'repeater-control';
	TYPE_REPEATER_ITEM: 'repeater';
}

declare const Container: ContainerConstructor;

export { Container };
export default Container;