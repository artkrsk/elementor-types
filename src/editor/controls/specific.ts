/**
 * Specific Control Types
 * Individual control implementations for various UI elements
 */

import type {
  ControlBaseView,
  ControlBaseDataView,
  ControlBaseMultiple,
  ControlBaseUnits,
} from "./base";

/**
 * Box shadow control
 */
export declare class BoxShadow extends ControlBaseDataView {
  onColorChanged(): void;
  updateCSSVar(styleItem: any, key: string, value: any): void;
  applyValueFromSettings(): void;
}

/**
 * Button control
 */
export declare class Button extends ControlBaseView {
  onButtonClick(event: Event): void;
}

/**
 * Choose control (radio-like selection)
 */
export declare class Choose extends ControlBaseDataView {
  applySavedValue(): void;
}

/**
 * Code editor control
 */
export declare class Code extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  applySavedValue(): void;
  onDestroy(): void;
}

/**
 * Color picker control
 */
export declare class Color extends ControlBaseDataView {
  colorPicker?: any;
  initPicker(): void;
  onPickerChange(): void;
  onPickerClear(): void;
  onAddGlobalButtonClick(): void;
  getCurrentValue(): any;
  reRoute(isEnabled: boolean): void;
  applySavedValue(): void;
  onDestroy(): void;
}

/**
 * Date/time picker control
 */
export declare class DateTime extends ControlBaseDataView {
  onInputChange(): void;
  onRender(): void;
}

/**
 * Dimensions control (padding, margin, etc.)
 */
export declare class Dimensions extends ControlBaseDataView {
  onInputChange(): void;
  onLinkedInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Font control
 */
export declare class Font extends ControlBaseDataView {
  cache?: WeakMap<any, any>;
  childView?: any;
  getStyleId(): string;
  onFontChange(): void;
  enqueueFont(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Gallery control
 */
export declare class Gallery extends ControlBaseDataView {
  attachments?: any;
  library?: any;
  onButtonClick(): void;
  initRemoveDialog(): void;
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Gaps control for grid layouts
 */
export declare class Gaps extends ControlBaseDataView {
  onInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Hidden control
 */
export declare class Hidden extends ControlBaseDataView {}

/**
 * Icon picker control
 */
export declare class Icon extends ControlBaseDataView {
  onRender(): void;
  onIconPickerSelect(): void;
  getControlValue(): any;
}

/**
 * Icons control (multiple icons)
 */
export declare class Icons extends ControlBaseMultiple {
  childView: any;
  onRender(): void;
  getChildView(): any;
  onIconPickerSelect(): void;
  getControlValue(): any;
  updateElementModel(value: any): void;
}

/**
 * Image dimensions control
 */
export declare class ImageDimensions extends ControlBaseDataView {
  onApplyImageSize(): void;
  onImageDimensionChange(): void;
  onCustomImageDimensionChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
  onRender(): void;
}

/**
 * Media picker control
 */
export declare class Media extends ControlBaseDataView {
  ui(): object;
  events(): object;
  onRender(): void;
  applySavedValue(): void;
  openFrame(view: string): void;
  select(): void;
  onFrameOpen(): void;
  onFrameSelect(): void;
  onFrameClose(): void;
  onRemoveClick(): void;
  onButtonClick(): void;
}

/**
 * Notice control (informational display)
 */
export declare class Notice extends ControlBaseView {
  onRender(): void;
}

/**
 * Number input control
 */
export declare class Number extends ControlBaseDataView {
  onInputChange(): void;
  onRender(): void;
  validateValue(value: any): any;
}

/**
 * Popover toggle control
 */
export declare class PopoverToggle extends Choose {
  onRender(): void;
  onChildControlValueChange(): void;
  onChooseSelect(): void;
  updatePopoverVisibility(): void;
}

/**
 * Repeater control for dynamic content
 */
export declare class Repeater extends ControlBaseDataView {
  childView?: any;
  templateHelpers(): object;
  getChildView(): any;
  getChildViewOptions(model: any): object;
  updateElementModel(value: any): void;
  onAddButtonClick(): void;
  onSortUpdate(): void;
  onRender(): void;
  onBeforeDestroy(): void;
}

/**
 * Repeater row control
 */
export declare class RepeaterRow extends ControlBaseDataView {
  className(): string;
  tagName(): string;
  controlViews?: object;
  onRowDuplicate(): void;
  onRowRemove(): void;
  onRowToggle(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Section control (control grouping)
 */
export declare class Section extends ControlBaseView {
  onRender(): void;
}

/**
 * Select dropdown control
 */
export declare class Select extends ControlBaseDataView {
  onRender(): void;
  onSelectChange(): void;
  applySavedValue(): void;
}

/**
 * Select2 enhanced dropdown control
 */
export declare class Select2 extends ControlBaseDataView {
  cache?: WeakMap<any, any>;
  getSelect2Placeholder(): string;
  getSelect2Options(): object;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Slider control
 */
export declare class Slider extends ControlBaseDataView {
  onInputChange(): void;
  onSliderChange(): void;
  resetDimensions(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Structure control for layout selection
 */
export declare class Structure extends ControlBaseView {
  currentPreset?: any;
  onPresetSelected(event: Event): void;
  onRender(): void;
}

/**
 * Switcher control (toggle)
 */
export declare class Switcher extends ControlBaseDataView {
  onSwitcherChange(): void;
  applySavedValue(): void;
}

/**
 * Tab control
 */
export declare class Tab extends ControlBaseView {
  onRender(): void;
}

/**
 * URL control
 */
export declare class URL extends ControlBaseMultiple {
  onRender(): void;
  onInputChange(): void;
  updateElementModel(value: any): void;
}

/**
 * Visual choice control
 */
export declare class VisualChoice extends ControlBaseDataView {
  onChoiceSelect(event: Event): void;
  applySavedValue(): void;
}

/**
 * WordPress widget control
 */
export declare class WpWidget extends ControlBaseDataView {
  onFormUpdate(): void;
  onRender(): void;
  applySavedValue(): void;
}

/**
 * WYSIWYG editor control
 */
export declare class WYSIWYG extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  onDestroy(): void;
  applySavedValue(): void;
  getWysiwygValue(): string;
}
