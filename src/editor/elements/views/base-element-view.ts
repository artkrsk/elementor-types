/**
 * Base Element View
 */

import type { ElementModel } from '../models/element';
import type { BackboneView } from '../../../third-party/backbone';

export interface BaseElementView extends BackboneView {
	tagName: string;
	model: ElementModel;
	getElementType(): string;
	getID(): string;
	onRender(): void;
	onDestroy(): void;
}

export interface BaseElementViewConstructor {
	new (options?: any): BaseElementView;
	extend(proto: any, staticProps?: any): BaseElementViewConstructor;
}

declare const BaseElementView: BaseElementViewConstructor;
export { BaseElementView as BaseElementViewClass };