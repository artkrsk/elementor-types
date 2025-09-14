/**
 * Base Element Model
 */

import type { BackboneModel } from '../../../third-party/backbone';

export interface BaseElementModel extends BackboneModel {
	isValidChild(childModel: BaseElementModel): boolean;
}

export interface BaseElementModelConstructor {
	new (attrs?: any, options?: any): BaseElementModel;
	extend(proto: any, staticProps?: any): BaseElementModelConstructor;
}

declare const BaseElementModel: BaseElementModelConstructor;
export { BaseElementModel as BaseElementModelClass };