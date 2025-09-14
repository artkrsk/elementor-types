/**
 * Layout Control Types
 *
 * Mirrors editor/controls/*.js layout control implementations
 * Includes Dimensions, Slider, Gaps, BoxShadow, Structure, Border controls
 */

import type { ControlBaseUnitsItemView, ControlBaseMultipleItemView, ControlUIElements } from './base';

/**
 * Dimensions Control
 * Four-sided dimension control with units and linking
 */
export interface DimensionsControl extends ControlBaseUnitsItemView {
	defaultDimensionValue: number;

	ui(): ControlUIElements & {
		controls: JQuery;
		link: JQuery;
	};

	events(): Record<string, string>;
	behaviors(): {
		Scrubbing?: {
			behaviorClass: any;
			scrubSettings: {
				intentTime: number;
				valueModifier: () => number;
				enhancedNumber: () => number;
			};
		};
		[key: string]: any;
	};

	onLinkDimensionsClicked(): void;
	onInputChange(): void;
	updateDimensions(): void;
	isDimensionsLinked(): boolean;
	setDimensionValue(side: 'top' | 'right' | 'bottom' | 'left', value: number): void;
	getDimensionValue(side: 'top' | 'right' | 'bottom' | 'left'): number;
}

/**
 * Slider Control
 * Slider input with range and units support
 */
export interface SliderControl extends ControlBaseUnitsItemView {
	ui(): ControlUIElements & {
		slider: JQuery;
	};

	templateHelpers(): {
		view: ControlBaseUnitsItemView;
		data: {
			_cid: string;
			controlValue?: any;
			[key: string]: any;
		};
		isMultiple: boolean;
		[key: string]: any;
	};

	isMultiple(): boolean;
	initSlider(): void;
	destroySlider(): void;
	getSize(): number | Record<string, number>;
	onSliderChange(values: number[]): void;
	updateSliderRange(): void;
	handleUnitChange(): void;
}

/**
 * Gaps Control
 * Grid and flexbox gap control
 */
export interface GapsControl extends ControlBaseUnitsItemView {
	ui(): ControlUIElements & {
		rowGap: JQuery;
		columnGap: JQuery;
		linkGaps: JQuery;
	};

	events(): Record<string, string>;
	onLinkGapsClick(): void;
	onGapChange(): void;
	areGapsLinked(): boolean;
	syncGapValues(): void;
}

/**
 * Box Shadow Control
 * Complex control for box shadow effects
 */
export interface BoxShadowControl extends ControlBaseMultipleItemView {
	colorPicker?: any;

	ui(): ControlUIElements & {
		sliders: JQuery;
		colorPickerPlaceholder: JQuery;
	};

	initSliders(): void;
	initColors(): void;
	onReady(): void;
	onBeforeDestroy(): void;
	applySavedValue(): void;
	getShadowValue(): {
		horizontal: number;
		vertical: number;
		blur: number;
		spread: number;
		color: string;
		position: 'inset' | 'outset';
	};
	setShadowValue(value: Partial<{
		horizontal: number;
		vertical: number;
		blur: number;
		spread: number;
		color: string;
		position: 'inset' | 'outset';
	}>): void;
}

/**
 * Border Control
 * Border styling control with width, style, and color
 */
export interface BorderControl extends ControlBaseMultipleItemView {
	colorPicker?: any;

	ui(): ControlUIElements & {
		borderWidth: JQuery;
		borderStyle: JQuery;
		borderColor: JQuery;
		colorPickerPlaceholder: JQuery;
	};

	initColorPicker(): void;
	onBorderChange(): void;
	onColorChange(): void;
	getBorderValue(): {
		width: number;
		style: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
		color: string;
	};
}

/**
 * Structure Control
 * Layout structure control (columns, rows)
 */
export interface StructureControl extends ControlBaseMultipleItemView {
	ui(): ControlUIElements & {
		structurePresets: JQuery;
		customStructure: JQuery;
	};

	events(): Record<string, string>;
	onPresetClick(event: Event): void;
	onCustomStructureChange(): void;
	getStructureValue(): string;
	setStructureValue(structure: string): void;
	validateStructure(structure: string): boolean;
}

/**
 * Position Control
 * Element positioning control
 */
export interface PositionControl extends ControlBaseMultipleItemView {
	ui(): ControlUIElements & {
		positionType: JQuery;
		positionOptions: JQuery;
	};

	events(): Record<string, string>;
	onPositionTypeChange(): void;
	togglePositionOptions(): void;
	getPositionValue(): {
		type: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
		top?: string;
		right?: string;
		bottom?: string;
		left?: string;
		zIndex?: number;
	};
}

/**
 * Transform Control
 * CSS transform control
 */
export interface TransformControl extends ControlBaseMultipleItemView {
	ui(): ControlUIElements & {
		transformInputs: JQuery;
		resetTransform: JQuery;
	};

	events(): Record<string, string>;
	onTransformChange(): void;
	onResetTransform(): void;
	getTransformValue(): {
		translateX?: number;
		translateY?: number;
		scaleX?: number;
		scaleY?: number;
		rotate?: number;
		skewX?: number;
		skewY?: number;
	};
	resetTransformValues(): void;
}

// Control Constructors
export interface DimensionsControlConstructor {
	new (options?: any): DimensionsControl;
	extend(proto: any, staticProps?: any): DimensionsControlConstructor;
}

export interface SliderControlConstructor {
	new (options?: any): SliderControl;
	extend(proto: any, staticProps?: any): SliderControlConstructor;
}

export interface GapsControlConstructor {
	new (options?: any): GapsControl;
	extend(proto: any, staticProps?: any): GapsControlConstructor;
}

export interface BoxShadowControlConstructor {
	new (options?: any): BoxShadowControl;
	extend(proto: any, staticProps?: any): BoxShadowControlConstructor;
}

export interface BorderControlConstructor {
	new (options?: any): BorderControl;
	extend(proto: any, staticProps?: any): BorderControlConstructor;
}

export interface StructureControlConstructor {
	new (options?: any): StructureControl;
	extend(proto: any, staticProps?: any): StructureControlConstructor;
}

export interface PositionControlConstructor {
	new (options?: any): PositionControl;
	extend(proto: any, staticProps?: any): PositionControlConstructor;
}

export interface TransformControlConstructor {
	new (options?: any): TransformControl;
	extend(proto: any, staticProps?: any): TransformControlConstructor;
}

// Declare constructors
declare const DimensionsControl: DimensionsControlConstructor;
declare const SliderControl: SliderControlConstructor;
declare const GapsControl: GapsControlConstructor;
declare const BoxShadowControl: BoxShadowControlConstructor;
declare const BorderControl: BorderControlConstructor;
declare const StructureControl: StructureControlConstructor;
declare const PositionControl: PositionControlConstructor;
declare const TransformControl: TransformControlConstructor;

export {
	DimensionsControl,
	SliderControl,
	GapsControl,
	BoxShadowControl,
	BorderControl,
	StructureControl,
	PositionControl,
	TransformControl
};