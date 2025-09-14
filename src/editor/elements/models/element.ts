/**
 * Element Model
 */

import type { BaseElementModel } from './base-element-model';
import type { BackboneCollection } from '../../../third-party/backbone';

export interface ElementModel extends BaseElementModel {
	// Core properties
	remoteRender: boolean;

	// Element data and settings
	getSetting(key: string): any;
	setSetting(key: string, value: any): void;
	initSettings(): void;

	// Element hierarchy
	getParent(): ElementModel | null;
	getChildren(): BackboneCollection<ElementModel>;

	// Element type and validation
	getType(): string;
	isValidChild(childModel: BaseElementModel): boolean;
}

export interface ElementModelConstructor {
	new (attrs?: any, options?: any): ElementModel;
	extend(proto: any, staticProps?: any): ElementModelConstructor;
}

declare const ElementModel: ElementModelConstructor;
export { ElementModel as ElementModelClass };