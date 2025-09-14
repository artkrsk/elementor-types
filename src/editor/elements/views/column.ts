/**
 * Column View
 */

import type { BaseElementView } from './base-element-view';
import type { ColumnModel } from '../models/column';

export interface ColumnView extends BaseElementView {
	model: ColumnModel;
	childView: any;
	childViewContainer: string;
}

export interface ColumnViewConstructor {
	new (options?: any): ColumnView;
	extend(proto: any, staticProps?: any): ColumnViewConstructor;
}

declare const ColumnView: ColumnViewConstructor;
export { ColumnView as ColumnViewClass };