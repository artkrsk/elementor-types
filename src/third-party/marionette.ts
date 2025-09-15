/**
 * Marionette Type Definitions
 *
 * Basic type definitions for Marionette.js framework
 * Used by Elementor controls and views
 */

import type { Model, Collection, View as BackboneView, EventsHash, _Result } from 'backbone';

/**
 * Marionette namespace interfaces
 * Note: Users should declare global Marionette types in their own projects if needed
 */
export namespace Marionette {
	export interface ViewOptions {
		model?: Model;
		collection?: Collection<Model>;
		el?: HTMLElement | string;
		[key: string]: any;
	}

	export interface View<TModel extends Model = Model> extends BackboneView<TModel> {
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

	export interface CompositeView<TModel extends Model = Model> extends View<TModel> {
		childView?: any;
		childViewContainer?: string;
		getChildView(): any;
		getChildViewOptions(model: TModel): any;
	}

	export interface Behavior {
		ui?: any;
		events?: Record<string, string>;
		onRender?(): void;
		onDestroy?(): void;
	}

	export interface ViewConstructor {
		new <TModel extends Model = Model>(options?: ViewOptions): View<TModel>;
		extend(proto: any, staticProps?: any): ViewConstructor;
	}

	export interface CompositeViewConstructor {
		new <TModel extends Model = Model>(options?: ViewOptions): CompositeView<TModel>;
		extend(proto: any, staticProps?: any): CompositeViewConstructor;
	}

}

export type View<TModel extends Model = Model> = Marionette.View<TModel>;
export type CompositeView<TModel extends Model = Model> = Marionette.CompositeView<TModel>;
export type Behavior = Marionette.Behavior;
export type ViewOptions = Marionette.ViewOptions;