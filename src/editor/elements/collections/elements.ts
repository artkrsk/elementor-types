/**
 * Elements Collection
 */

import type { BackboneCollection } from '../../../third-party/backbone';
import type { ElementModel } from '../models/element';

export interface ElementsCollection extends BackboneCollection<ElementModel> {
	// Override add method for type safety
	add(models: any, options?: any, isCorrectSet?: boolean): ElementModel | ElementModel[];

	// Model constructor
	model: new (...args: any[]) => ElementModel;

	// Collection operations
	clone(): this;

	// Element-specific methods
	findByModelCid(cid: string): ElementModel | undefined;
	addChildModel(model: ElementModel, options?: any): ElementModel;
	findElement(id: string): ElementModel | undefined;
	findElements(callback: (element: ElementModel) => boolean): ElementModel[];
	getElementTypes(): string[];
}

export interface ElementsCollectionConstructor {
	new (models?: any[], options?: any): ElementsCollection;
	extend(proto: any, staticProps?: any): ElementsCollectionConstructor;
}

declare const ElementsCollection: ElementsCollectionConstructor;
export { ElementsCollection as ElementsCollectionClass };