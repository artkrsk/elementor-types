/**
 * Base Control Classes
 *
 * Mirrors editor/controls/base*.js
 * Core control types that all other controls extend from
 */

import type { Container } from '../container';
import type { Model, EventHandler, EventMap } from 'backbone';
import type { CompositeView, Behavior } from '../../third-party/marionette';

interface ControlModel extends Model {
	cid: string;
	attributes: Record<string, any>;
}

interface ControlUIElements {
	controlTitle: JQuery;
	input?: JQuery;
	checkbox?: JQuery;
	radio?: JQuery;
	select?: JQuery;
	textarea?: JQuery;
	responsiveSwitchersSibling?: JQuery;
	responsiveSwitchers?: JQuery;
	responsiveSwitchersWrapper?: JQuery;
	contentEditable?: JQuery;
	tooltipTargets?: JQuery;
	units?: JQuery;
	unitSwitcher?: JQuery;
	unitChoices?: JQuery;
	[key: string]: JQuery | HTMLElement | undefined;
}

// Helper type for control UI methods
type ControlUIReturn = ControlUIElements & {
	[key: string]: JQuery | HTMLElement;
};

interface ControlBehaviors {
	[key: string]: {
		behaviorClass: any;
		[key: string]: any;
	};
}

interface ControlTemplateHelpers {
	view: ControlBaseView;
	data: {
		_cid: string;
		controlValue?: any;
		[key: string]: any;
	};
}

interface Validator {
	isValid(value: any, oldValue?: any): boolean;
	getErrorMessage(): string;
	validationTerms?: Record<string, any>;
}

interface ValidatorTypes {
	Base: new (options?: { validationTerms?: any }) => Validator;
	Number: new (options?: { validationTerms?: { min?: number; max?: number } }) => Validator;
	Breakpoint: new (options?: any) => Validator;
	[key: string]: new (options?: any) => Validator;
}

/**
 * Base Control View Class
 * Extends Marionette.CompositeView
 */
interface ControlBaseView extends CompositeView<ControlModel> {
	model: ControlModel;
	container: Container;
	elementSettingsModel: Model; // Deprecated since 2.8.0
	options: {
		container?: Container;
		elementSettingsModel?: Model;
		elementEditSettings?: Model;
		[key: string]: any;
	};
	_behaviors: Behavior[];
	ui: ControlUIElements | (() => ControlUIElements);
	$el: JQuery;
	_parent?: ControlBaseView;
	behaviors(): ControlBehaviors;
	getBehavior(name: string): Behavior | undefined;
	className?: string;
	templateHelpers(): ControlTemplateHelpers;
	getTemplate(): any;
	initialize(options: any): void;
	onDestroy(): void;
	onDeviceModeChange(): void;
	onAfterChange(...args: any[]): void;
	toggleControlVisibility(): void;
	onRender(): void;
	reRoute(controlActive: boolean): void;
	getControlInRouteArgs(path: string): Record<string, any>;
	getControlPath(): string;
	triggerMethod(eventName: string, ...args: any[]): any;
	listenTo(object: any, events: string, callback: EventHandler): this;
	listenTo(object: any, eventMap: EventMap): this;
	stopListening(object?: any, events?: string, callback?: EventHandler): this;
	stopListening(object: any, eventMap: EventMap): this;
	$(selector: string): JQuery;
	render(): this;
	getOption(optionName: string): any;
}

/**
 * Base Data Control View Class
 * Extends ControlBaseView with data handling and validation
 */
interface ControlBaseDataView extends ControlBaseView {
	validatorTypes: ValidatorTypes;
	validators: Validator[];
	correctionTimeout?: number;
	globalValue?: any;

	getControlValue(key?: string): any;
	getGlobalKey(): string | undefined;
	getGlobalValue(): any;
	getGlobalDefault(): any;
	getCurrentValue(): any;
	isGlobalActive(): boolean;
	setValue(value: any): void;
	setSettingsModel(value: any): void;
	applySavedValue(): void;
	getEditSettings(setting?: string): any;
	setEditSetting(settingKey: string, settingValue: any): void;
	getControlPlaceholder(): any;
	getResponsiveParentView(): ControlBaseDataView | undefined;
	getResponsiveChildrenViews(): ControlBaseDataView[];
	setPlaceholderFromParent(): void;
	preparePlaceholderForChildren(): any;
	propagatePlaceholder(): void;
	renderWithChildren(): void;
	getCleanControlValue(key?: string): any;
	onAfterChange(...args: any[]): void;
	getInputValue(input: HTMLElement | string): any;
	setInputValue(input: HTMLElement | JQuery | string, value: any): void;
	addValidator(validator: Validator): void;
	registerValidators(): void;
	onBeforeRender(): void;
	onBaseInputTextChange(event: Event): void;
	onBaseInputChange(event: Event): void;
	onResponsiveSwitchersClick(event: Event): void;
	renderResponsiveSwitchers(): void;
	onAfterExternalChange(): void;
	addTooltip(): void;
	hideTooltip(): void;
	updateElementModel(value: any, input?: HTMLElement): void;
}

/**
 * Base Multiple Control View Class
 * Extends ControlBaseDataView for controls with multiple values
 */
interface ControlBaseMultipleItemView extends ControlBaseDataView {
	applySavedValue(): void;
	getControlValue(key?: string): any;
	getCleanControlValue(key?: string): any;
	setValue(key: string | Record<string, any>, value?: any): void;
	updateElementModel(value: any, input: HTMLElement): void;
}

/**
 * Base Units Control View Class
 * Extends ControlBaseMultipleItemView for controls with unit selection
 */
interface ControlBaseUnitsItemView extends ControlBaseMultipleItemView {
	updatePlaceholder(): void;
	recursiveUnitChange(includingSelf?: boolean): void;
	onUnitChange(): void;
	toggleUnitChoices(stateVal?: boolean): void;
	updateUnitChoices(): void;
	onUnitClick(): void;
	onUnitLabelClick(event: Event): void;
	getCurrentRange(): { min?: number; max?: number; step?: number } | false;
	getUnitRange(unit: string): { min?: number; max?: number; step?: number } | false;
	isCustomUnit(): boolean;
}

/**
 * Control Base View Constructor
 */
interface ControlBaseViewConstructor {
	new (options?: any): ControlBaseView;
	extend(proto: any, staticProps?: any): ControlBaseViewConstructor;
	prototype: ControlBaseView;
}

/**
 * Control Base Data View Constructor
 */
interface ControlBaseDataViewConstructor {
	new (options?: any): ControlBaseDataView;
	extend(proto: any, staticProps?: any): ControlBaseDataViewConstructor;
	prototype: ControlBaseDataView;
	getStyleValue(placeholder: string, controlValue: any, controlData?: any): any;
	onPasteStyle(): boolean;
}

/**
 * Control Base Multiple View Constructor
 */
interface ControlBaseMultipleItemViewConstructor {
	new (options?: any): ControlBaseMultipleItemView;
	extend(proto: any, staticProps?: any): ControlBaseMultipleItemViewConstructor;
	prototype: ControlBaseMultipleItemView;
	getStyleValue(placeholder: string, controlValue: any): any;
}

/**
 * Control Base Units View Constructor
 */
interface ControlBaseUnitsItemViewConstructor {
	new (options?: any): ControlBaseUnitsItemView;
	extend(proto: any, staticProps?: any): ControlBaseUnitsItemViewConstructor;
	prototype: ControlBaseUnitsItemView;
	getStyleValue(placeholder: string, controlValue: any): any;
}

declare const ControlBaseView: ControlBaseViewConstructor;
declare const ControlBaseDataView: ControlBaseDataViewConstructor;
declare const ControlBaseMultipleItemView: ControlBaseMultipleItemViewConstructor;
declare const ControlBaseUnitsItemView: ControlBaseUnitsItemViewConstructor;

// Export all interfaces and types
export type {
	ControlModel,
	ControlUIElements,
	ControlBehaviors,
	ControlTemplateHelpers,
	Validator,
	ValidatorTypes,
	ControlBaseView,
	ControlBaseDataView,
	ControlBaseMultipleItemView,
	ControlBaseUnitsItemView,
	ControlBaseViewConstructor,
	ControlBaseDataViewConstructor,
	ControlBaseMultipleItemViewConstructor,
	ControlBaseUnitsItemViewConstructor,
	ControlBaseMultipleItemView as ControlBaseMultiple,
	ControlBaseUnitsItemView as ControlBaseUnits
};
