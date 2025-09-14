/**
 * Widget View
 */

import type { BaseElementView } from './base-element-view';
import type { WidgetModel } from '../models/widget';

export interface BaseWidgetView extends BaseElementView {
	model: WidgetModel;
	childViewContainer: boolean;
}

export interface WidgetView extends BaseWidgetView {
	onModelChange(): void;
}

export interface BaseWidgetViewConstructor {
	new (options?: any): BaseWidgetView;
	extend(proto: any, staticProps?: any): BaseWidgetViewConstructor;
}

export interface WidgetViewConstructor {
	new (options?: any): WidgetView;
	extend(proto: any, staticProps?: any): WidgetViewConstructor;
}

declare const BaseWidgetView: BaseWidgetViewConstructor;
declare const WidgetView: WidgetViewConstructor;

export { BaseWidgetView as BaseWidgetViewClass, WidgetView as WidgetViewClass };