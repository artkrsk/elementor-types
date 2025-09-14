/**
 * Advanced Control Types
 *
 * Mirrors editor/controls/*.js advanced control implementations
 * Includes Repeater, Font, WPWidget, DateTime, PopoverToggle, VisualChoice
 */

import type { ControlBaseDataView, ControlBaseMultipleItemView, ControlUIElements } from './base';
import type { Select2Control } from './specific';

/**
 * Repeater Control
 * Dynamic repeater control for managing lists of controls
 */
export interface RepeaterControl extends ControlBaseDataView {
	childView: any; // RepeaterRowView
	childViewContainer: string;
	collection: any; // Backbone.Collection

	ui: ControlUIElements & {
		btnAddRow: JQuery;
		fieldContainer: JQuery;
	};

	events(): Record<string, string>;
	templateHelpers(): {
		view: ControlBaseDataView;
		itemActions: any;
		data: {
			_cid: string;
			controlValue: any[];
			[key: string]: any;
		};
	};

	childViewOptions(rowModel: any, index: number): {
		container: any;
		controlFields: any;
		titleField: string;
		itemActions: any;
	};

	createItemModel(attrs: any, options: any, controlView: any): any;
	fillCollection(): void;
	onButtonAddRowClick(): void;
	onSortStart(): void;
	onSortUpdate(): void;
	onSortStop(): void;
	updateActiveRow(): void;
	setRowValue(rowIndex: number, key: string, value: any): void;
	deleteRow(rowIndex: number): void;
	addRow(data?: any): void;
}

/**
 * Repeater Row Control
 * Individual row within a repeater
 */
export interface RepeaterRowControl extends ControlBaseDataView {
	controlFields: any;
	titleField: string;
	itemActions: any;

	ui: ControlUIElements & {
		rowControls: JQuery;
		rowTitle: JQuery;
		rowToggle: JQuery;
		rowDuplicate: JQuery;
		rowRemove: JQuery;
	};

	events(): Record<string, string>;
	onRowToggle(): void;
	onRowDuplicate(): void;
	onRowRemove(): void;
	updateRowTitle(): void;
	isRowVisible(): boolean;
	setRowVisibility(visible: boolean): void;
}

/**
 * Font Control
 * Font family selector with preview
 */
export interface FontControl extends Select2Control {
	$previewContainer: JQuery | null;
	typeStopDetection: {
		idle: number;
		timeOut: NodeJS.Timeout | null;
		action(): void;
	};
	scrollStopDetection: {
		idle: number;
		timeOut: NodeJS.Timeout | null;
		onScroll(): void;
	};

	getSelect2Options(): {
		dir: 'rtl' | 'ltr';
		templateSelection: (font: any) => string | JQuery;
		templateResult: (font: any) => string | JQuery;
	};

	onReady(): void;
	fontPreviewTemplate(font: any): string | JQuery;
	enqueueFontsInView(): void;
	loadFontPreview(fontFamily: string): void;
	isSystemFont(fontFamily: string): boolean;
	isGoogleFont(fontFamily: string): boolean;
}

/**
 * WP Widget Control
 * WordPress widget integration control
 */
export interface WPWidgetControl extends ControlBaseDataView {
	ui: ControlUIElements & {
		widgetSelect: JQuery;
		widgetForm: JQuery;
		widgetUpdate: JQuery;
	};

	events(): Record<string, string>;
	onWidgetSelect(): void;
	onWidgetUpdate(): void;
	loadWidgetForm(): void;
	saveWidgetSettings(): void;
	getWidgetData(): {
		widget_type: string;
		settings: Record<string, any>;
	};
}

/**
 * Date Time Control
 * Advanced date and time picker
 */
export interface DateTimeControl extends ControlBaseDataView {
	picker: any; // Flatpickr instance

	ui: ControlUIElements & {
		input: JQuery;
		clearButton: JQuery;
	};

	getDefaultSettings(): {
		enableTime: boolean;
		dateFormat: string;
		altFormat: string;
		allowInput: boolean;
		clickOpens: boolean;
	};

	initPicker(): void;
	onDateChange(selectedDates: Date[], dateStr: string): void;
	onClearDate(): void;
	formatDate(date: Date): string;
	parseDate(dateString: string): Date | null;
}

/**
 * Popover Toggle Control
 * Control that opens content in a popover
 */
export interface PopoverToggleControl extends ControlBaseDataView {
	popover?: any;

	ui: ControlUIElements & {
		popoverToggle: JQuery;
		popoverContent: JQuery;
	};

	events(): Record<string, string>;
	onPopoverToggle(): void;
	openPopover(): void;
	closePopover(): void;
	isPopoverOpen(): boolean;
	getPopoverContent(): string;
	updatePopoverPosition(): void;
}

/**
 * Visual Choice Control
 * Visual selector with thumbnails/icons
 */
export interface VisualChoiceControl extends ControlBaseDataView {
	ui: ControlUIElements & {
		choices: JQuery;
		choice: JQuery;
	};

	events(): Record<string, string>;
	onChoiceClick(event: Event): void;
	setActiveChoice(value: string): void;
	getChoiceElement(value: string): JQuery;
	updateChoices(): void;
}

/**
 * Taxonomy Control
 * WordPress taxonomy selector
 */
export interface TaxonomyControl extends Select2Control {
	getSelect2Options(): {
		ajax: {
			url: string;
			dataType: 'json';
			delay: number;
			data: (params: any) => any;
			processResults: (data: any) => any;
		};
		cache: boolean;
		minimumInputLength: number;
	};

	formatTaxonomyResult(term: any): string;
	onTaxonomySelect(): void;
}

/**
 * Post Select Control
 * WordPress post/page selector
 */
export interface PostSelectControl extends Select2Control {
	getSelect2Options(): {
		ajax: {
			url: string;
			dataType: 'json';
			delay: number;
			data: (params: any) => any;
			processResults: (data: any) => any;
		};
		templateResult: (post: any) => string | JQuery;
		templateSelection: (post: any) => string;
	};

	formatPostResult(post: any): string | JQuery;
	formatPostSelection(post: any): string;
}

// Control Constructors
export interface RepeaterControlConstructor {
	new (options?: any): RepeaterControl;
	extend(proto: any, staticProps?: any): RepeaterControlConstructor;
}

export interface RepeaterRowControlConstructor {
	new (options?: any): RepeaterRowControl;
	extend(proto: any, staticProps?: any): RepeaterRowControlConstructor;
}

export interface FontControlConstructor {
	new (options?: any): FontControl;
	extend(proto: any, staticProps?: any): FontControlConstructor;
}

export interface WPWidgetControlConstructor {
	new (options?: any): WPWidgetControl;
	extend(proto: any, staticProps?: any): WPWidgetControlConstructor;
}

export interface DateTimeControlConstructor {
	new (options?: any): DateTimeControl;
	extend(proto: any, staticProps?: any): DateTimeControlConstructor;
}

export interface PopoverToggleControlConstructor {
	new (options?: any): PopoverToggleControl;
	extend(proto: any, staticProps?: any): PopoverToggleControlConstructor;
}

export interface VisualChoiceControlConstructor {
	new (options?: any): VisualChoiceControl;
	extend(proto: any, staticProps?: any): VisualChoiceControlConstructor;
}

export interface TaxonomyControlConstructor {
	new (options?: any): TaxonomyControl;
	extend(proto: any, staticProps?: any): TaxonomyControlConstructor;
}

export interface PostSelectControlConstructor {
	new (options?: any): PostSelectControl;
	extend(proto: any, staticProps?: any): PostSelectControlConstructor;
}

// Declare constructors
declare const RepeaterControl: RepeaterControlConstructor;
declare const RepeaterRowControl: RepeaterRowControlConstructor;
declare const FontControl: FontControlConstructor;
declare const WPWidgetControl: WPWidgetControlConstructor;
declare const DateTimeControl: DateTimeControlConstructor;
declare const PopoverToggleControl: PopoverToggleControlConstructor;
declare const VisualChoiceControl: VisualChoiceControlConstructor;
declare const TaxonomyControl: TaxonomyControlConstructor;
declare const PostSelectControl: PostSelectControlConstructor;

export {
	RepeaterControl,
	RepeaterRowControl,
	FontControl,
	WPWidgetControl,
	DateTimeControl,
	PopoverToggleControl,
	VisualChoiceControl,
	TaxonomyControl,
	PostSelectControl
};