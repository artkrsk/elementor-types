/**
 * Marionette Type Definitions
 *
 * Basic type definitions for Marionette.js framework
 * Used by Elementor controls and views
 */

import type { Model, Collection, View as BackboneView, EventsHash, _Result } from 'backbone';

declare global {
	namespace Marionette {
		interface ViewOptions {
			model?: Model;
			collection?: Collection<Model>;
			el?: HTMLElement | string;
			[key: string]: any;
		}

		interface View<TModel extends Model = Model> extends BackboneView<TModel> {
			ui?: any;
			events: _Result<EventsHash>;
			templateHelpers?: () => any;
			behaviors?: () => any;
			onRender?(): void;
			onDestroy?(): void;
			onBeforeRender?(): void;
			onBeforeDestroy?(): void;
			triggerMethod(eventName: string, ...args: any[]): any;
			getOption(optionName: string): any;
		}

		interface CompositeView<TModel extends Model = Model> extends View<TModel> {
			childView?: any;
			childViewContainer?: string;
			getChildView(): any;
			getChildViewOptions(model: TModel): any;
		}

		interface Behavior {
			ui?: any;
			events?: Record<string, string>;
			onRender?(): void;
			onDestroy?(): void;
		}

		interface ViewConstructor {
			new <TModel extends Model = Model>(options?: ViewOptions): View<TModel>;
			extend(proto: any, staticProps?: any): ViewConstructor;
		}

		interface CompositeViewConstructor {
			new <TModel extends Model = Model>(options?: ViewOptions): CompositeView<TModel>;
			extend(proto: any, staticProps?: any): CompositeViewConstructor;
		}

		const View: ViewConstructor;
		const CompositeView: CompositeViewConstructor;
	}
}

export type View<TModel extends Model = Model> = Marionette.View<TModel>;
export type CompositeView<TModel extends Model = Model> = Marionette.CompositeView<TModel>;
export type Behavior = Marionette.Behavior;

export { Marionette };