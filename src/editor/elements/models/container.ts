/**
 * Container Model
 */

import type { ElementModel } from './element';
import type { BaseElementModel } from './base-element-model';

export interface ContainerModel extends ElementModel {
	isValidChild(childModel: BaseElementModel): boolean;
	isContainer(): boolean;
}

export interface ContainerModelConstructor {
	new (attrs?: any, options?: any): ContainerModel;
	extend(proto: any, staticProps?: any): ContainerModelConstructor;
}

declare const ContainerModel: ContainerModelConstructor;
export { ContainerModel as ContainerModelClass };