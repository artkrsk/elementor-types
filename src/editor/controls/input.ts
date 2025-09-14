/**
 * Input Control Types
 *
 * Mirrors editor/controls/*.js input control implementations
 * Includes Text, Number, Textarea, URL, Email, Password controls
 */

import type { ControlBaseDataView, ControlBaseMultipleItemView, ControlUIElements } from './base';

/**
 * Text Control
 * Basic text input control
 */
export interface TextControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		input: JQuery;
	};

	onBaseInputTextChange(event: Event): void;
}

/**
 * Number Control
 * Numeric input with min/max validation and scrubbing behavior
 */
export interface NumberControl extends ControlBaseDataView {
	behaviors(): {
		Scrubbing?: {
			behaviorClass: any;
			scrubSettings: {
				intentTime: number;
			};
		};
		[key: string]: any;
	};

	registerValidators(): void;
}

/**
 * Textarea Control
 * Multi-line text input control
 */
export interface TextareaControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		textarea: JQuery;
	};

	onBaseInputTextChange(event: Event): void;
}

/**
 * URL Control
 * URL input with autocomplete and validation
 */
export interface UrlControl extends ControlBaseMultipleItemView {
	ui(): ControlUIElements & {
		mainInput: JQuery;
		moreOptionsToggle: JQuery;
		moreOptions: JQuery;
	};

	events(): Record<string, string>;
	autoComplete(): void;
	onReady(): void;
	onMoreOptionsToggleClick(): void;
	onBeforeDestroy(): void;
}

/**
 * Email Control
 * Email input with validation
 */
export interface EmailControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		input: JQuery;
	};

	validateEmail(email: string): boolean;
	onBaseInputTextChange(event: Event): void;
}

/**
 * Password Control
 * Password input with visibility toggle
 */
export interface PasswordControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		input: JQuery;
		togglePassword?: JQuery;
	};

	onTogglePasswordClick?(): void;
	onBaseInputTextChange(event: Event): void;
}

/**
 * Range Control
 * Slider input with numeric value
 */
export interface RangeControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		slider: JQuery;
		input: JQuery;
	};

	onSliderChange(event: Event): void;
	onInputChange(event: Event): void;
	updateSlider(value: number): void;
}

/**
 * Date/Time Control
 * Date and time picker control
 */
export interface DateTimeControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		datePicker: JQuery;
		timePicker?: JQuery;
	};

	initializePicker(): void;
	onPickerChange(date: Date): void;
	formatDate(date: Date): string;
	parseDate(dateString: string): Date;
}

/**
 * Search Control
 * Search input with autocomplete
 */
export interface SearchControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		searchInput: JQuery;
		searchResults?: JQuery;
		clearButton?: JQuery;
	};

	onSearchInput(event: Event): void;
	performSearch(query: string): void;
	displayResults(results: any[]): void;
	onClearSearch(): void;
}

// Control Constructors
export interface TextControlConstructor {
	new (options?: any): TextControl;
	extend(proto: any, staticProps?: any): TextControlConstructor;
}

export interface NumberControlConstructor {
	new (options?: any): NumberControl;
	extend(proto: any, staticProps?: any): NumberControlConstructor;
}

export interface TextareaControlConstructor {
	new (options?: any): TextareaControl;
	extend(proto: any, staticProps?: any): TextareaControlConstructor;
}

export interface UrlControlConstructor {
	new (options?: any): UrlControl;
	extend(proto: any, staticProps?: any): UrlControlConstructor;
}

export interface EmailControlConstructor {
	new (options?: any): EmailControl;
	extend(proto: any, staticProps?: any): EmailControlConstructor;
}

export interface PasswordControlConstructor {
	new (options?: any): PasswordControl;
	extend(proto: any, staticProps?: any): PasswordControlConstructor;
}

export interface RangeControlConstructor {
	new (options?: any): RangeControl;
	extend(proto: any, staticProps?: any): RangeControlConstructor;
}

export interface DateTimeControlConstructor {
	new (options?: any): DateTimeControl;
	extend(proto: any, staticProps?: any): DateTimeControlConstructor;
}

export interface SearchControlConstructor {
	new (options?: any): SearchControl;
	extend(proto: any, staticProps?: any): SearchControlConstructor;
}

// Declare constructors
declare const TextControl: TextControlConstructor;
declare const NumberControl: NumberControlConstructor;
declare const TextareaControl: TextareaControlConstructor;
declare const UrlControl: UrlControlConstructor;
declare const EmailControl: EmailControlConstructor;
declare const PasswordControl: PasswordControlConstructor;
declare const RangeControl: RangeControlConstructor;
declare const DateTimeControl: DateTimeControlConstructor;
declare const SearchControl: SearchControlConstructor;

export {
	TextControl,
	NumberControl,
	TextareaControl,
	UrlControl,
	EmailControl,
	PasswordControl,
	RangeControl,
	DateTimeControl,
	SearchControl
};