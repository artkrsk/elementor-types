/**
 * Container View
 */

import type { BaseElementView } from './base-element-view';
import type { ContainerModel } from '../models/container';

export interface ContainerView extends BaseElementView {
	model: ContainerModel;
	childView: any;
	childViewContainer: string;
}

export interface ContainerViewConstructor {
	new (options?: any): ContainerView;
	extend(proto: any, staticProps?: any): ContainerViewConstructor;
}

declare const ContainerView: ContainerViewConstructor;
export { ContainerView as ContainerViewClass };