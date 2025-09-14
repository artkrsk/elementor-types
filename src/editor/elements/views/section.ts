/**
 * Section View
 */

import type { BaseElementView } from './base-element-view';
import type { SectionModel } from '../models/section';

export interface SectionView extends BaseElementView {
	model: SectionModel;
	childView: any;
	childViewContainer: string;
}

export interface SectionViewConstructor {
	new (options?: any): SectionView;
	extend(proto: any, staticProps?: any): SectionViewConstructor;
}

declare const SectionView: SectionViewConstructor;
export { SectionView as SectionViewClass };