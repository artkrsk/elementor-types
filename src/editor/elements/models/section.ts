/**
 * Section Model
 */

import type { ElementModel } from './element';
import type { BaseElementModel } from './base-element-model';

export interface SectionModel extends ElementModel {
	isValidChild(childModel: BaseElementModel): boolean;
}

export interface SectionModelConstructor {
	new (attrs?: any, options?: any): SectionModel;
	extend(proto: any, staticProps?: any): SectionModelConstructor;
}

declare const SectionModel: SectionModelConstructor;
export { SectionModel as SectionModelClass };