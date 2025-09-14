/**
 * Widget Model
 */

import type { ElementModel } from './element';
import type { BaseElementModel } from './base-element-model';

export interface WidgetModel extends ElementModel {
	widgetType: string;
	isValidChild(childModel: BaseElementModel): boolean;
	getWidgetType(): string;
}

export interface WidgetModelConstructor {
	new (attrs?: any, options?: any): WidgetModel;
	extend(proto: any, staticProps?: any): WidgetModelConstructor;
}

declare const WidgetModel: WidgetModelConstructor;
export { WidgetModel as WidgetModelClass };