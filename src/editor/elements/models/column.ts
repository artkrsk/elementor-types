/**
 * Column Model
 */

import type { ElementModel } from './element';
import type { BaseElementModel } from './base-element-model';

export interface ColumnModel extends ElementModel {
	isValidChild(childModel: BaseElementModel): boolean;
}

export interface ColumnModelConstructor {
	new (attrs?: any, options?: any): ColumnModel;
	extend(proto: any, staticProps?: any): ColumnModelConstructor;
}

declare const ColumnModel: ColumnModelConstructor;
export { ColumnModel as ColumnModelClass };