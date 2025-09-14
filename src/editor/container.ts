/**
 * Container System
 *
 * Mirrors editor/container/container.js
 * Container is the core architecture for element hierarchy
 */

import type { Model } from 'backbone';
import type { View, CompositeView } from '../third-party/marionette';

export interface ContainerDocument {
	id: string;
	config?: any;
	[key: string]: any;
}

export interface ContainerChildren extends Array<Container> {
	recursiveChildren?: Container[];
	recursiveEmpty?: () => Container[];
	forEach(callback: (child: Container, index: number, array: Container[]) => void): void;
	map<T>(callback: (child: Container, index: number, array: Container[]) => T): T[];
	filter(callback: (child: Container, index: number, array: Container[]) => boolean): Container[];
	find(callback: (child: Container, index: number, array: Container[]) => boolean): Container | undefined;
	findRecursive(callback: (child: Container) => boolean): Container | undefined;
	forEachRecursive(callback: (child: Container) => void): void;
	some(callback: (child: Container, index: number, array: Container[]) => boolean): boolean;
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
	getContainer?(): Container;
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
	parent?: Container;
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
	lookup(): Container | undefined;
	findChildrenRecursive(callback: (child: Container) => boolean): Container[];
	forEachChildrenRecursive(callback: (child: Container) => void): void;
	getParentAncestry(): Container[];
	getAllAncestry(): Container[];
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
		parent?: Container;
		children?: Container[];
		label?: string;
		controls?: Record<string, any>;
		renderer?: any;
		panel?: any;
		document?: ContainerDocument;
		[key: string]: any;
	}): Container;
	TYPE_REPEATER: 'repeater-control';
	TYPE_REPEATER_ITEM: 'repeater';
}

declare const Container: ContainerConstructor;

export { Container };
export default Container;